package com.spanning.api.dto.request.workflow;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;

@Getter
@Builder
@Jacksonized
@EqualsAndHashCode
@ToString
public class CreateWorkflowsRequestDto {

  private String description;

  private String workflowName;

}
