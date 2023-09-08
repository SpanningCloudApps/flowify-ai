/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Button, Col, Drawer, Form, Input, Row } from 'antd';
import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useWorkflowsStore } from '../store';

const WorkflowDrawer: FC = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const open = useWorkflowsStore(state => state.open);
  const addWorkflow = useWorkflowsStore(state => state.addWorkflow);
  const toggleDrawer = useWorkflowsStore(state => state.toggleDrawer);

  const onClose = useCallback(() => {
    toggleDrawer(false);
    form.resetFields();
  }, []);

  const onSubmit = useCallback((values: any) => {
    addWorkflow({
      workflowName: values.workflowName.trim(),
      description: values.description.trim()
    });
    toggleDrawer(false);
  }, []);

  return <Drawer
      title={formatMessage({ id: 'WORKFLOW_DRAWER_TITLE' })}
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
      rootStyle={{ position: 'fixed' }}
      getContainer={false}
  >
    <Form form={form}
          requiredMark
          layout="vertical"
          onFinish={onSubmit}
    >
      <Row>
        <Col xs={24}>
          <Form.Item
              label={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW_NAME' })}
              shouldUpdate
              name="workflowName"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'FIELD_IS_REQUIRED' })
                }
              ]}
          >
            <Input placeholder={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW_NAME_PLACEHOLDER' })} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item
              label={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW_DESCRIPTION' })}
              shouldUpdate
              name="description"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'FIELD_IS_REQUIRED' })
                }
              ]}
          >
            <Input placeholder={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW_DESCRIPTION_PLACEHOLDER' })} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
            type="primary"
            htmlType="submit"
        >
          {formatMessage({ id: 'SUBMIT' })}
        </Button>
      </Form.Item>
    </Form>
  </Drawer>;
};

export default WorkflowDrawer;
