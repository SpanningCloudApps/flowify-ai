import { WorkflowStepRow } from '../repository/model/WorkflowStep';
import { ExecutedWorkflowRow } from '../repository/model/ExecutedWorkflow';

export default interface StepExecutor {
  execute(executedWorkflow: ExecutedWorkflowRow, workflowStep: WorkflowStepRow, message: any): Promise<boolean>;
}
