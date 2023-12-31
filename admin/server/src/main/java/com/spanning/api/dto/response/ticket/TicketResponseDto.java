package com.spanning.api.dto.response.ticket;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@Builder
@ToString
public class TicketResponseDto {

  private final long id;
  private final String createdBy;
  private final String title;
  private final String description;
  private final List<String> additionalInfo;
  private final float probability;
  private final String workflowName;
  private final String data;

}
