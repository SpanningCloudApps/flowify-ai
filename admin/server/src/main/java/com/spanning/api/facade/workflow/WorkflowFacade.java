/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.workflow;

import java.util.List;

import com.spanning.api.converter.workflow.WorkflowConverter;
import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto;
import com.spanning.api.dto.response.workflow.WorkflowsResponseDto;
import com.spanning.core.dto.request.workflow.SearchParams;
import com.spanning.core.dto.response.workflow.Workflow;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class WorkflowFacade {

  private final WorkflowService workflowService;

  private final WorkflowConverter workflowConverter;

  public WorkflowsResponseDto search(final SearchWorkflowsRequestDto requestDto) {
    final SearchParams searchParams = workflowConverter.convert(requestDto);
    final List<Workflow> workflows = workflowService.search(searchParams);
    return workflowConverter.convert(workflows);
  }

  public void delete(final long id) {
    workflowService.delete(id);
  }
}
