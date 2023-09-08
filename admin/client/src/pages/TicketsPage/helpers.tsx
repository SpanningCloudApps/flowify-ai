/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */
import { Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { intl } from '../../intl';

const columnsConfig: ColumnsType<any> = [
  {
    title: intl.formatMessage({ id: 'DOMAINS_TABLE_COLUMN_ID' }),
    dataIndex: 'id',
    width: 50,
    ellipsis: true,
    sorter: true,
    fixed: 'left',
    defaultSortOrder: 'descend',
    sortDirections: ['ascend', 'descend', 'ascend']
  },
  {
    title: intl.formatMessage({ id: 'DOMAINS_TABLE_COLUMN_NAME' }),
    dataIndex: 'name',
    width: 200,
    ellipsis: true,
    fixed: 'left',
    render(domainName: string, data: any): JSX.Element {
      return (
          <Link to={`${DOMAINS}/${data.id}`}>
            <Typography.Text copyable style={{ color: '#1890ff' }}>
              {domainName}
            </Typography.Text>
          </Link>
      );
    }
  },
  {
    title: intl.formatMessage({ id: 'DOMAINS_TABLE_COLUMN_RESELLER' }),
    dataIndex: 'resellerId',
    width: 200,
    ellipsis: true,
    render(reseller: string): JSX.Element {
      return (
          <Typography.Text ellipsis copyable={Boolean(reseller)}>
            {reseller}
          </Typography.Text>
      );
    }
  },
  {
    title: intl.formatMessage({ id: 'DOMAINS_TABLE_COLUMN_STATUS' }),
    dataIndex: 'status',
    width: 70,
    ellipsis: true,
    render(domainStatus: string): JSX.Element {
      return (
          <Typography.Text ellipsis>
            {intl.formatMessage({ id: `TABLE_TOOLS_${domainStatus}` })}
          </Typography.Text>
      );
    }
  },
  {
    title: intl.formatMessage({ id: 'DOMAINS_TABLE_COLUMN_LICENSES' }),
    dataIndex: 'licenses',
    width: 100,
    ellipsis: true
  }
];

export default columnsConfig;
