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
      .id(2L)
        .title("SGC-123 Add user superuper@domain.com")
        .description("A great product description always talks about the buyer first and then articulate the specifications. It also addresses its target audience directly using the pronoun YOU.")
        .createdBy("RomanRomanov@email.com")
        .additionalInfo(List.of("item1", "item2"))
        .data("[{\"WORKFLOW\": \"NAME1\", \"probability\":12.333209},"
          + " {\"WORKFLOW\": \"NAME2\", \"probability\":22.333209}]")
        .workflowName("SELECTED_WORKFLOW")
        .probability(95.333209f)
      .build(),
      TicketResponseDto.builder()
        .id(1L)
        .title("SGC-456 Please re-index contacts")
        .description("If you don’t keep a laser-targeted audience in focus, then your product description will turn out to be wishy-washy. And in the end, you would be addressing no one at all.")
        .createdBy("Hari@email.com")
        .additionalInfo(List.of("item12", "searchItem"))
        .data("[{\"WORKFLOW\": \"NAME4\", \"probability\":12.333209},"
          + " {\"WORKFLOW\": \"NAME5\", \"probability\":22.333209}]")
        .workflowName("SELECTED_WORKFLOW2")
        .probability(95.333209f)
        .build()
      );
  }

}
