/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.spanning.api.security.RoleStore;
import com.spanning.api.security.RoleStore.Role;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.ProviderDetails;
import org.springframework.security.oauth2.client.registration.ClientRegistration.ProviderDetails.UserInfoEndpoint;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DefaultOauth2UserService extends OidcUserService {

  private static final String HOSTED_DOMAIN_CLAIM = "hd";
  private static final String EMAIL = "email";

  private final RoleStore roleStore;
  private final String hostedDomain;

  @Autowired
  public DefaultOauth2UserService(
    final RoleStore roleStore,
    @Value("${security.hosted-domain}") final String hostedDomain
  ) {
    this.roleStore = roleStore;
    this.hostedDomain = hostedDomain;
  }

  @Override
  public OidcUser loadUser(final OidcUserRequest userRequest) throws OAuth2AuthenticationException {

    final Optional<String> domain = Optional.ofNullable(userRequest)
      .map(OidcUserRequest::getIdToken)
      .map(OidcIdToken::getClaims)
      .map(claims -> (String) claims.get(HOSTED_DOMAIN_CLAIM))
      .filter(hostedDomain::equals);

    if (domain.isEmpty()) {
      log.error("Failed to authenticate. Invalid domain.");
      throw new OAuth2AuthenticationException("Invalid domain");
    }

    final Set<SimpleGrantedAuthority> authorities = Optional.of(userRequest)
      .map(this::getRoles)
      .map(Collection::stream)
      .map(stream -> stream
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toSet())
      )
      .orElseGet(Collections::emptySet);

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
      .map(name -> new DefaultOidcUser(authorities, userRequest.getIdToken(), name))
      .orElseGet(() -> new DefaultOidcUser(authorities, userRequest.getIdToken()));
  }

  private Set<String> getRoles(final OidcUserRequest request) {
    return Optional.of(request)
      .map(OidcUserRequest::getIdToken)
      .map(OidcIdToken::getClaims)
      .map(claims -> (String) claims.get(EMAIL))
      .map(roleStore::getUserRoles)
      .filter(CollectionUtils::isNotEmpty)
      .orElseGet(() -> List.of(Role.READONLY))
      .stream()
      .map(Enum::name)
      .collect(Collectors.toSet());
  }
}
