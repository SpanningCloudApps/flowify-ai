package com.spanning.api.controller.workflow;

import javax.validation.Valid;

import com.spanning.api.dto.request.workflow.CreateWorkflowsRequestDto;
import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto;
import com.spanning.api.dto.response.workflow.WorkflowResponseDto;
import com.spanning.api.dto.response.workflow.WorkflowsResponseDto;
import com.spanning.api.facade.workflow.WorkflowFacade;
import lombok.RequiredArgsConstructor;
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
public class WorkflowController {

  private final WorkflowFacade workflowFacade;

  @PostMapping("/search")
  public WorkflowsResponseDto search(
    @Valid @RequestBody final SearchWorkflowsRequestDto requestDto
  ) {
    return workflowFacade.search(requestDto);
  }

  @PostMapping()
  public WorkflowResponseDto create(
    @Valid @RequestBody final CreateWorkflowsRequestDto requestDto
  ) {
    return workflowFacade.create(requestDto);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable final long id) {
    workflowFacade.delete(id);
  }

}
