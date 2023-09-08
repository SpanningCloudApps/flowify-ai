/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.dto.request.ticket;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@EqualsAndHashCode
@ToString
public class SearchParams {

  private final String title;
  private final String description;
  private final String createdBy;
  private final String workflowName;
  private final Boolean isClassified;
  private final Long pageToken;
  private final long limit;
}
