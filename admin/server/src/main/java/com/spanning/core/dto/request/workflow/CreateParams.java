
package com.spanning.core.dto.request.workflow;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@EqualsAndHashCode
@ToString
public class CreateParams {

  private final String description;
  private final String name;
}
