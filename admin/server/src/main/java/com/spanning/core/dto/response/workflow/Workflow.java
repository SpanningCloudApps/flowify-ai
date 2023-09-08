/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.dto.response.workflow;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;
import org.springframework.data.relational.core.mapping.Table;

@Table("workflow")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Jacksonized
@Builder
@Getter
@EqualsAndHashCode
@ToString
public class Workflow {

  private final long id;
  private final String name;
  private final String description;
  private final String data;
  private final LocalDateTime createdAt;

}
