/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Command } from '@oclif/core';
import QueueService from '../service/QueueService';
import WorkflowExecutionFacade from '../facade/WorkflowExecutionFacade';
import WorkflowService from '../service/WorkflowService';
import WorkflowStepService from '../service/WorkflowStepService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';
import WorkflowStepExecutor from '../executor/WorkflowStepExecutor';
import ExecutedWorkflowService from '../service/ExecutedWorkflowService';

export default class WorkflowListenerCommand extends Command {
  static description = 'Listen to workflow execution';

  async run(): Promise<void> {
    const queueService = new QueueService();
    await queueService.initialize_queues();

    const workflowService = new WorkflowService();
    const workflowStepService = new WorkflowStepService();
    const executedWorkflowService = new ExecutedWorkflowService();
    const executedWorkflowStepService = new ExecutedWorkflowStepService();
    const workflowStepExecutor = new WorkflowStepExecutor(executedWorkflowService, executedWorkflowStepService);

    const workflowFacade = new WorkflowExecutionFacade(
      workflowService,
      workflowStepService,
      executedWorkflowService,
      executedWorkflowStepService,
      workflowStepExecutor,
      queueService
    );

    queueService.subscribeToWorkflows(workflowFacade.startWorkflow);
    queueService.subscribeToStepResults(workflowFacade.handleStepResultReceived);
  }
}
