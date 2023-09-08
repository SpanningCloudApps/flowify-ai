/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

package com.spanning.core.repository.tickets;

import java.util.List;

import com.spanning.core.dto.response.ticket.ClassificationResult;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassificationResultRepository extends CrudRepository<ClassificationResult, Object> {

  @Modifying
  @Query("UPDATE classification_result SET workflow_name = :workflowName WHERE id = :id")
  void updateWorkflowName(
    @Param("id") final long id,
    @Param("workflowName") final String workflowName
  );
  @Query("""
     SELECT id, cast(input as varchar), workflow_name, probability, cast(data as varchar), created_at FROM classification_result AS c
         WHERE (:pageToken IS NULL OR id < :pageToken)
       AND ((:title IS NULL AND :description IS NULL AND :createdBy IS NULL AND :workflowName IS NULL)
         OR (:title IS NOT NULL AND c.input->>'title' ILIKE CONCAT('%', :title, '%'))
         OR (:description IS NOT NULL AND c.input->>'description' ILIKE CONCAT('%', :description, '%'))
         OR (:createdBy IS NOT NULL AND c.input->>'createdBy' ILIKE CONCAT('%', :createdBy, '%'))
         OR (:workflowName IS NOT NULL AND c.workflow_name ILIKE CONCAT('%', :workflowName, '%')))
         ORDER by id DESC LIMIT :limit;
     """)
  List<ClassificationResult> search(
    @Param("title") final String title,
    @Param("description") final String description,
    @Param("createdBy") final String createdBy,
    @Param("workflowName") final String workflowName,
    @Param("isClassified") final Boolean isClassified,
    @Param("pageToken") final Long pageToken,
    @Param("limit") final Long limit
  );

}
