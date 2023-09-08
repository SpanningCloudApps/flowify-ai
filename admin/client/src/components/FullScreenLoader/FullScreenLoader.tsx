/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */
import { FC } from 'react';
import { Spin } from 'antd';
import style from './styles.module.scss';

const FullScreenLoader: FC = () => {
  return (
    <div className={style.wrap}>
      <Spin size={'large'} />
    </div>
  );
};

export default FullScreenLoader;
