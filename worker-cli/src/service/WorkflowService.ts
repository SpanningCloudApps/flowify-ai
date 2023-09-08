/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';

export default class WorkflowService {

  public async getWorkflow(workflowId: WorkflowType) {
    return {
      id: workflowId,
      description: 'Add new user to MS AD'
    };
  }

}
