/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import ExecutedWorkflowStepRepository from '../repository/data/ExecutedWorkflowStepRepository';
import { WorkflowStepRow } from '../repository/model/WorkflowStep';
import { ExecutedWorkflowStepRow } from '../repository/model/ExecutedWorkflowStep';
import { StepExecutionStatus } from '../enum/StepExecutionStatus';

export default class ExecutedWorkflowStepService {

  private readonly executedWorkflowStepRepository: ExecutedWorkflowStepRepository;

  constructor(executedWorkflowStepRepository: ExecutedWorkflowStepRepository) {
    this.executedWorkflowStepRepository = executedWorkflowStepRepository;
  }

  public async getNextStep(executedWorkflowId: number, workflowSteps: any[]) {
    const executedSteps = await this.executedWorkflowStepRepository.getExecutedSteps(executedWorkflowId);
    const executedTypes = executedSteps.map(step => step.type);
    const remainingSteps = workflowSteps.filter(step => !executedTypes.includes(step.type));
    return remainingSteps[0];
  }

  public async createStepExecution(executedWorkflowId: number, workflowStep: WorkflowStepRow) {
    const executedWorkflowStepRow: ExecutedWorkflowStepRow = {
      workflow_step_id: workflowStep.id,
      workflow_execution_id: executedWorkflowId,
      type: workflowStep.type,
      status: StepExecutionStatus.WAITING_FOR_RESULT,
      data: {}
    }
    this.executedWorkflowStepRepository.createStepExecution(executedWorkflowStepRow);
  }

}
