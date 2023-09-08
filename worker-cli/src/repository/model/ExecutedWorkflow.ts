/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { define } from 'sql';
import { WorkflowType } from '../../enum/WorkflowType';
import { WorkflowStatus } from '../../enum/WorkflowStatus';
import { StepType } from '../../enum/StepType';

export interface ExecutedWorkflowRow {
  id?: number;
  workflow_id: WorkflowType;
  status: WorkflowStatus;
  step: StepType;
  data: Record<string, any>;
  created_at?: Date;
}

export const ExecutedWorkflow = define<'workflow_execution', ExecutedWorkflowRow>({
  name: 'workflow_execution',
  schema: '',
  columns: {
    id: { dataType: 'integer' },
    workflow_id: { dataType: 'varchar' },
    status: { dataType: 'varchar' },
    step: { dataType: 'varchar' },
    data: { dataType: 'jsonb' },
    created_at: { dataType: 'timestamp' }
  }
});
