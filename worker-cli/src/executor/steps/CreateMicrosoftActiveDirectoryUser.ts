/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';
import QueueService from '../../service/QueueService';
import { WorkflowStepRow } from '../../repository/model/WorkflowStep';
import { ExecutedWorkflowRow } from '../../repository/model/ExecutedWorkflow';
import { StepType } from '../../enum/StepType';
import { getLogger } from '../../logger/logger';

const logger = getLogger()

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

  public async execute(executedWorkflow: ExecutedWorkflowRow, workflowStep: WorkflowStepRow, message: any): Promise<boolean> {
    const steps = await this.executedWorkflowStepService.getExecutedSteps(executedWorkflow.id!);

    const fullName = steps.find(step => step.type === StepType.ASK_FOR_FULL_NAME)?.data?.clientResponse;
    const date = steps.find(step => step.type === StepType.ASK_ABOUT_THE_DATE)?.data?.clientResponse;

    await this.executedWorkflowStepService.createStepExecution(executedWorkflow.id!, workflowStep);
    await this.executedWorkflowService.updateExecutedWorkflowStep(executedWorkflow.id!, workflowStep.type);
    logger.info(`Microsoft AD user has been created! Name ${fullName}. Date ${date}`);
    await this.executedWorkflowStepService.updateStepExecutionWithUserData(executedWorkflow.id!, workflowStep.type, 'COMPLETED');
    await this.executedWorkflowService.completeExecutedWorkflow(executedWorkflow.id!);
    return Promise.resolve(false);
  }

}
