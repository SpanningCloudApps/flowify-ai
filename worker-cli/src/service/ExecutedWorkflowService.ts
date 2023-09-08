/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import ExecutedWorkflowRepository from '../repository/data/ExecutedWorkflowRepository';
import { WorkflowRow } from '../repository/model/Workflow';
import { StepType } from '../enum/StepType';

export default class ExecutedWorkflowService {

  private readonly executedWorkflowRepository: ExecutedWorkflowRepository;

  constructor(executedWorkflowRepository: ExecutedWorkflowRepository) {
    this.executedWorkflowRepository = executedWorkflowRepository;
  }

  public async getOrCreateExecutedWorkflow(workflow: WorkflowRow, firstStep: StepType, actor?: string, workflowExecutionId?: number): Promise<any> {
    return this.executedWorkflowRepository.getOrCreateExecutedWorkflow(workflow, firstStep, actor, workflowExecutionId)
  }

  public async updateExecutedWorkflowStep(executedWorkflowId: number, stepType: StepType) {
    return this.executedWorkflowRepository.updateExecutedWorkflowStep(executedWorkflowId, stepType);
  }

}
