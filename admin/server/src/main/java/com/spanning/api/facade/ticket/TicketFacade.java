/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.ticket;

import java.util.List;

import com.spanning.api.converter.ticket.TicketConverter;
import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto;
import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.core.dto.request.ticket.SearchParams;
import com.spanning.core.dto.response.ticket.ClassificationResult;
import com.spanning.core.service.ticket.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TicketFacade {

  private final TicketService ticketService;

  private final TicketConverter ticketConverter;

  public TicketsResponseDto search(final SearchTicketsRequestDto requestDto) {
    final SearchParams searchParams = ticketConverter.convert(requestDto);
    final List<ClassificationResult> classificationResults = ticketService.search(searchParams);
    return ticketConverter.convert(classificationResults);
  }
}
