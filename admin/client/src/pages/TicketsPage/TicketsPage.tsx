/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { FC, useEffect } from 'react';

import { useIntl } from 'react-intl';
import { PageContainer } from '../../components/PageContainer';
import UnclassifiedTickets from './components/UnclassifiedTickets';
import ClassifiedTickets from './components/ClassifiedTickets';
import { useTicketsStore } from './store';

const TicketsPage: FC = () => {
  const { formatMessage } = useIntl();
  const resetStore = useTicketsStore(state => state.resetStore);

  useEffect(() => {
    return resetStore;
  }, []);

  return (
      <PageContainer title={formatMessage({ id: 'TICKETS_BLOCK_TITLE' })}>
        <UnclassifiedTickets />
        <ClassifiedTickets />
      </PageContainer>
  );
};

export default TicketsPage;
