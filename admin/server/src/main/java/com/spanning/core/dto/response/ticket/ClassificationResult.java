package com.spanning.core.dto.response.ticket;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;
import org.springframework.data.relational.core.mapping.Table;

@Table("classification_result")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Jacksonized
@Builder
@Getter
@EqualsAndHashCode
@ToString
public class ClassificationResult {

  private final long id;
  private final String input;
  private final String workflowName;
  private final float probability;
  private final String data;
  private final LocalDateTime createdAt;

}
