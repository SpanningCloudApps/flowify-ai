import { FC, useCallback } from 'react';
import { Button, Space, Tooltip, Typography } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import style from './style.module.scss';

const { Title } = Typography;

interface PageHeaderProps {
  title: string,
  backButtonLabel?: string,
  backHash?: string,
}

const PageHeader: FC<PageHeaderProps> = ({ title, backButtonLabel, backHash }) => {
  const history = useHistory();

  const handleBack = useCallback(() => history.push(backHash as string), [history]);

  const backButton = backHash && (
    <Tooltip title={backButtonLabel}>
      <Button type={'text'} icon={<LeftCircleOutlined style={{ fontSize: 20 }} />} onClick={handleBack} />
    </Tooltip>
  );

  return (
    <Space align="center" className={style.wrap}>
      {backButton}
      <Title level={4} className={style.title}>
        {title}
      </Title>
    </Space>
  );
};

export default PageHeader;
