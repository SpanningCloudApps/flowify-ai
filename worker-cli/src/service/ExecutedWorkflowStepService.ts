/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import ExecutedWorkflowStepRepository from '../repository/data/ExecutedWorkflowStepRepository';
import { WorkflowStepRow } from '../repository/model/WorkflowStep';
import { ExecutedWorkflowStepRow } from '../repository/model/ExecutedWorkflowStep';
import { StepExecutionStatus } from '../enum/StepExecutionStatus';
import { StepType } from '../enum/StepType';

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

  public async getWaitingStep(executedWorkflowId: number, workflowSteps: Array<WorkflowStepRow>): Promise<WorkflowStepRow> {
    const waitingStep = await this.executedWorkflowStepRepository.getWaitingStep(executedWorkflowId);

    if (!waitingStep) {
      return await this.getNextStep(executedWorkflowId, workflowSteps);
    }

    return workflowSteps.find(step => step.type === waitingStep?.type)!;
  }

  public async getExecutedSteps(executedWorkflowId: number): Promise<Array<ExecutedWorkflowStepRow>> {
    return await this.executedWorkflowStepRepository.getAllSteps(executedWorkflowId);
  }

  public async createStepExecution(executedWorkflowId: number, workflowStep: WorkflowStepRow) {
    const executedWorkflowStepRow: ExecutedWorkflowStepRow = {
      workflow_step_id: workflowStep.id,
      workflow_execution_id: executedWorkflowId,
      type: workflowStep.type,
      status: StepExecutionStatus.WAITING_FOR_RESULT,
      data: {}
    }
    await this.executedWorkflowStepRepository.createStepExecution(executedWorkflowStepRow);
  }

  public async updateStepExecutionWithUserData(executedWorkflowId: number, stepType: StepType, clientResponse: string) {
    await this.executedWorkflowStepRepository.updateStepExecutionWithUserData(executedWorkflowId, stepType, clientResponse);
  }

}
