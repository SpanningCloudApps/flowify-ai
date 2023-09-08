/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { Button, Col, Drawer, Form, Input, Radio, Row, Select } from 'antd';
import { FC, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useWorkflowsStore } from '../../WorkflowsPage/store';
import { useTicketsStore } from '../store';

const ClassifyDrawer: FC = () => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const updateTicket = useTicketsStore(state => state.updateTicket);
  const toggleClassifier = useTicketsStore(state => state.toggleClassifier);
  const openClassifier = useTicketsStore(state => state.openClassifier);
  const selectedTicket = useTicketsStore(state => state.selectedTicket);
  const workflows = useWorkflowsStore(state => state.workflows);
  const getWorkflows = useWorkflowsStore(state => state.getWorkflows);
  const workflowsLoading = useWorkflowsStore(state => state.loading);

  const [type, setType] = useState('PREDEFINED');

  useEffect(() => {
    if (openClassifier) {
      getWorkflows({});
    }
  }, [openClassifier]);

  const onTypeChange = useCallback((e: any) => {
    if (e.target.value === 'DONT_KNOW') {
      form.setFieldValue('workflowName', 'REVIEWED_UNKNOWN');
    } else {
      form.resetFields();
    }
    setType(e.target.value);
  }, []);

  const onClose = useCallback(() => {
    toggleClassifier({}, false);
  }, []);

  const onSubmit = useCallback((values: any) => {
    console.log(values);
    updateTicket({
      id: selectedTicket.id,
      workflowName: values.workflowName?.trim(),
      description: values.description?.trim()
    });
    toggleClassifier({}, false);
  }, [selectedTicket]);

  return <Drawer
      title={formatMessage({ id: 'TICKET_DRAWER_TITLE' }, { type: selectedTicket.title || '' })}
      placement="right"
      width={400}
      onClose={onClose}
      open={openClassifier}
      rootStyle={{ position: 'fixed' }}
      getContainer={false}
  >
    <Radio.Group onChange={onTypeChange} value={type}>
      <Radio value={'PREDEFINED'}>Predefined</Radio>
      <Radio value={'OTHER'}>Other</Radio>
      <Radio value={'DONT_KNOW'}>Don't Know</Radio>
    </Radio.Group>
    <Form form={form}
          style={{ marginTop: 20 }}
          requiredMark
          onFinish={onSubmit}
    >
      {type === 'PREDEFINED' && <Row gutter={24}>
        <Col xs={24}>
          <Form.Item name="workflowName"
                     rules={[
                       {
                         required: true,
                         message: formatMessage({ id: 'FIELD_IS_REQUIRED' })
                       }
                     ]}
                     label={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW' })}>
            <Select loading={workflowsLoading}>
              {workflows.map(workflow => (
                  <Select.Option key={workflow.name} value={workflow.name}>
                    {workflow.name}
                  </Select.Option>))}
            </Select>
          </Form.Item>
        </Col>
      </Row>}
      {type === 'OTHER' && <>
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
      </>}
      {type === 'DONT_KNOW' && <Row gutter={24}>
        <Col xs={24}>
          <Form.Item name="workflowName"
                     label={formatMessage({ id: 'DRAWER_TICKET_LABEL_WORKFLOW' })}
                     rules={[
                       {
                         required: true,
                         message: formatMessage({ id: 'FIELD_IS_REQUIRED' })
                       }
                     ]}>
            <Select>
              <Select.Option value={'REVIEWED_UNKNOWN'}>REVIEWED_UNKNOWN</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>}
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

export default ClassifyDrawer;
