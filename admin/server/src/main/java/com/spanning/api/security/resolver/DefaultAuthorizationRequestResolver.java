/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.resolver;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

public class DefaultAuthorizationRequestResolver implements OAuth2AuthorizationRequestResolver {

  private static final String AUTHORIZATION_BASE_URI = "/oauth2/authorization";
  private final OAuth2AuthorizationRequestResolver defaultAuthorizationRequestResolver;

  public DefaultAuthorizationRequestResolver(final ClientRegistrationRepository clientRegistrationRepository) {
    this.defaultAuthorizationRequestResolver =
      new DefaultOAuth2AuthorizationRequestResolver(clientRegistrationRepository, AUTHORIZATION_BASE_URI);
  }

  @Override
  public OAuth2AuthorizationRequest resolve(final HttpServletRequest request) {

    return Optional.ofNullable(defaultAuthorizationRequestResolver.resolve(request))
      .map(this::customAuthorizationRequest)
      .orElse(null);
  }

  @Override
  public OAuth2AuthorizationRequest resolve(final HttpServletRequest request, final String clientRegistrationId) {

    return Optional.ofNullable(defaultAuthorizationRequestResolver.resolve(request, clientRegistrationId))
      .map(this::customAuthorizationRequest)
      .orElse(null);
  }

  private OAuth2AuthorizationRequest customAuthorizationRequest(final OAuth2AuthorizationRequest authorizationRequest) {

    final Map<String, Object> additionalParams = new LinkedHashMap<>(authorizationRequest.getAdditionalParameters());
    additionalParams.put("prompt", "select_account");
    return OAuth2AuthorizationRequest.from(authorizationRequest)
      .additionalParameters(additionalParams)
      .build();
  }
}
