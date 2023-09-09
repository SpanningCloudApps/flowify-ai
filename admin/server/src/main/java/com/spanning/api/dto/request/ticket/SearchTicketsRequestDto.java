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
public class SearchTicketsRequestDto {

  private Long pageToken;

  private Long limit;

  private Boolean isClassified;

  private Search search;

  @Getter
  @Builder
  @Jacksonized
  @EqualsAndHashCode
  @ToString
  public static class Search {

    private final String all;
  }
}
