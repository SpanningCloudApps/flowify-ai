package com.spanning.api.facade.ticket;

import java.util.List;
import java.util.Optional;

import com.spanning.api.converter.ticket.TicketConverter;
import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto;
import com.spanning.api.dto.request.ticket.UpdateTicketsRequestDto;
import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.config.security.UserContext;
import com.spanning.core.dto.request.ticket.SearchParams;
import com.spanning.core.dto.request.ticket.UpdateParams;
import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.response.ticket.ClassificationResult;
import com.spanning.core.dto.response.workflow.Workflow;
import com.spanning.core.service.ticket.TicketService;
import com.spanning.core.service.workflow.WorkflowService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class TicketFacade {

  private final TicketService ticketService;

  private final WorkflowService workflowService;

  private final TicketConverter ticketConverter;

  private final UserContext userContext;

  public TicketsResponseDto search(final SearchTicketsRequestDto requestDto) {
    final SearchParams searchParams = ticketConverter.convert(requestDto);
    final List<ClassificationResult> classificationResults = ticketService.search(searchParams);
    return ticketConverter.convert(classificationResults);
  }

  @Transactional
  public void update(final Long id, final UpdateTicketsRequestDto requestDto) {
    final String user = userContext.getUser();
    log.info("User[{}] updating ticket id=[{}], requestDto = [{}]", user, id, requestDto);

    final Workflow workflow = Optional.of(id)
      .map(workflowService::get)
      .orElseGet(() -> {
        final CreateParams createParams = CreateParams.builder()
          .description(requestDto.getDescription())
          .name(requestDto.getWorkflowName())
          .build();
        log.info("User[{}] creating workflow , createParams = [{}]", user, createParams);
        return workflowService.create(createParams);
      });

    log.info("User[{}] linking ticket id=[{}] to workflow [{}]", user, id, workflow.getName());
    final UpdateParams updateParams = ticketConverter.convert(id, requestDto);
    ticketService.update(updateParams);
  }
}
