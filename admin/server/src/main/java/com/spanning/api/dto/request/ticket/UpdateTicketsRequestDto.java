package com.spanning.api.dto.request.ticket;

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
public class UpdateTicketsRequestDto {

  private String workflowName;

  private String description;
}
