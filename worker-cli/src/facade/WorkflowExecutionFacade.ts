/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import QueueService from '../service/QueueService';
import WorkflowService from '../service/WorkflowService';
import WorkflowStepService from '../service/WorkflowStepService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';
import WorkflowStepExecutor from '../executor/WorkflowStepExecutor';
import ExecutedWorkflowService from '../service/ExecutedWorkflowService';
import { WorkflowStepRow } from '../repository/model/WorkflowStep';
import { getLogger } from '../logger/logger';

const logger = getLogger()

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
    logger.info(message);
    const { workflowName, actor } = message;
    const workflow: any = await this.workflowService.getWorkflow(workflowName);
    const workflowSteps: any[] = await this.workflowStepService.getWorkflowSteps(workflowName);
    const workflowExecution = await this.executedWorkflowService.createExecutedWorkflow(workflow, workflowSteps[0].type, actor);
    let nextStep = await this.executedWorkflowStepService.getNextStep(workflowExecution.id!, workflowSteps);
    let nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);

    logger.info(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep?.type}`);
    while (await nextExecutor.execute(workflowExecution, nextStep, message)) {
      nextStep = await this.executedWorkflowStepService.getNextStep(workflowExecution.id!, workflowSteps);
      nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);
      logger.info(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep?.type}`);
    }

    if (nextStep.type === workflowSteps[workflowSteps.length - 1].type) {
      logger.info(`Workflow ${JSON.stringify(workflow)} finished`);
    } else {
      logger.info(`Workflow ${JSON.stringify(workflow)} on pause. Waiting for user input`);
    }
  };

  public handleStepResultReceived = async (message: any) => {
    logger.info(message);
    const { workflowExecutionId } = message;

    const workflowExecution = await this.executedWorkflowService.getExecutedWorkflow(workflowExecutionId);
    const workflow: any = await this.workflowService.getWorkflow(workflowExecution.workflow_name);
    const workflowSteps: Array<WorkflowStepRow> = await this.workflowStepService.getWorkflowSteps(workflowExecution.workflow_name);
    let nextStep = await this.executedWorkflowStepService.getWaitingStep(workflowExecution.id!, workflowSteps);

    if (!nextStep) {
      return;
    }

    let nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);

    while ((await nextExecutor.execute(workflowExecution, nextStep, message))) {
      nextStep = await this.executedWorkflowStepService.getNextStep(workflowExecution.id!, workflowSteps);
      nextExecutor = this.workflowStepExecutor.getExecutor(nextStep.type);
      logger.info(`Running workflow ${JSON.stringify(workflow)} with ${workflowSteps.length} steps. Next step ${nextStep?.type}`);
    }

    if (nextStep.type === workflowSteps[workflowSteps.length - 1].type) {
      logger.info(`Workflow ${JSON.stringify(workflow)} finished`);
      await this.queueService.publishWorkflowResult(JSON.stringify({ result: 'COMPLETED' }));
    } else {
      logger.info(`Workflow ${JSON.stringify(workflow)} on pause. Step ${nextStep.type} Waiting for user input`);
    }
  };

}
