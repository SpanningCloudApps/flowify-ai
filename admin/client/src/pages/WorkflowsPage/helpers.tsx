/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { intl } from '../../intl';

export const getWorkflowsColumns = (): ColumnsType<any> => [
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_ID' }),
    dataIndex: 'id',
    width: 50,
    ellipsis: true
  },
  {
    title: intl.formatMessage({ id: 'TABLE_WORKFLOW_COLUMN_WORKFLOW_NAME' }),
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    render(input: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {input}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_WORKFLOW_COLUMN_WORKFLOW_DESCRIPTION' }),
    dataIndex: 'description',
    width: 200,
    ellipsis: true,
    render(input: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {input}
      </Typography.Text>;
    }
  }
];
