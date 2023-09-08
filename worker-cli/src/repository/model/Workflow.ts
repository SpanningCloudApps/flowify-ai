/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { define } from 'sql';

export interface WorkflowRow {
  id: number;
  name: string;
  description: string;
  data: Record<string, any>;
  created_at: Date;
}

export const Workflow = define<'workflow', WorkflowRow>({
  name: 'workflow',
  schema: '',
  columns: {
    id: { dataType: 'integer' },
    name: { dataType: 'varchar' },
    description: { dataType: 'varchar' },
    data: { dataType: 'jsonb' },
    created_at: { dataType: 'timestamp' }
  }
});
