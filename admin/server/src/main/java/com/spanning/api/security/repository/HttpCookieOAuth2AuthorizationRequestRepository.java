/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.repository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.spanning.api.security.util.CookieUtils;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

@Component
public class HttpCookieOAuth2AuthorizationRequestRepository implements
                                                            AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

  private static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
  private static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
  private static final int COOKIE_EXPIRE_SECONDS = 180;

  @Override
  public OAuth2AuthorizationRequest loadAuthorizationRequest(final HttpServletRequest request) {
    return CookieUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
      .map(cookie -> CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class))
      .orElse(null);
  }

  @Override
  public void saveAuthorizationRequest(
    final OAuth2AuthorizationRequest authorizationRequest,
    final HttpServletRequest request,
    final HttpServletResponse response
  ) {
    if (authorizationRequest == null) {
      CookieUtils.deleteCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
      CookieUtils.deleteCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME);
      return;
    }

    CookieUtils.addCookie(
      response,
      OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
      CookieUtils.serialize(authorizationRequest),
      COOKIE_EXPIRE_SECONDS);
    final String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
    if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
      CookieUtils.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, COOKIE_EXPIRE_SECONDS);
    }
  }

  @Override
  public OAuth2AuthorizationRequest removeAuthorizationRequest(final HttpServletRequest request) {
    return this.loadAuthorizationRequest(request);
  }

  public void removeAuthorizationRequestCookies(final HttpServletResponse response) {
    CookieUtils.deleteCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
    CookieUtils.deleteCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME);
  }
}
