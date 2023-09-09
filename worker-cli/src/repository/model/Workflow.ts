import { define } from 'sql';
import { WorkflowType } from '../../enum/WorkflowType';

export interface WorkflowRow {
  id: number;
  name: WorkflowType;
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
