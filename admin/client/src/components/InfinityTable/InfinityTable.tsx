import React, { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Table, TableProps } from 'antd';
import './style.css';

interface InfinityTableProps {
  id?: string,
  title?: string,
  loadNext: () => void,
  hasMore: boolean,
  height: number,
  infinityLoaderLimit?: number,
  minHeight?: number
}

export interface RecordType {
  [x: string]: string | number | null | undefined;
}

const InfinityTable: FC<InfinityTableProps & TableProps<RecordType>> = ({
                                                                   id = 'scrollableContent',
                                                                   title,
                                                                   loadNext,
                                                                   hasMore,
                                                                   height = 650,
                                                                   minHeight,
                                                                   ...props
                                                                 }) => {
  return (<>
      {title}
      <div id={id}
           className="custom-infinite-scroll-component"
           style={{ maxHeight: height, minHeight: minHeight || 'unset' }}>
        <InfiniteScroll
          scrollableTarget={id}
          dataLength={props.dataSource?.length as number}
          next={loadNext}
          hasMore={hasMore}
          loader={null}
        >
          <Table
            dataSource={props.dataSource}
            pagination={false}
            {...props}
            scroll={undefined}
            className="infinity-inner-table"
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default InfinityTable;
