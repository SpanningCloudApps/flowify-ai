/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.config.security;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class CorsConfig implements WebMvcConfigurer {

  private final String uiUrl;

  @Autowired
  public CorsConfig(@Value("${proxy.admin-ui.url}") final String uiUrl) {
    this.uiUrl = uiUrl;
  }

  @Override
  public void addCorsMappings(@NotNull final CorsRegistry registry) {
    registry
      .addMapping("/**")
      .allowedOrigins(uiUrl)
      .allowedMethods("*")
      .allowCredentials(true);
  }
}
