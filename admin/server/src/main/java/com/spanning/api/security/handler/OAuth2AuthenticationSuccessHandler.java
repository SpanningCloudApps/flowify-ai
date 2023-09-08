/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.spanning.api.security.jwt.JwtTokenProvider;
import com.spanning.api.security.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.spanning.api.security.util.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private static final String TOKEN_NAME = "JWT";
  private final JwtTokenProvider tokenProvider;
  private final HttpCookieOAuth2AuthorizationRequestRepository cookieRepository;
  private final String redirectUrl;
  private final int expiration;

  @Autowired
  OAuth2AuthenticationSuccessHandler(
    final JwtTokenProvider jwtTokenProvider,
    final HttpCookieOAuth2AuthorizationRequestRepository cookieRepository,
    @Value("${proxy.admin-ui.url}") final String proxyUrl,
    @Value("${security.token.expiration}") final int expiration
  ) {
    this.tokenProvider = jwtTokenProvider;
    this.cookieRepository = cookieRepository;
    this.redirectUrl = proxyUrl + "/";
    this.expiration = expiration;
  }

  @Override
  public void onAuthenticationSuccess(
    final HttpServletRequest request,
    final HttpServletResponse response,
    final Authentication authentication
  ) throws IOException {
    final String token = tokenProvider.createToken(authentication);
    clearAuthenticationAttributes(request, response);
    CookieUtils.addCookie(response, TOKEN_NAME, token, expiration);

    getRedirectStrategy().sendRedirect(request, response, redirectUrl);
  }

  protected void clearAuthenticationAttributes(final HttpServletRequest request, final HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);
    cookieRepository.removeAuthorizationRequestCookies(response);
  }
}
