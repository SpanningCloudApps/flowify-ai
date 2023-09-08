/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.service.workflow;

import java.util.List;

import com.spanning.api.dto.response.workflow.WorkflowResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkflowService {

  public List<WorkflowResponseDto> getAll() {
    return List.of(
      WorkflowResponseDto.builder()
        .id(1L)
        .name("NAME1")
        .description("description")
        .build(),
      WorkflowResponseDto.builder()
        .id(2L)
        .name("NAME2")
        .description("description2")
        .build());
  }

}
