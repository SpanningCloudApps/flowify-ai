/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { StepType } from '../enum/StepType';
import StepExecutor from './StepExecutor';
import ExecutedWorkflowService from '../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';
import AskFullNameStepExecutor from './steps/AskFullNameStepExecutor';
import AskCreateDateStepExecutor from './steps/AskCreateDateStepExecutor';
import CreateMicrosoftActiveDirectoryUser from './steps/CreateMicrosoftActiveDirectoryUser';

export default class WorkflowStepExecutor {

  private readonly executedWorkflowService: ExecutedWorkflowService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;
  private readonly executors: Record<StepType, StepExecutor>;

  constructor(
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService
  ) {
    this.executedWorkflowService = executedWorkflowService;
    this.executedWorkflowStepService = executedWorkflowStepService;
    this.executors = {
      [StepType.ASK_FOR_FULL_NAME]: new AskFullNameStepExecutor(this.executedWorkflowService),
      [StepType.ASK_ABOUT_THE_DATE]: new AskCreateDateStepExecutor(this.executedWorkflowService),
      [StepType.CREATE_AD_USER]: new CreateMicrosoftActiveDirectoryUser(this.executedWorkflowService, this.executedWorkflowStepService)
    };
  }

  public getExecutor(stepType: StepType): StepExecutor {
    return this.executors[stepType];
  }

}
