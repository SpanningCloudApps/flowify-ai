/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.controller.ticket;

import java.util.List;

import com.spanning.api.dto.response.ticket.TicketResponseDto;
import com.spanning.api.facade.ticket.TicketFacade;
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
@RequestMapping("/api/tickets")
@Validated
public class TicketController {

  private final TicketFacade ticketFacade;

  @GetMapping
  public List<TicketResponseDto> getAll() {
    return ticketFacade.getAll();
  }

}
