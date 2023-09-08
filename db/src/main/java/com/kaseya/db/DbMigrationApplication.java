/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.kaseya.db;

import com.kaseya.db.migration.FlywayMigration;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, XADataSourceAutoConfiguration.class})
@Log4j2
public class DbMigrationApplication implements ApplicationRunner {
  private final FlywayMigration flywayMigration;

  public static void main(String[] args) {
    log.info("STARTING DB MIGRATION");
    SpringApplication.run(DbMigrationApplication.class, args);
    log.info("DB MIGRATION FINISHED");
  }

  @Override
  public void run(ApplicationArguments args) throws IllegalArgumentException {;
    flywayMigration.migrate(args);
  }
}
