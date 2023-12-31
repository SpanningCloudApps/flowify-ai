import config from 'config';
import { Database } from '../Database';
import { ExecutedWorkflow, ExecutedWorkflowRow } from '../model/ExecutedWorkflow';
import { WorkflowStatus } from '../../enum/WorkflowStatus';
import { StepType } from '../../enum/StepType';
import { WorkflowRow } from '../model/Workflow';

export default class ExecutedWorkflowRepository {

  private readonly pgConnection: string;

  constructor() {
    const conf: any = config.get('sql.database');
    this.pgConnection = `postgres://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`;
  }

  public createExecutedWorkflow = async (workflow: WorkflowRow, firstStep: StepType, actor: string): Promise<ExecutedWorkflowRow> => {
    const query = ExecutedWorkflow.insert({
      workflow_name: workflow.name,
      status: WorkflowStatus.RUNNING,
      step: firstStep,
      data: {
        actor
      }
    })
      .returning('*')
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    const result = await connection.query(query.text, query.values);
    return result.rows[0];
  };

  public getExecutedWorkflow = async (workflowExecutionId: number): Promise<ExecutedWorkflowRow> => {
    const query = ExecutedWorkflow.select(ExecutedWorkflow.star())
      .from(ExecutedWorkflow)
      .where(ExecutedWorkflow?.id?.equals(workflowExecutionId))
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    const result = await connection.query(query.text, query.values);
    return result.rows[0];
  };

  public async updateExecutedWorkflowStep(executedWorkflowId: number, stepType: StepType) {
    const query = ExecutedWorkflow.update({
      step: stepType
    })
      .where(ExecutedWorkflow.id?.equals(executedWorkflowId))
      .returning('*')
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    await connection.query(query.text, query.values);
  }

  public async completeExecutedWorkflow(executedWorkflowId: number) {
    const query = ExecutedWorkflow.update({
      status: WorkflowStatus.COMPLETED
    })
      .where(ExecutedWorkflow.id?.equals(executedWorkflowId))
      .returning('*')
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    await connection.query(query.text, query.values);
  }
}
