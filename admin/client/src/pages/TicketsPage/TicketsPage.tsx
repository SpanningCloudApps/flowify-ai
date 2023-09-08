/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Table } from 'antd';
import columns from './helpers';
import InfinityScroll from 'react-infinite-scroll-component';

import { useIntl } from 'react-intl';
import { PageContainer } from '../../components/PageContainer';
import style from './style.module.scss';
import { useTicketsStore } from './store';

const TicketsPage: FC = () => {
  const { formatMessage } = useIntl();
  const getTickets = useTicketsStore(state => state.getTickets);
  const clearTickets = useTicketsStore(state => state.clearTickets);
  const resetStore = useTicketsStore(state => state.resetStore);
  const tickets = useTicketsStore(state => state.tickets);
  const isDataLoading = useTicketsStore(state => state.isDataLoading);
  const hasMore = useTicketsStore(state => state.hasMore);

  const [query, setQuery] = useState('');
  const queryRef = useRef<any>(null);

  useEffect(() => {
    return resetStore;
  }, []);

  useEffect(() => {
    clearTickets();
    getTickets({ query });
  }, [query]);

  const handleScrollChange = useCallback(() => {
    const pageToken = tickets?.length && tickets[tickets.length - 1].id;
    getTickets({ pageToken, query });
  }, [query, tickets]);

  return (
    <PageContainer title={formatMessage({ id: 'DOMAINS_BLOCK_TITLE' })}>
      <Card size="small" style={{ marginBottom: 40 }}>
        <Row gutter={[0, 8]}>
          <Col style={{ width: '100%' }}>
            <Row className={style.tableTools__row} gutter={[0, 16]}>
              <Col>
                <Space>
                  <Input.Search
                    className={style.tableTools__search}
                    ref={queryRef}
                    placeholder={formatMessage({ id: 'TABLE_TOOLS_SEARCH_PLACEHOLDER' })}
                    onSearch={setQuery}
                    maxLength={250}
                    enterButton
                    allowClear
                  />
                  <Button>{formatMessage({ id: 'TABLE_TOOLS_DROPDOWN_BUTTON' })}</Button>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col>
            <div id="scrollableTarget" className={style.domainsTable}>
              <InfinityScroll
                scrollableTarget="scrollableTarget"
                next={handleScrollChange}
                loader={null}
                dataLength={tickets.length}
                hasMore={hasMore}>
                <Table
                  scroll={{ x: '100%' }}
                  rowKey="id"
                  loading={isDataLoading}
                  showHeader
                  size="small"
                  dataSource={tickets}
                  pagination={false}
                  columns={columns}
                />
              </InfinityScroll>
            </div>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default TicketsPage;
