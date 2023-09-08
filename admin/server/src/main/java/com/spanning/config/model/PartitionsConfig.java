/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.config.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ToString
@ConfigurationProperties(prefix = "partitions")
@Getter
@Setter
@EqualsAndHashCode
public class PartitionsConfig {

  private ElasticPartitionConfig elasticsearch;
  private List<SourcePartitionConfig> mysql;

  @Getter
  @Setter
  @EqualsAndHashCode
  @AllArgsConstructor
  @NoArgsConstructor
  public static class ElasticPartitionConfig {

    private List<SourcePartitionConfig> gmail;
    private List<SourcePartitionConfig> drive;
  }

  @ToString
  @Getter
  @Setter
  @EqualsAndHashCode
  @AllArgsConstructor
  @NoArgsConstructor
  public static class SourcePartitionConfig {

    private int id;
    private boolean capped;
  }

}
