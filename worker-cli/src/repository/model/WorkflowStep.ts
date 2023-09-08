/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { define } from 'sql';
import { StepType } from '../../enum/StepType';
import { WorkflowType } from '../../enum/WorkflowType';

export interface WorkflowStepRow {
  id: number;
  workflow_id: WorkflowType;
  description: string;
  title: string;
  type: StepType;
  ordinal: number;
  data: Record<string, any>;
  created_at: Date;
}

export const WorkflowStep = define<'workflow_step', WorkflowStepRow>({
  name: 'workflow_step',
  schema: '',
  columns: {
    id: { dataType: 'integer' },
    workflow_id: { dataType: 'varchar' },
    description: { dataType: 'varchar' },
    title: { dataType: 'varchar' },
    type: { dataType: 'varchar' },
    ordinal: { dataType: 'integer' },
    data: { dataType: 'jsonb' },
    created_at: { dataType: 'timestamp' }
  }
});
