/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security.converter;

import java.util.Optional;

import com.spanning.api.dto.response.AuthDto;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Mapper
public interface AuthConverter {
  @Mapping(target = "email", source = "principal", qualifiedByName = "retrieveEmail")
  @Mapping(target = "name", source = "principal", qualifiedByName = "retrieveName")
  @Mapping(target = "pictureUrl", source = "principal", qualifiedByName = "retrievePicture")
  AuthDto convert(final OAuth2AuthenticationToken auth);

  @Named("retrieveEmail")
  default String retrieveEmail(final OAuth2User user) {
    return Optional.of(user)
      .map(OAuth2AuthenticatedPrincipal::getAttributes)
      .map(attributes -> (String) attributes.get("email"))
      .orElse(StringUtils.EMPTY);
  }

  @Named("retrieveName")
  default String retrieveName(final OAuth2User user) {
    return Optional.of(user)
      .map(OAuth2AuthenticatedPrincipal::getAttributes)
      .map(attributes -> (String) attributes.get("name"))
      .orElse(StringUtils.EMPTY);
  }

  @Named("retrievePicture")
  default String retrievePicture(final OAuth2User user) {
    return Optional.of(user)
      .map(OAuth2AuthenticatedPrincipal::getAttributes)
      .map(attributes -> (String) attributes.get("picture"))
      .orElse(StringUtils.EMPTY);
  }
}
