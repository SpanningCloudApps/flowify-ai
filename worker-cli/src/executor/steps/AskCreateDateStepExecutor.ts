/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';

export default class AskCreateDateStepExecutor implements StepExecutor {

  private readonly executedWorkflowService: ExecutedWorkflowService;

  constructor(
    executedWorkflowService: ExecutedWorkflowService
  ) {
    this.executedWorkflowService = executedWorkflowService;
  }

  execute(message: any): Promise<boolean> {
    return Promise.resolve(false);
  }

}
