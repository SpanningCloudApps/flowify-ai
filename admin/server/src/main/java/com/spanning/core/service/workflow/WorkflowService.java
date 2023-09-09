package com.spanning.core.service.workflow;

import java.util.List;
import java.util.Optional;

import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.request.workflow.SearchParams;
import com.spanning.core.dto.response.workflow.Workflow;
import com.spanning.core.repository.workflow.WorkflowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WorkflowService {

  private final WorkflowRepository workflowRepository;

  public List<Workflow> search(final SearchParams searchParams) {
    return workflowRepository.search(
      searchParams.getWorkflowName(),
      searchParams.getDescription(),
      searchParams.getPageToken(),
      searchParams.getLimit()
    );
  }

  public Workflow get(final long id) {
    return workflowRepository.get(id);
  }

  public void delete(final long id) {
    workflowRepository.delete(id);
  }

  public Workflow create(final CreateParams createParams) {
    final boolean ieAlreadyExist = Optional.of(createParams)
      .map(CreateParams::getName)
      .map(workflowRepository::getByName)
      .isPresent();

    if (ieAlreadyExist) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "Workflow=[" + createParams.getName() + "] already exists"
      );
    }
    return workflowRepository.create(createParams.getName(), createParams.getDescription());
  }
}
