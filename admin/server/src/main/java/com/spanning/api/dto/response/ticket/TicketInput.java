package com.spanning.api.dto.response.ticket;

import java.util.List;

import lombok.Builder;
import lombok.Builder.Default;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
@Getter
@EqualsAndHashCode
@ToString
public class TicketInput {

  private final String title;

  private final String description;

  private final String createdBy;

  @Default
  private final List<String> additionalInfo = List.of();
}
