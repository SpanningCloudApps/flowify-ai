package com.kaseya.db.properties;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@AllArgsConstructor
@Getter
@ConstructorBinding
@ConfigurationProperties(prefix = "sql")
@ToString
public class DbProperties {

  private static final String BASE_LOCATION_PATH = "db/migrate/";

  @NonNull
  private final Map<String, Map<String, Database>> databases;
  @NonNull
  private final String pgDriverClassName;

  public String getLocation(final String db) {
    return BASE_LOCATION_PATH + db;
  }

  @AllArgsConstructor
  @Getter
  @ToString(onlyExplicitlyIncluded = true)
  public static class Database {

    @ToString.Include
    private final String username;
    private final String password;
    @ToString.Include
    private final String url;
  }
}
