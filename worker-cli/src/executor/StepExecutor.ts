/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { WorkflowStepRow } from '../repository/model/WorkflowStep';

export default interface StepExecutor {
  execute(executedWorkflowId: number, workflowStep: WorkflowStepRow, message: any): Promise<boolean>;
}
