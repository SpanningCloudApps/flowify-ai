/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.ticket;

import java.util.List;
import java.util.Objects;

import com.spanning.api.converter.ticket.TicketConverter;
import com.spanning.api.converter.workflow.WorkflowConverter;
import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto;
import com.spanning.api.dto.request.ticket.UpdateTicketsRequestDto;
import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.core.dto.request.ticket.SearchParams;
import com.spanning.core.dto.request.ticket.UpdateParams;
import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.response.ticket.ClassificationResult;
import com.spanning.core.service.ticket.TicketService;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TicketFacade {

  private final TicketService ticketService;

  private final WorkflowService workflowService;

  private final TicketConverter ticketConverter;

  private final WorkflowConverter workflowConverter;

  public TicketsResponseDto search(final SearchTicketsRequestDto requestDto) {
    final SearchParams searchParams = ticketConverter.convert(requestDto);
    final List<ClassificationResult> classificationResults = ticketService.search(searchParams);
    return ticketConverter.convert(classificationResults);
  }

  @Transactional
  public void update(final Long id, final UpdateTicketsRequestDto requestDto) {
    if (Objects.nonNull(requestDto.getDescription())) {
      final CreateParams createParams = CreateParams.builder()
        .description(requestDto.getDescription())
        .name(requestDto.getWorkflowName())
        .build();
      workflowService.create(createParams);
    }
    final UpdateParams updateParams = ticketConverter.convert(id, requestDto);
    ticketService.update(updateParams);
  }
}
