/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import config from 'config';
import { ExecutedWorkflowStep, ExecutedWorkflowStepRow } from '../model/ExecutedWorkflowStep';
import { Database } from '../Database';

export default class ExecutedWorkflowStepRepository {

  private readonly pgConnection: string;

  constructor() {
    const conf: any = config.get('sql.database');
    this.pgConnection = `postgres://${conf.user}:${conf.pass}@${conf.host}:${conf.port}/${conf.db}`;
  }

  public getExecutedSteps = async (executedWorkflowId: number): Promise<Array<ExecutedWorkflowStepRow>> => {
    const query = ExecutedWorkflowStep.select(ExecutedWorkflowStep.star())
      .from(ExecutedWorkflowStep)
      .where(ExecutedWorkflowStep?.workflow_execution_id?.equals(executedWorkflowId))
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    const result = await connection.query(query.text, query.values);
    return result.rows;
  };

  public createStepExecution = async (executedWorkflowStepRow: ExecutedWorkflowStepRow) => {
    const query = ExecutedWorkflowStep.insert(executedWorkflowStepRow)
      .returning('*')
      .toQuery();

    const connection = Database.ofConnection(this.pgConnection).connect();
    await connection.query(query.text, query.values);
  };

}
