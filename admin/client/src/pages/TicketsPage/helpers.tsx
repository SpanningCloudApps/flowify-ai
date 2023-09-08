/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */
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
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_TITLE' }),
    dataIndex: 'title',
    width: 150,
    ellipsis: true,
    render(title: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true} style={{ color: '#1890ff' }}>
        {title}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_DESCRIPTION' }),
    dataIndex: 'description',
    width: 250,
    ellipsis: true,
    render(description: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {description}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_CREATED_BY' }),
    dataIndex: 'createdBy',
    width: 150,
    ellipsis: true,
    render(title: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {title}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_PROBABILITY' }),
    dataIndex: 'probability',
    width: 80,
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
          <Tag color="success">
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
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_TITLE' }),
    dataIndex: 'title',
    width: 150,
    ellipsis: true,
    render(title: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true} style={{ color: '#1890ff' }}>
        {title}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_DESCRIPTION' }),
    dataIndex: 'description',
    width: 250,
    ellipsis: true,
    render(description: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {description}
      </Typography.Text>;
    }
  },
  {
    title: intl.formatMessage({ id: 'TABLE_TICKETS_COLUMN_CREATED_BY' }),
    dataIndex: 'createdBy',
    width: 150,
    ellipsis: true,
    render(title: string): JSX.Element {
      return <Typography.Text copyable ellipsis={true}>
        {title}
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
          <Tag color="warning">
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
