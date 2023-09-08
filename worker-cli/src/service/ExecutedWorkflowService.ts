/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import WorkflowRepository from '../repository/data/WorkflowRepository';
import ExecutedWorkflowRepository from '../repository/data/ExecutedWorkflowRepository';
import { WorkflowRow } from '../repository/model/Workflow';
import { StepType } from '../enum/StepType';

export default class ExecutedWorkflowService {

  private readonly executedWorkflowRepository: ExecutedWorkflowRepository;

  constructor(executedWorkflowRepository: ExecutedWorkflowRepository) {
    this.executedWorkflowRepository = executedWorkflowRepository;
  }

  public async getOrCreateExecutedWorkflow(workflow: WorkflowRow, firstStep: StepType, workflowExecutionId?: number): Promise<any> {
    return this.executedWorkflowRepository.getOrCreateExecutedWorkflow(workflow, firstStep, workflowExecutionId)
  }

}
