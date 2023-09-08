/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.controller.workflow;

import javax.validation.Valid;

import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto;
import com.spanning.api.dto.response.workflow.WorkflowsResponseDto;
import com.spanning.api.facade.workflow.WorkflowFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RestController
@RequestMapping("/api/workflows")
@Validated
@Slf4j
public class WorkflowController {

  private final WorkflowFacade workflowFacade;

  @PostMapping
  public WorkflowsResponseDto search(
    @Valid @RequestBody final SearchWorkflowsRequestDto requestDto
  ) {
    log.info(String.valueOf(requestDto));
    return workflowFacade.search(requestDto);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable final long id) {
    log.info("Delete workflowId = [{}]", id);
    workflowFacade.delete(id);
  }

}
