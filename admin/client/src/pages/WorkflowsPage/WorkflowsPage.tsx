/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */
import { FC } from 'react';
import { useIntl } from 'react-intl';

import { PageContainer } from '../../components/PageContainer';

const WorkflowsPage: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <PageContainer title={formatMessage({ id: 'CLASSIFIERS' })} />
  );
};

export default WorkflowsPage;
