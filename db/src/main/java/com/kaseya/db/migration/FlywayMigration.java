/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.kaseya.db.migration;

import java.util.Map;
import java.util.stream.Collectors;

import com.kaseya.db.properties.DbProperties;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.MigrationInfo;
import org.flywaydb.core.internal.configuration.ConfigUtils;
import org.springframework.boot.ApplicationArguments;

@AllArgsConstructor
@Log4j2
public class FlywayMigration {

  private final DbProperties databases;

  public void migrate(final ApplicationArguments args) {

    databases.getDatabases().entrySet()
      .stream()
      .collect(Collectors.toMap(Map.Entry::getKey, entry -> entry.getValue().entrySet()
        .stream()
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue))))
      .forEach((dbName, value) -> value.forEach((dbPartitionId, dbConfiguration) -> {
        log.info("{} database partition {} migration is started.", dbName, dbPartitionId);

        final String driverClassName = databases.getPgDriverClassName();
        final Map<String, String> configuration = Map.of(
          //  base
          ConfigUtils.DRIVER, driverClassName,
          ConfigUtils.LOCATIONS, databases.getLocation(dbName),
          ConfigUtils.MIXED, "true",
          ConfigUtils.GROUP, "true",
          ConfigUtils.BASELINE_ON_MIGRATE, "true",
          // partition specific
          ConfigUtils.USER, dbConfiguration.getUsername(),
          ConfigUtils.PASSWORD, dbConfiguration.getPassword(),
          ConfigUtils.URL, dbConfiguration.getUrl(),
          "flyway.postgresql.transactional.lock", "false"
        );

        final Flyway flyway = Flyway.configure().configuration(configuration).load();
        flyway.migrate();

        final MigrationInfo current = flyway.info().current();
        if (current != null && current.getVersion() != null) {
          log.info("{} database partition {} migration applied. Version is {}", dbName, dbPartitionId, current.getVersion().toString());
        }
      }));
  }
}
