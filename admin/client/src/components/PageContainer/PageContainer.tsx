import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router';
import { Tooltip, Typography } from 'antd';
import { AxiosError } from 'axios';
import { LeftCircleOutlined } from '@ant-design/icons';

import { ErrorBoundary } from '../ErrorBoundary';
import style from './style.module.scss';
import NotFoundTemplate from './components/NotFoundTemplate';
import ErrorTemplate from './components/ErrorTemplate';
import BodyTemplate from './components/BodyTemplate';

const { Text } = Typography;

interface PageContainerProps {
  title: string,
  backButtonLabel?: string,
  backHash?: string,
  error?: AxiosError | null
}

const PageContainer: FC<PageContainerProps> = ({ title, backButtonLabel, backHash, error = null, children }) => {
  const history = useHistory();

  const goBack = useCallback(() => {
    if (backHash) {
      history.push(backHash);
    }
  }, [backHash]);

  const backButton = backHash && (
    <Tooltip title={backButtonLabel}>
      <LeftCircleOutlined
        onClick={goBack}
        className={style.page__backButton}
      />
    </Tooltip>
  );

  const getTemplate = useCallback(() => {
    if (error && error.response && error.response.status === 404) {
      return <NotFoundTemplate />;
    } else if (error) {
      return <ErrorTemplate />;
    } else {
      return <BodyTemplate>{children}</BodyTemplate>;
    }
  }, [error, children]);

  return (
    <ErrorBoundary>
      <div className={style.page__wrap}>
        <div className={style.page__header}>
          {backButton}
          <Text className={style.page__title}>
            {title}
          </Text>
        </div>
        {getTemplate()}
      </div>
    </ErrorBoundary>

  );
};

export default PageContainer;
