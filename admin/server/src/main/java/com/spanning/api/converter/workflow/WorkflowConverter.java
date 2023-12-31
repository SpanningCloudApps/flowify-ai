package com.spanning.api.converter.workflow;

import java.util.List;
import java.util.Optional;

import com.spanning.api.dto.request.workflow.CreateWorkflowsRequestDto;
import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto;
import com.spanning.api.dto.request.workflow.SearchWorkflowsRequestDto.Search;
import com.spanning.api.dto.response.workflow.WorkflowResponseDto;
import com.spanning.api.dto.response.workflow.WorkflowsResponseDto;
import com.spanning.core.dto.request.workflow.CreateParams;
import com.spanning.core.dto.request.workflow.SearchParams;
import com.spanning.core.dto.response.workflow.Workflow;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface WorkflowConverter {

  List<WorkflowResponseDto> convertAll(final List<Workflow> workflows);


  WorkflowResponseDto convertToResponseDto(final Workflow workflow);

  @Mapping(target = "name", source = "workflowName")
  CreateParams convert(final CreateWorkflowsRequestDto request);

  default WorkflowsResponseDto convert(final List<Workflow> workflows) {
    return WorkflowsResponseDto.builder()
      .workflows(convertAll(workflows))
      .build();
  }

  default SearchParams convert(final SearchWorkflowsRequestDto requestDto) {

    final String workflowName = Optional.ofNullable(requestDto)
      .map(SearchWorkflowsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    final String description = Optional.ofNullable(requestDto)
      .map(SearchWorkflowsRequestDto::getSearch)
      .map(Search::getAll)
      .filter(StringUtils::isNotBlank)
      .orElse(null);

    final Long pageToken = Optional.ofNullable(requestDto)
      .map(SearchWorkflowsRequestDto::getPageToken)
      .orElse(null);

    return SearchParams.builder()
      .pageToken(pageToken)
      .workflowName(workflowName)
      .description(description)
      .limit(requestDto.getLimit())
      .build();
  }

}
