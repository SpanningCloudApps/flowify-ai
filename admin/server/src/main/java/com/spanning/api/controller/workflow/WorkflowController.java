/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.controller.workflow;

import java.util.List;

import com.spanning.api.facade.workflow.WorkflowFacade;
import com.spanning.config.security.UserContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RestController
@RequestMapping("/api/workflows")
@Validated
public class WorkflowController {

  private final UserContext userContext;

  private final WorkflowFacade workflowFacade;

  @GetMapping
  public List<Object> getAll() {
    return workflowFacade.getAll();
  }

}
