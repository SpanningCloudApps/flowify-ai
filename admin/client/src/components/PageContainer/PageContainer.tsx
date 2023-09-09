import { FC, useCallback } from 'react';
import { Typography } from 'antd';
import { AxiosError } from 'axios';

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

const PageContainer: FC<PageContainerProps> = ({ title, error = null, children }) => {

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
