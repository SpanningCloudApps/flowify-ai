import { Button, Card, Col, Input, Row, Space, Table } from 'antd';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import InfinityScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';

import { PageContainer } from '../../components/PageContainer';
import { isJsonString } from '../../utils/helper';
import WorkflowDrawer from './components/WorkflowDrawer';
import { getWorkflowsColumns } from './helpers';
import { useWorkflowsStore } from './store';
import style from './style.module.scss';

const WorkflowsPage: FC = () => {
  const { formatMessage } = useIntl();

  const clearWorkflows = useWorkflowsStore(state => state.clearWorkflows);
  const getWorkflows = useWorkflowsStore(state => state.getWorkflows);
  const workflows = useWorkflowsStore(state => state.workflows);
  const loading = useWorkflowsStore(state => state.loading);
  const hasMore = useWorkflowsStore(state => state.hasMore);
  const toggleDrawer = useWorkflowsStore(state => state.toggleDrawer);
  const deleteWorkflow = useWorkflowsStore(state => state.deleteWorkflow);

  const [query, setQuery] = useState('');
  const queryRef = useRef<any>(null);

  useEffect(() => {
    clearWorkflows();
    getWorkflows({ query });
  }, [query]);

  const handleScrollChange = useCallback(() => {
    const pageToken = workflows?.length && workflows[workflows.length - 1].id;
    workflows({ pageToken, query });
  }, [query, workflows]);

  const handleWorkflow = useCallback(() => {
    toggleDrawer(true);
  }, []);

  const renderExpandedRow = useCallback(row => {
    const rowForView = { ...row };
    rowForView.data = isJsonString(rowForView.data)
        ? JSON.parse(rowForView.data)
        : rowForView.data;
    delete rowForView.id;
    return <pre>{JSON.stringify(rowForView, null, 2)}</pre>;
  }, []);

  const confirmDelete = useCallback(data => e => {
    e.stopPropagation();
    deleteWorkflow({ id: data.id });
  }, []);

  return (
      <PageContainer title={formatMessage({ id: 'WORKFLOWS' })}>
        <Card size="small" style={{ marginBottom: 40 }}>
          <Row gutter={[0, 8]}>
            <Col style={{ width: '100%' }}>
              <Row className={style.tableTools__row} gutter={[0, 16]}>
                <Col>
                  <Space>
                    <Input.Search
                        className={style.tableTools__search}
                        ref={queryRef}
                        placeholder={formatMessage({ id: 'TABLE_TICKETS_SEARCH_PLACEHOLDER' })}
                        onSearch={setQuery}
                        maxLength={250}
                        enterButton
                        allowClear
                    />
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <Button type={'primary'} onClick={handleWorkflow}>
                      Add Workflow
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col>
              <div id="scrollableTarget3" className={style.domainsTable}>
                <InfinityScroll
                    scrollableTarget="scrollableTarget3"
                    next={handleScrollChange}
                    loader={null}
                    dataLength={workflows.length}
                    hasMore={hasMore}>
                  <Table
                      scroll={{ x: '100%' }}
                      rowKey="id"
                      loading={loading}
                      showHeader
                      size="small"
                      dataSource={workflows}
                      pagination={false}
                      expandable={{
                        expandedRowRender: renderExpandedRow,
                        expandRowByClick: true,
                        expandIconColumnIndex: -1
                      }}
                      columns={getWorkflowsColumns(confirmDelete)}
                      showSorterTooltip={false}
                  />
                </InfinityScroll>
              </div>
            </Col>
          </Row>
        </Card>
        <WorkflowDrawer />
      </PageContainer>
  );
};

export default WorkflowsPage;
