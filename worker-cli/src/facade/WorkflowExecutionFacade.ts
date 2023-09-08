/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import QueueService from '../service/QueueService';
import WorkflowService from '../service/WorkflowService';
import WorkflowStepService from '../service/WorkflowStepService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';
import WorkflowStepExecutor from '../executor/WorkflowStepExecutor';
import ExecutedWorkflowService from '../service/ExecutedWorkflowService';

export default class WorkflowExecutionFacade {

  private readonly queueService: QueueService;
  private readonly workflowService: WorkflowService;
  private readonly workflowStepService: WorkflowStepService;
  private readonly executedWorkflowService: ExecutedWorkflowService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;
  private readonly workflowStepExecutor: WorkflowStepExecutor;

  constructor(
    workflowService: WorkflowService,
    workflowStepService: WorkflowStepService,
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService,
    workflowStepExecutor: WorkflowStepExecutor,
    queueService: QueueService
  ) {
    this.workflowService = workflowService;
    this.workflowStepService = workflowStepService;
    this.executedWorkflowService = executedWorkflowService;
    this.executedWorkflowStepService = executedWorkflowStepService;
    this.workflowStepExecutor = workflowStepExecutor;
    this.queueService = queueService;
  }

  public processWorkflow = async (message: any) => {
    console.log(message);
    const { workflowName, workflowExecutionId } = message;
    const workflow: any = await this.workflowService.getWorkflow(workflowName);
    const workflowSteps: any[] = await this.workflowStepService.getWorkflowSteps(workflowName);
    const workflowExecution = await this.executedWorkflowService.getOrCreateExecutedWorkflow(workflow, workflowSteps[0].type, workflowExecutionId);
    let nextStep = await this.executedWorkflowStepService.getNextStep(workflowExecution.id, workflowSteps);
    let nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);

    console.log(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep}`);
    while (await nextExecutor.execute(message)) {
      nextStep = await this.executedWorkflowStepService.getNextStep(workflowName, workflowSteps);
      nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);
      console.log(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep}`);
    }

    console.log(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep}`);

    if (nextStep.type === workflowSteps[workflowSteps.length - 1].type) {
      console.log(`Workflow ${JSON.stringify(workflow)} finished`);
    }
  }

  public handleStepResultReceived = async (message: any) => {

  }

}
