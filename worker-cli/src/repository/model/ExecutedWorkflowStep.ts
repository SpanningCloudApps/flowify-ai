/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { define } from 'sql';
import { StepExecutionStatus } from '../../enum/StepExecutionStatus';

export interface ExecutedWorkflowStepRow {
  id?: number;
  workflow_step_id: number;
  workflow_execution_id: number;
  type: string;
  status: StepExecutionStatus;
  data: Record<string, any>;
  created_at?: Date;
}

export const ExecutedWorkflowStep = define<'workflow_step_execution', ExecutedWorkflowStepRow>({
  name: 'workflow_step_execution',
  schema: '',
  columns: {
    id: { dataType: 'integer' },
    workflow_step_id: { dataType: 'integer' },
    workflow_execution_id: { dataType: 'integer' },
    status: { dataType: 'varchar' },
    type: { dataType: 'varchar' },
    data: { dataType: 'jsonb' },
    created_at: { dataType: 'timestamp' }
  }
});
