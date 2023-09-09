import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { ReactElement } from 'react';
import { Button, Menu, Typography } from 'antd';
import style from './style.module.scss';
import { intl } from '../../intl';

export const getUserMenu = (
    user: any,
    handleLogOut: () => void
): ReactElement => {
  return (
      <Menu>
        <Menu.Item key="1" disabled style={{ cursor: 'unset' }}>
          <div className={style.userInfo__dropdownWrap}>
            <UserOutlined style={{ fontSize: 20 }} />
            <div>
              <div>
                <p className={style.userInfo__rowTitle}>{intl.formatMessage({ id: 'EMAIL_DROPDOWN_TITLE' })}</p>
                <Typography.Text copyable style={{
                  maxWidth: 380,
                  display: 'inline-block',
                  whiteSpace: 'normal',
                  fontSize: 12
                }}>{user?.email || '-'}</Typography.Text>
              </div>
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2" disabled style={{ cursor: 'unset', padding: 0 }}>
          <Button type={'text'} className={style.userInfo__btnLogout} onClick={handleLogOut} icon={<LogoutOutlined />}>
            <span className={style.userInfo__btnLogout_text}>{intl.formatMessage({ id: 'HEADER_LOGOUT' })}</span>
          </Button>
        </Menu.Item>
      </Menu>
  );
};

export const headerId = 'ai_header_container';
