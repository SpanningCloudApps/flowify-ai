import config from 'config';
import { WorkflowType } from '../../enum/WorkflowType';
import { Database } from '../Database';
import { WorkflowStep, WorkflowStepRow } from '../model/WorkflowStep';

export default class WorkflowStepRepository {

  private readonly pgConnection: string;

  constructor() {
    const conf: any = config.get('sql.database');
    this.pgConnection = `postgres://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`;
  }

  public getWorkflowSteps = async (workflowName: WorkflowType): Promise<Array<WorkflowStepRow>> => {
    const query = WorkflowStep.select(WorkflowStep.star())
      .from(WorkflowStep)
      .where(WorkflowStep.workflow_id.equals(workflowName))
      .order(WorkflowStep.ordinal)
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    const result = await connection.query(query.text, query.values);
    return result.rows;
  };

}
