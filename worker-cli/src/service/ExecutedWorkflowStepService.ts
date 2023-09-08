/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import ExecutedWorkflowStepRepository from '../repository/data/ExecutedWorkflowStepRepository';

export default class ExecutedWorkflowStepService {

  private readonly executedWorkflowRepository: ExecutedWorkflowStepRepository;

  constructor(executedWorkflowRepository: ExecutedWorkflowStepRepository) {
    this.executedWorkflowRepository = executedWorkflowRepository;
  }

  public async getNextStep(executedWorkflowId: number, workflowSteps: any[]) {
    const executedSteps = await this.executedWorkflowRepository.getExecutedSteps(executedWorkflowId);
    const executedTypes = executedSteps.map(step => step.type);
    const remainingSteps = workflowSteps.filter(step => !executedTypes.includes(step.type));
    return remainingSteps[0];
  }

}
