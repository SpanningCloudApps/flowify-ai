import moment from 'moment';
import { define } from 'sql';

export interface ClassificationRow {
  id?: number;
  input: Record<string, unknown>;
  workflow_name: string;
  probability: number;
  data: Record<string, unknown>;
  created_at: moment.Moment;
}

export const Classification = define<'classification_result', ClassificationRow>({
  schema: '',
  name: 'classification_result',
  columns: {
    id: { dataType: 'bigserial', notNull: true },
    input: { dataType: 'jsonb', notNull: true, defaultValue: {} },
    workflow_name: { dataType: 'varchar', notNull: true },
    probability: { dataType: 'flot', notNull: true },
    data: { dataType: 'jsonb', notNull: true, defaultValue: {} },
    created_at: { dataType: 'timestamp', notNull: true, defaultValue: moment.utc() }
  }
});
