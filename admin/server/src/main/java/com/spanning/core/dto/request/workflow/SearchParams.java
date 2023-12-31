package com.spanning.core.dto.request.workflow;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@EqualsAndHashCode
@ToString
public class SearchParams {

  private final String workflowName;
  private final String description;
  private final Long pageToken;
  private final long limit;
}
