/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.dto.request.ticket;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@EqualsAndHashCode
@ToString
public class UpdateParams {

  private final Long id;
  private final String workflowName;
}
