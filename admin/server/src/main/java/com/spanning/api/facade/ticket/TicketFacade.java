/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.facade.ticket;

import java.util.List;

import com.spanning.api.dto.response.ticket.TicketResponseDto;
import com.spanning.core.service.ticket.TicketService;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TicketFacade {

  private final TicketService ticketService;

  public List<TicketResponseDto> getAll() {
    return ticketService.getAll();
  }
}