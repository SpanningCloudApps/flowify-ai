/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.config.security;

import org.springframework.boot.web.servlet.server.CookieSameSiteSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SameSiteSupplier {

  @Bean
  public CookieSameSiteSupplier applicationCookieSameSiteSupplier() {
    return CookieSameSiteSupplier.ofLax();
  }
}
