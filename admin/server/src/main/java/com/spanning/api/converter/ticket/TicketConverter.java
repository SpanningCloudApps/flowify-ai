/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.api.converter.ticket;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto;
import com.spanning.api.dto.request.ticket.SearchTicketsRequestDto.Search;
import com.spanning.api.dto.request.ticket.UpdateTicketsRequestDto;
import com.spanning.api.dto.response.ticket.TicketInput;
import com.spanning.api.dto.response.ticket.TicketResponseDto;
import com.spanning.api.dto.response.ticket.TicketsResponseDto;
import com.spanning.core.dto.request.ticket.SearchParams;
import com.spanning.core.dto.request.ticket.UpdateParams;
import com.spanning.core.dto.response.ticket.ClassificationResult;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;

@Mapper
public interface TicketConverter {

  static final ObjectMapper MAPPER = new ObjectMapper();

  List<TicketResponseDto> convertAll(final List<ClassificationResult> classificationResults);

  default TicketResponseDto convertToResponseDto(final ClassificationResult classificationResult)
    throws JsonProcessingException {
    final TicketInput input = MAPPER.readValue(classificationResult.getInput(), TicketInput.class);

    return TicketResponseDto.builder()
      .additionalInfo(input.getAdditionalInfo())
      .probability(classificationResult.getProbability())
      .workflowName(classificationResult.getWorkflowName())
      .id(classificationResult.getId())
      .data(classificationResult.getData())
      .title(input.getTitle())
      .description(input.getDescription())
      .createdBy(input.getCreatedBy())
      .build();
  }

  default TicketsResponseDto convert(final List<ClassificationResult> classificationResults) {
    return TicketsResponseDto.builder()
      .tickets(convertAll(classificationResults))
      .build();
  }

  UpdateParams convert(final Long id, final UpdateTicketsRequestDto request);


  default SearchParams convert(final SearchTicketsRequestDto requestDto) {
    final String title = Optional.ofNullable(requestDto)
      .map(SearchTicketsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    final String description = Optional.ofNullable(requestDto)
      .map(SearchTicketsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    final String createdBy = Optional.ofNullable(requestDto)
      .map(SearchTicketsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    final String workflowName = Optional.ofNullable(requestDto)
      .map(SearchTicketsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    return SearchParams.builder()
      .title(title)
      .description(description)
      .createdBy(createdBy)
      .workflowName(workflowName)
      .limit(requestDto.getLimit())
      .isClassified(requestDto.getIsClassified())
      .pageToken(requestDto.getPageToken())
      .build();
  }
}
