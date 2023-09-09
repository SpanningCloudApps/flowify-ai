package com.spanning.core.repository.workflow;

import java.util.List;

import com.spanning.core.dto.response.workflow.Workflow;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkflowRepository extends CrudRepository<Workflow, Object> {

  @Modifying
  @Query("DELETE from workflow WHERE id = :id")
  void delete(@Param("id") final long id);

  @Query("""
     SELECT id, cast(data as varchar), description, name, created_at FROM workflow AS w
         WHERE (:pageToken IS NULL OR id < :pageToken)
         AND ((:workflowName IS NULL AND :description IS NULL )
         OR (:workflowName IS NOT NULL AND w.name ILIKE CONCAT('%', :workflowName, '%'))
         OR (:description IS NOT NULL AND w.description ILIKE CONCAT('%', :description, '%')))
       ORDER by id DESC LIMIT :limit;
     """)
  List<Workflow> search(
    @Param("workflowName") final String workflowName,
    @Param("description") final String description,
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
