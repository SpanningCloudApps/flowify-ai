/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography, Tag, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { intl } from '../../intl';
import { truncFloatNumber } from '../../utils/helper';

export const getClassifiedTicketsColumns = (): ColumnsType<any> => [
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_ID' }),
    dataIndex: 'id',
    width: 50,
    ellipsis: true
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_USER_INPUT' }),
    dataIndex: 'input',
    width: 200,
    ellipsis: true,
    render(input: string): JSX.Element {
      return <Typography.Text copyable style={{ color: '#8d9498' }}>
        {input}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_PROBABILITY' }),
    dataIndex: 'probability',
    width: 100,
    ellipsis: true,
    render(probability: number): JSX.Element {
      return (
          <Typography.Text>
            {truncFloatNumber(probability, 2)}
          </Typography.Text>
      );
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_WORKFLOW' }),
    dataIndex: 'workflowName',
    width: 100,
    ellipsis: true,
    render(workflowName: string): JSX.Element {
      return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {workflowName}
          </Tag>
      );
    }
  }
];

export const getUnclassifiedTicketsColumns = (openDrawer): ColumnsType<any> => [
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_ID' }),
    dataIndex: 'id',
    width: 50,
    ellipsis: true
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_USER_INPUT' }),
    dataIndex: 'input',
    width: 200,
    ellipsis: true,
    render(input: string): JSX.Element {
      return <Typography.Text copyable style={{ color: '#8d9498' }}>
        {input}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_PROBABILITY' }),
    dataIndex: 'probability',
    width: 100,
    ellipsis: true,
    render(probability: number): JSX.Element {
      return (
          <Typography.Text>
            {truncFloatNumber(probability, 2)}
          </Typography.Text>
      );
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_WORKFLOW' }),
    dataIndex: 'workflowName',
    width: 100,
    ellipsis: true,
    render(workflowName: string): JSX.Element {
      return (
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            {'UNKNOWN' || workflowName}
          </Tag>
      );
    }
  },
  {
    width: 100,
    ellipsis: true,
    align: 'center',
    render(data: any): JSX.Element {
      return <Button type={'link'} onClick={openDrawer(data)}>
        Classify
      </Button>;
    }
  }
];
