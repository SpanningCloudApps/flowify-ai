package com.spanning.api.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@Builder
@ToString
public class ApiErrorResponseDto implements Serializable {

  private static final long serialVersionUID = -5753854150058504467L;

  private final LocalDateTime timestamp;
  private int status;
  private String message;
  private String exception;

  private ApiErrorResponseDto() {
    this.timestamp = LocalDateTime.now();
  }

  public ApiErrorResponseDto(final String message, final HttpStatus status) {
    this();
    this.status = status.value();
    this.exception = status.getReasonPhrase();
    this.message = message;
  }

  public ApiErrorResponseDto(final Exception ex, final HttpStatus status) {
    this(ex.getMessage(), status);
  }
}
