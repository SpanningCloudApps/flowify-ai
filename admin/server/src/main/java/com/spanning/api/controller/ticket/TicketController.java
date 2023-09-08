/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.controller.ticket;

import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.api.facade.ticket.TicketFacade;
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
  public TicketsResponseDto getAll() {
    return TicketsResponseDto.builder()
      .tickets(ticketFacade.getAll())
      .build();
  }

}
