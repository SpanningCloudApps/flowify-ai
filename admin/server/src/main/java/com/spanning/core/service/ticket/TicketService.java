/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.service.ticket;

import java.util.List;

import com.spanning.api.dto.response.ticket.TicketResponseDto;
import com.spanning.core.dto.request.ticket.SearchParams;
import com.spanning.core.dto.request.ticket.UpdateParams;
import com.spanning.core.dto.response.ticket.ClassificationResult;
import com.spanning.core.repository.tickets.ClassificationResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TicketService {

  private final ClassificationResultRepository classificationResultRepository;

  public List<ClassificationResult> search(final SearchParams searchParams) {
    return classificationResultRepository.search(
      searchParams.getTitle(),
      searchParams.getDescription(),
      searchParams.getCreatedBy(),
      searchParams.getWorkflowName(),
      searchParams.getIsClassified(),
      searchParams.getPageToken(),
      searchParams.getLimit()
    );
  }

  public void update(final UpdateParams updateParams) {
    classificationResultRepository.updateWorkflowName(updateParams.getId(), updateParams.getWorkflowName());
  }
}
