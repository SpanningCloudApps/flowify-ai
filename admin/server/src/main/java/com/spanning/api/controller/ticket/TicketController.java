package com.spanning.api.controller.ticket;

import javax.validation.Valid;

import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto;
import com.spanning.api.dto.request.ticket.UpdateTicketsRequestDto;
import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.api.facade.ticket.TicketFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RestController
@RequestMapping("/api/tickets")
@Validated
public class TicketController {

  private final TicketFacade ticketFacade;

  @PostMapping("/search")
  public TicketsResponseDto search(
    @Valid @RequestBody final SearchTicketsRequestDto requestDto
  ) {
    return ticketFacade.search(requestDto);
  }

  @PutMapping("/{id}")
  public void update(
    @PathVariable("id") final Long id,
    @Valid @RequestBody final UpdateTicketsRequestDto requestDto) {
    ticketFacade.update(id, requestDto);
  }

}
