/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';

export default class CreateMicrosoftActiveDirectoryUser implements StepExecutor {

  private readonly executedWorkflowService: ExecutedWorkflowService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;

  constructor(
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService
  ) {
    this.executedWorkflowService = executedWorkflowService;
    this.executedWorkflowStepService = executedWorkflowStepService;
  }

  execute(message: any): Promise<boolean> {
    return Promise.resolve(false);
  }

}
