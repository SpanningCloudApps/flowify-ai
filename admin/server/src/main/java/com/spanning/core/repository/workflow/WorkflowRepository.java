package com.spanning.core.repository.workflow;

import com.spanning.core.dto.response.workflow.Workflow;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkflowRepository extends CrudRepository<Workflow, Object> {

  @Modifying
  @Query("DELETE from workflow WHERE id = :id")
  void delete(@Param("id") final long id);

  @Query("""
     SELECT id, cast(data as varchar), description, name, created_at FROM workflow AS w
         WHERE (:pageToken IS NULL OR id < :pageToken)
       AND (:workflowName IS NULL OR ( w.name ILIKE CONCAT('%', :workflowName, '%'))) ORDER by id DESC LIMIT :limit;
     """)
  List<Workflow> search(
    @Param("workflowName") final String workflowName,
    @Param("pageToken") final Long pageToken,
    @Param("limit") final Long limit
  );

  @Query("""
    INSERT INTO workflow(name, description)
    VALUES (:name, :description) returning id, cast(data as varchar), description, name, created_at
    """)
  Workflow create(final String name, final String description);

  @Query("""
    SELECT id, cast(data as varchar), description, name, created_at FROM workflow AS w
        WHERE  id = :id;
    """)
  Workflow get(
    @Param("id") final Long id
  );

  @Query("""
    SELECT id, cast(data as varchar), description, name, created_at FROM workflow AS w
        WHERE  name = :workflowName;
    """)
  Workflow getByName(@Param("workflowName") final String workflowName);
}
