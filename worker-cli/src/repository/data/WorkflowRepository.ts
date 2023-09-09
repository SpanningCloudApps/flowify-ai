import config from 'config';
import { WorkflowType } from '../../enum/WorkflowType';
import { Workflow } from '../model/Workflow';
import { Database } from '../Database';

export default class WorkflowRepository {

  private readonly pgConnection: string;

  constructor() {
    const conf: any = config.get('sql.database');
    this.pgConnection = `postgres://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`;
  }

  public getWorkflow = async (workflowName: WorkflowType) => {
    const query = Workflow.select(Workflow.star())
      .from(Workflow)
      .where(Workflow.name.equals(workflowName))
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    const result = await connection.query(query.text, query.values);
    return result.rows[0];
  };

}
