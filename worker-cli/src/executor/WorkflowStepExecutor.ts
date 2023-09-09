import { StepType } from '../enum/StepType';
import StepExecutor from './StepExecutor';
import ExecutedWorkflowService from '../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../service/ExecutedWorkflowStepService';
import AskFullNameStepExecutor from './steps/AskFullNameStepExecutor';
import AskCreateDateStepExecutor from './steps/AskCreateDateStepExecutor';
import CreateMicrosoftActiveDirectoryUser from './steps/CreateMicrosoftActiveDirectoryUser';
import QueueService from '../service/QueueService';

export default class WorkflowStepExecutor {

  private readonly executors: Record<StepType, StepExecutor>;

  constructor(
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService,
    queueService: QueueService
  ) {
    this.executors = {
      [StepType.ASK_FOR_FULL_NAME]: new AskFullNameStepExecutor(executedWorkflowService, executedWorkflowStepService, queueService),
      [StepType.ASK_ABOUT_THE_DATE]: new AskCreateDateStepExecutor(executedWorkflowService, executedWorkflowStepService, queueService),
      [StepType.CREATE_AD_USER]: new CreateMicrosoftActiveDirectoryUser(executedWorkflowService, executedWorkflowStepService, queueService)
    };
  }

  public getExecutor(stepType: StepType): StepExecutor {
    return this.executors[stepType];
  }

}
