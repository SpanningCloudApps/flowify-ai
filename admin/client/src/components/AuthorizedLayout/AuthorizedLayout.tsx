/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { FC } from 'react';
import { Layout } from 'antd';

import { Header } from '../Header';
import { Sider } from '../Sider';
import './styles.scss';

const AuthorizedLayout: FC = ({ children }) => {

  return (
    <Layout className="admin-page" hasSider>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Layout.Content className="main">
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AuthorizedLayout;
