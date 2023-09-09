import { FC } from 'react';
import { Space, Typography } from 'antd';

import style from './style.module.scss';

const { Title } = Typography;

interface PageHeaderProps {
  title: string,
  backButtonLabel?: string,
  backHash?: string,
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {

  return (
      <Space align="center" className={style.wrap}>
        <Title level={4} className={style.title}>
          {title}
        </Title>
      </Space>
  );
};

export default PageHeader;
