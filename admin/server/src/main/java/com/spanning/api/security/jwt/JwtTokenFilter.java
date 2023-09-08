/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.jwt;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.spanning.api.security.util.CookieUtils;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  private static final String TOKEN_NAME = "JWT";
  private final JwtTokenProvider jwtTokenProvider;

  @Autowired
  public JwtTokenFilter(final JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  public void doFilterInternal(
    final HttpServletRequest request,
    final HttpServletResponse response,
    final FilterChain filterChain
  ) throws IOException, ServletException {

    final String token = getTokenFromRequest(request);

    if (jwtTokenProvider.validateToken(token)) {
      final Claims claims = jwtTokenProvider.getTokenClaims(token);

      final List<String> roles = claims.get("roles", List.class);
      final Set<SimpleGrantedAuthority> authorities = roles.stream()
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toSet());

      final var oAuth2User = new DefaultOAuth2User(authorities, claims, "sub");
      final OAuth2AuthenticationToken auth = new OAuth2AuthenticationToken(oAuth2User, authorities, "google");
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    filterChain.doFilter(request, response);
  }

  private String getTokenFromRequest(final HttpServletRequest request) {
    return CookieUtils.getCookie(request, TOKEN_NAME)
      .map(Cookie::getValue)
      .orElse(StringUtils.EMPTY);
  }
}
