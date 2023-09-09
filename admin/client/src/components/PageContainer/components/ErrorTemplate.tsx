import React from 'react';
import { Result } from 'antd';
import { useIntl } from 'react-intl';

const ErrorTemplate = (): JSX.Element => {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="500"
      title="500"
      subTitle={formatMessage({ id: 'PAGE_ERROR' })}
    />
  );
};

export default ErrorTemplate;
