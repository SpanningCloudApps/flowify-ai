/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';

export default class ExecutedWorkflowService {

  public async getExecutedWorkflow(workflowExecutionId: number): Promise<any> {
    return {
      id: workflowExecutionId,
      type: WorkflowType.ADD_USER
    };
  }

}
