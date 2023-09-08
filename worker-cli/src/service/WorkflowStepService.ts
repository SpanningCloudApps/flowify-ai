/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import WorkflowStepRepository from '../repository/data/WorkflowStepRepository';

export default class WorkflowStepService {

  private readonly workflowStepRepository: WorkflowStepRepository;

  constructor(workflowStepRepository: WorkflowStepRepository) {
    this.workflowStepRepository = workflowStepRepository;
  }

  public async getWorkflowSteps(workflowId: WorkflowType): Promise<any[]> {
    return await this.workflowStepRepository.getWorkflowSteps(workflowId);
  }

}
