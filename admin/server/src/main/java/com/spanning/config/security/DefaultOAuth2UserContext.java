/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.config.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Component;

@Component
public class DefaultOAuth2UserContext implements UserContext {
  @Override
  public String getUser() {
    return String.valueOf(((DefaultOAuth2User) SecurityContextHolder.getContext()
      .getAuthentication()
      .getPrincipal()
    ).getAttributes().get("email"));
  }
}
