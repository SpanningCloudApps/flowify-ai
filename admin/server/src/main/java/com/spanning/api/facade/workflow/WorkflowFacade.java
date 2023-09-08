/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.workflow;

import java.util.List;

import com.spanning.api.dto.response.workflow.WorkflowResponseDto;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class WorkflowFacade {

  private final WorkflowService workflowService;

  public List<WorkflowResponseDto> getAll() {
    return workflowService.getAll();
  }
}
