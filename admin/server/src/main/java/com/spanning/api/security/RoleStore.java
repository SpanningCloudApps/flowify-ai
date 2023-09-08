/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.security;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("security")
@ConstructorBinding
@AllArgsConstructor
public class RoleStore {

  private Map<Role, List<String>> roles;

  public List<Role> getUserRoles(final String email) {
    return roles
      .entrySet()
      .stream()
      .filter(entry -> entry.getValue().contains(email))
      .map(Entry::getKey)
      .collect(Collectors.toList());
  }

  public enum Role {
    ADMIN,
    PROD_SUPPORT,
    READONLY
  }
}
