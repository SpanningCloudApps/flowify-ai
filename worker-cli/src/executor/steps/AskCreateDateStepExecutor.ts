/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';
import QueueService from '../../service/QueueService';
import { WorkflowStepRow } from '../../repository/model/WorkflowStep';
import { ExecutedWorkflowRow } from '../../repository/model/ExecutedWorkflow';

export default class AskCreateDateStepExecutor implements StepExecutor {

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
    if (message.type !== workflowStep.type || !message.clientResponse) {
      const clientRequest = {
        question: 'Could you provide me a date when user should be added?',
        workflowExecutionId: executedWorkflow.id!,
        type: workflowStep.type,
        actor: executedWorkflow.data?.actor
      }
      await this.queueService.publishStepDataRequest(JSON.stringify(clientRequest));
      await this.executedWorkflowStepService.createStepExecution(executedWorkflow.id!, workflowStep);
      await this.executedWorkflowService.updateExecutedWorkflowStep(executedWorkflow.id!, workflowStep.type);
      return false;
    } else {
      await this.executedWorkflowStepService.updateStepExecutionWithUserData(executedWorkflow.id!, workflowStep.type, message.clientResponse);
      return true;
    }
  }

}
