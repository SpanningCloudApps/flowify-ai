/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.controller;

import com.spanning.api.dto.response.AuthDto;
import com.spanning.api.security.converter.AuthConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AuthController {

  private final AuthConverter authConverter;

  @RequestMapping("/me")
  public AuthDto user(final OAuth2AuthenticationToken auth) {
    return authConverter.convert(auth);
  }
}
