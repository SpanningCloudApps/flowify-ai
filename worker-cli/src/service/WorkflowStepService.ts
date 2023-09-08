/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';

export default class WorkflowStepService {

  public async getWorkflowSteps(workflowId: WorkflowType): Promise<any[]> {
    return [
      {
        workflowId,
        type: 'ASK_FOR_FULL_NAME'
      },
      {
        workflowId,
        type: 'ASK_ABOUT_THE_DATE'
      },
      {
        workflowId,
        type: 'CREATE_AD_USER'
      }
    ];
  }

}
