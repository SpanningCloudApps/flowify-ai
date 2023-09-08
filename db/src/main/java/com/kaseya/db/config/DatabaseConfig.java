/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.kaseya.db.config;

import com.kaseya.db.migration.FlywayMigration;
import com.kaseya.db.properties.DbProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(DbProperties.class)
public class DatabaseConfig {
  private final DbProperties properties;

  @Autowired
  public DatabaseConfig(final DbProperties properties) {
    this.properties = properties;
  }

  @Bean
  public FlywayMigration migration() {
    return new FlywayMigration(properties);
  }
}
