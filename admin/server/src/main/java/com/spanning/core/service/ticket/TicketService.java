/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.service.ticket;

import java.util.List;

import com.spanning.api.dto.response.ticket.TicketResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class TicketService {

  public List<TicketResponseDto> getAll() {
    return List.of(
      TicketResponseDto.builder()
      .id(1L)
        .input("{\"some\":\"data\"}")
        .data("[{\"WORKFLOW\": \"NAME1\", \"probability\":12.333209},"
          + " {\"WORKFLOW\": \"NAME2\", \"probability\":22.333209}]")
        .workflowName("SELECTED_WORKFLOW")
        .probability(95.333209f)
      .build(),
      TicketResponseDto.builder()
        .id(2L)
        .input("{\"some2\":\"data2\"}")
        .data("[{\"WORKFLOW\": \"NAME4\", \"probability\":12.333209},"
          + " {\"WORKFLOW\": \"NAME5\", \"probability\":22.333209}]")
        .workflowName("SELECTED_WORKFLOW")
        .probability(95.333209f)
        .build()
      );
  }

}
