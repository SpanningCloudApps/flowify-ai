/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowType } from '../enum/WorkflowType';
import { StepType } from '../enum/StepType';

export default class ExecutedWorkflowStepService {

  public async getNextStep(workflowId: WorkflowType, workflowSteps: any[]) {
    return {
      workflowId,
      type: StepType.ASK_ABOUT_THE_DATE
    }
  }

}
