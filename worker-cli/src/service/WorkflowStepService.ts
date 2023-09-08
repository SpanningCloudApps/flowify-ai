/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import { StepType } from '../enum/StepType';

export default class WorkflowStepService {

  public async getWorkflowSteps(workflowId: WorkflowType): Promise<any[]> {
    return [
      {
        workflowId,
        type: StepType.ASK_FOR_FULL_NAME
      },
      {
        workflowId,
        type: StepType.ASK_ABOUT_THE_DATE
      },
      {
        workflowId,
        type: StepType.CREATE_AD_USER
      }
    ];
  }

}
