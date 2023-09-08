/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import WorkflowRepository from '../repository/data/WorkflowRepository';

export default class WorkflowService {

  private readonly workflowRepository: WorkflowRepository;

  constructor(workflowRepository: WorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async getWorkflow(workflowName: WorkflowType) {
    return await this.workflowRepository.getWorkflow(workflowName);
  }

}
