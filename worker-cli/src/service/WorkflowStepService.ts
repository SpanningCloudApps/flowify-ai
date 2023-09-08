/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import WorkflowStepRepository from '../repository/data/WorkflowStepRepository';
import { WorkflowStepRow } from '../repository/model/WorkflowStep';

export default class WorkflowStepService {

  private readonly workflowStepRepository: WorkflowStepRepository;

  constructor(workflowStepRepository: WorkflowStepRepository) {
    this.workflowStepRepository = workflowStepRepository;
  }

  public async getWorkflowSteps(workflowName: WorkflowType): Promise<Array<WorkflowStepRow>> {
    return await this.workflowStepRepository.getWorkflowSteps(workflowName);
  }

}
