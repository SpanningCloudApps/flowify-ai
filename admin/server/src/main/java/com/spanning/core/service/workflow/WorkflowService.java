/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.service.workflow;

import java.util.List;

import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.request.workflow.SearchParams;
import com.spanning.core.dto.response.workflow.Workflow;
import com.spanning.core.repository.workflow.WorkflowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkflowService {

  private final WorkflowRepository workflowRepository;

  public List<Workflow> search(final SearchParams searchParams) {
    return workflowRepository.search(
      searchParams.getWorkflowName(),
      searchParams.getPageToken(),
      searchParams.getLimit()
    );
  }

  public void delete(final long id) {
    workflowRepository.delete(id);
  }

  public Workflow create(final CreateParams createParams) {
    return workflowRepository.save(
      Workflow.builder()
        .name(createParams.getName())
        .description(createParams.getDescription())
        .build()
    );
  }
}
