import ExecutedWorkflowRepository from '../repository/data/ExecutedWorkflowRepository';
import { WorkflowRow } from '../repository/model/Workflow';
import { StepType } from '../enum/StepType';
import { ExecutedWorkflowRow } from '../repository/model/ExecutedWorkflow';

export default class ExecutedWorkflowService {

  private readonly executedWorkflowRepository: ExecutedWorkflowRepository;

  constructor(executedWorkflowRepository: ExecutedWorkflowRepository) {
    this.executedWorkflowRepository = executedWorkflowRepository;
  }

  public async createExecutedWorkflow(workflow: WorkflowRow, firstStep: StepType, actor: string): Promise<ExecutedWorkflowRow> {
    return this.executedWorkflowRepository.createExecutedWorkflow(workflow, firstStep, actor)
  }

  public async getExecutedWorkflow(workflowExecutionId: number): Promise<ExecutedWorkflowRow> {
    return this.executedWorkflowRepository.getExecutedWorkflow(workflowExecutionId)
  }

  public async updateExecutedWorkflowStep(executedWorkflowId: number, stepType: StepType) {
    return this.executedWorkflowRepository.updateExecutedWorkflowStep(executedWorkflowId, stepType);
  }

  public async completeExecutedWorkflow(executedWorkflowId: number) {
    return this.executedWorkflowRepository.completeExecutedWorkflow(executedWorkflowId);
  }
}
