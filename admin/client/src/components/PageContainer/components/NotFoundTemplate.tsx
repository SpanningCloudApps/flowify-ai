import React from 'react';
import { Result } from 'antd';
import { useIntl } from 'react-intl';

const NotFoundTemplate = (): JSX.Element => {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: 'PAGE_NOT_FOUND' })}
    />
  );
};

export default NotFoundTemplate;
