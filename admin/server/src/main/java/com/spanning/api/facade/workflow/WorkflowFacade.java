/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.workflow;

import java.util.List;

import com.spanning.api.converter.workflow.WorkflowConverter;
import com.spanning.api.dto.request.workflow.CreateWorkflowsRequestDto;
import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto;
import com.spanning.api.dto.response.workflow.WorkflowResponseDto;
import com.spanning.api.dto.response.workflow.WorkflowsResponseDto;
import com.spanning.config.security.UserContext;
import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.request.workflow.SearchParams;
import com.spanning.core.dto.response.workflow.Workflow;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class WorkflowFacade {

  private final WorkflowService workflowService;

  private final WorkflowConverter workflowConverter;

  private final UserContext userContext;

  public WorkflowsResponseDto search(final SearchWorkflowsRequestDto requestDto) {
    final SearchParams searchParams = workflowConverter.convert(requestDto);
    final List<Workflow> workflows = workflowService.search(searchParams);
    return workflowConverter.convert(workflows);
  }

  public WorkflowResponseDto create(final CreateWorkflowsRequestDto requestDto) {
    final String user = userContext.getUser();
    log.info("User[{}] creating workflow , requestDto = [{}]", user, requestDto);
    final CreateParams createParams = workflowConverter.convert(requestDto);
    final Workflow workflow = workflowService.create(createParams);
    return workflowConverter.convertToResponseDto(workflow);
  }

  public void delete(final long id) {
    final String user = userContext.getUser();
    log.info("User[{}] deleting workflow id=[{}]", user, id);
    workflowService.delete(id);
  }
}
