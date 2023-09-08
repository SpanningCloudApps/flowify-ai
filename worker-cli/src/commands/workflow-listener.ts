/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Command } from '@oclif/core';
import QueueService from '../service/QueueService';
import WorkflowFacade from '../facade/WorkflowFacade';

export default class WorkflowListenerCommand extends Command {
  static description = 'Listen to workflow execution';

  async run(): Promise<void> {
    const queueService = new QueueService();
    await queueService.initialize_queues();

    const workflowFacade = new WorkflowFacade(queueService);

    queueService.subscribeToWorkflows(workflowFacade.startWorkflow);
    queueService.subscribeToStepResults(workflowFacade.handleStepResultReceived);
  }
}
