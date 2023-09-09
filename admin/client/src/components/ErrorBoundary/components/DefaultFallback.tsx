import React, { FC, useCallback } from 'react';
import { Result, Button } from 'antd';
import { useIntl } from 'react-intl';

export const DefaultFallback: FC = () => {
  const { formatMessage } = useIntl();

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <Result
      status="500"
      title={'Oops!'}
      subTitle={formatMessage({ id: 'SOMETHING_WENT_WRONG' })}
      extra={<Button type="primary" onClick={handleReloadPage}>{formatMessage({ id: 'RELOAD_PAGE' })}</Button>}
    />
  );
};
