import moment from 'moment';

export interface Classification {
  id: number;
  input: Record<string, unknown>;
  workflow_id: string;
  probability: number;
  data: Record<string, unknown>;
  created_at: moment.Moment;
}
