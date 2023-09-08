/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';
import QueueService from '../../service/QueueService';

export default class CreateMicrosoftActiveDirectoryUser implements StepExecutor {

  private readonly executedWorkflowService: ExecutedWorkflowService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;
  private readonly queueService: QueueService;

  constructor(
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService,
    queueService: QueueService
  ) {
    this.executedWorkflowService = executedWorkflowService;
    this.executedWorkflowStepService = executedWorkflowStepService;
    this.queueService = queueService;
  }

  execute(message: any): Promise<boolean> {
    return Promise.resolve(false);
  }

}
