/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.dto.response;

import java.util.List;

import com.spanning.api.security.RoleStore.Role;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@EqualsAndHashCode
@Getter
@ToString
public class AuthDto {

  private final List<Role> roles;
  private final String email;
  private final String name;
  private final String pictureUrl;
}
