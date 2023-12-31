import { FC, useCallback, useEffect, useState } from 'react';
import { Card, Col, Input, Row, Space, Table } from 'antd';
import { isJsonString } from '../../../utils/helper';
import { getUnclassifiedTicketsColumns } from '../helpers';
import InfinityScroll from 'react-infinite-scroll-component';

import { useIntl } from 'react-intl';
import style from '../style.module.scss';
import { useTicketsStore } from '../store';
import ClassifyDrawer from './ClassifyDrawer';

const UnclassifiedTickets: FC = () => {
  const { formatMessage } = useIntl();
  const getUnclassifiedTickets = useTicketsStore(state => state.getUnclassifiedTickets);
  const clearUnclassifiedTickets = useTicketsStore(state => state.clearUnclassifiedTickets);
  const unclassifiedTickets = useTicketsStore(state => state.unclassifiedTickets);
  const isUnclassifiedDataLoading = useTicketsStore(state => state.isUnclassifiedDataLoading);
  const hasMoreUnclassified = useTicketsStore(state => state.hasMoreUnclassified);
  const toggleClassifier = useTicketsStore(state => state.toggleClassifier);

  const [query, setQuery] = useState('');

  useEffect(() => {
    clearUnclassifiedTickets();
    getUnclassifiedTickets({ query });
  }, [query]);

  const handleScrollChange = useCallback(() => {
    const pageToken = unclassifiedTickets?.length && unclassifiedTickets[unclassifiedTickets.length - 1].id;
    getUnclassifiedTickets({ pageToken, query });
  }, [query, unclassifiedTickets]);

  const renderExpandedRow = useCallback(row => {
    const rowForView = { ...row };
    rowForView.data = isJsonString(rowForView.data)
        ? JSON.parse(rowForView.data)
        : rowForView.data;
    delete rowForView.id;
    return <pre>{JSON.stringify(rowForView, null, 2)}</pre>;
  }, []);

  const openDrawer = useCallback(ticket => e => {
    e.stopPropagation();
    toggleClassifier(ticket, true);
  }, []);

  return (
      <Card title={formatMessage({ id: 'TABLE_UNCLASSIFIED_TICKETS_TITLE' })} size="small" style={{ marginBottom: 40 }}>
        <Row gutter={[0, 8]}>
          <Col style={{ width: '100%' }}>
            <Row className={style.tableTools__row} gutter={[0, 16]}>
              <Col>
                <Space>
                  <Input.Search
                      className={style.tableTools__search}
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
            <div id="scrollableTarget" className={style.domainsTable}>
              <InfinityScroll
                  scrollableTarget="scrollableTarget"
                  next={handleScrollChange}
                  loader={null}
                  dataLength={unclassifiedTickets.length}
                  hasMore={hasMoreUnclassified}>
                <Table
                    scroll={{ x: '100%' }}
                    rowKey="id"
                    loading={isUnclassifiedDataLoading}
                    showHeader
                    size="small"
                    dataSource={unclassifiedTickets}
                    pagination={false}
                    columns={getUnclassifiedTicketsColumns(openDrawer)}
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
        <ClassifyDrawer />
      </Card>
  );
};

export default UnclassifiedTickets;
