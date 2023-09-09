import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Card, Col, Input, Row, Space, Table } from 'antd';
import { isJsonString } from '../../../utils/helper';
import { getClassifiedTicketsColumns } from '../helpers';
import InfinityScroll from 'react-infinite-scroll-component';

import { useIntl } from 'react-intl';
import style from '../style.module.scss';
import { useTicketsStore } from '../store';

const ClassifiedTickets: FC = () => {
  const { formatMessage } = useIntl();
  const getClassifiedTickets = useTicketsStore(state => state.getClassifiedTickets);
  const clearClassifiedTickets = useTicketsStore(state => state.clearClassifiedTickets);
  const classifiedTickets = useTicketsStore(state => state.classifiedTickets);
  const isClassifiedDataLoading = useTicketsStore(state => state.isClassifiedDataLoading);
  const hasMoreClassified = useTicketsStore(state => state.hasMoreClassified);

  const [query, setQuery] = useState('');
  const queryRef = useRef<any>(null);

  useEffect(() => {
    clearClassifiedTickets();
    getClassifiedTickets({ query });
  }, [query]);

  const handleScrollChange = useCallback(() => {
    const pageToken = classifiedTickets?.length && classifiedTickets[classifiedTickets.length - 1].id;
    getClassifiedTickets({ pageToken, query });
  }, [query, classifiedTickets]);

  const renderExpandedRow = useCallback(row => {
    const rowForView = { ...row };
    rowForView.data = isJsonString(rowForView.data)
        ? JSON.parse(rowForView.data)
        : rowForView.data;
    delete rowForView.id;
    return <pre>{JSON.stringify(rowForView, null, 2)}</pre>;
  }, []);

  return (
      <Card title={formatMessage({ id: 'TABLE_CLASSIFIED_TICKETS_TITLE' })} size="small" style={{ marginBottom: 40 }}>
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
            </Row>
          </Col>
          <Col>
            <div id="scrollableTarget2" className={style.domainsTable}>
              <InfinityScroll
                  scrollableTarget="scrollableTarget2"
                  next={handleScrollChange}
                  loader={null}
                  dataLength={classifiedTickets.length}
                  hasMore={hasMoreClassified}>
                <Table
                    scroll={{ x: '100%' }}
                    rowKey="id"
                    loading={isClassifiedDataLoading}
                    showHeader
                    size="small"
                    dataSource={classifiedTickets}
                    pagination={false}
                    columns={getClassifiedTicketsColumns()}
                    expandable={{
                      expandedRowRender: renderExpandedRow,
                      expandRowByClick: true,
                      expandIconColumnIndex: -1
                    }}
                    showSorterTooltip={false}
                />
              </InfinityScroll>
            </div>
          </Col>
        </Row>
      </Card>
  );
};

export default ClassifiedTickets;
