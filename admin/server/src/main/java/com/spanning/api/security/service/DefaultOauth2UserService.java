/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.ProviderDetails;
import org.springframework.security.oauth2.client.registration.ClientRegistration.ProviderDetails.UserInfoEndpoint;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor(onConstructor_ = @Autowired)
public class DefaultOauth2UserService extends OidcUserService {

  @Override
  public OidcUser loadUser(final OidcUserRequest userRequest) throws OAuth2AuthenticationException {

    final Set<SimpleGrantedAuthority> authorities = Set.of(new SimpleGrantedAuthority("USER_ROLE"));
    return getUser(userRequest, authorities);
  }

  private OidcUser getUser(
    final OidcUserRequest userRequest,
    final Set<SimpleGrantedAuthority> authorities
  ) {
    return Optional.of(userRequest)
      .map(OAuth2UserRequest::getClientRegistration)
      .map(ClientRegistration::getProviderDetails)
      .map(ProviderDetails::getUserInfoEndpoint)
      .map(UserInfoEndpoint::getUserNameAttributeName)
      .map(name -> new DefaultOidcUser(List.of(), userRequest.getIdToken(), name))
      .orElseGet(() -> new DefaultOidcUser(authorities, userRequest.getIdToken()));
  }

}
