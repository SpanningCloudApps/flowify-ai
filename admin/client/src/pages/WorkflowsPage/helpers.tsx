import { Button, Popconfirm, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { intl } from '../../intl';

export const getWorkflowsColumns = (confirm): ColumnsType<any> => [
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
  },
  {
    width: 100,
    ellipsis: true,
    align: 'center',
    render(data: any): JSX.Element {
      return <Popconfirm title="Delete the Workflow"
                         description={<Typography.Paragraph>
                           <span>Are you sure to delete this Workflow?</span>
                           <br />
                           <span>If any tickets classified with this workflow you won't be able to remove it.</span>
                         </Typography.Paragraph>}
                         placement={'topLeft'}
                         onConfirm={confirm(data)}
                         okText="Yes"
                         cancelText="No">
        <Button danger type={'link'}
                onClick={event => {
                  event.stopPropagation();
                }}>
          Delete
        </Button>
      </Popconfirm>;
    }
  }
];
