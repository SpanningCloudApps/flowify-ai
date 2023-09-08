/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.jwt;

import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenProvider {

  private final String secret;
  private final long expiration;

  public JwtTokenProvider(
    @Value("${security.token.secret}") final String secret,
    @Value("${security.token.expiration}") final long expiration
  ) {
    this.secret = secret;
    this.expiration = expiration;
  }

  public String createToken(final Authentication authentication) {
    final DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();
    final Map<String, Object> claims = oidcUser.getClaims();
    final List<String> roles = oidcUser.getAuthorities()
      .stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.toList());

    final Date now = new Date();

    return Jwts.builder()
      .setClaims(claims)
      .claim("roles", roles)
      .setIssuedAt(now)
      .setExpiration(new Date(now.getTime() + expiration * 1000))
      .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
      .compact();
  }

  public boolean validateToken(final String token) {
    try {
      Jwts.parserBuilder()
        .setSigningKey(secret.getBytes())
        .build()
        .parseClaimsJws(token);
      return true;
    } catch (final SignatureException ex) {
      log.debug("Invalid JWT signature. Payload: [{}]", getTokenPayload(token));
    } catch (final MalformedJwtException ex) {
      log.debug("Invalid JWT token. Token: [{}]", token);
    } catch (final ExpiredJwtException ex) {
      log.debug("Expired JWT token. Payload: [{}]", getTokenPayload(token));
    } catch (final UnsupportedJwtException ex) {
      log.debug("Unsupported JWT token. Token: [{}]", token);
    } catch (final IllegalArgumentException ex) {
      log.debug("JWT claims string is empty. Token: [{}]", token);
    }
    return false;
  }

  public Claims getTokenClaims(final String token) {
    return Jwts.parserBuilder()
      .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
      .build()
      .parseClaimsJws(token)
      .getBody();
  }

  private String getTokenPayload(final String token) {
    return Optional.of(token)
      .filter(StringUtils::isNotEmpty)
      .map(string -> string.split("\\."))
      .map(array -> array[1])
      .map(payload -> Base64.getUrlDecoder().decode(payload))
      .map(String::new)
      .orElse(StringUtils.EMPTY);
  }
}
