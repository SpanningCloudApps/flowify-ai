/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import QueueService from '../service/QueueService';
import WorkflowService from '../service/WorkflowService';
import WorkflowStepService from '../service/WorkflowStepService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';

export default class WorkflowExecutionFacade {

  private readonly queueService: QueueService;
  private readonly workflowService: WorkflowService;
  private readonly workflowStepService: WorkflowStepService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;

  constructor(
    workflowService: WorkflowService,
    workflowStepService: WorkflowStepService,
    executedWorkflowStepService: ExecutedWorkflowStepService,
    queueService: QueueService
  ) {
    this.workflowService = workflowService;
    this.workflowStepService = workflowStepService;
    this.executedWorkflowStepService = executedWorkflowStepService;
    this.queueService = queueService;
  }

  public async startWorkflow(message: any) {
    const { workflowId } = message;
    const workflow: any = await this.workflowService.getWorkflow(workflowId);
    const workflowSteps: any[] = await this.workflowStepService.getWorkflowSteps(workflowId);
    const nextStep = await this.executedWorkflowStepService.getNextStep(workflowId, workflowSteps);

    console.log(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep}`);
  }

  public async handleStepResultReceived(message: any) {

  }

}
