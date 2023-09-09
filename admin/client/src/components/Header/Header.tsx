import { FC, useCallback } from 'react';
import { Dropdown, Layout, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { getUserMenu, headerId } from './helper';
import { useAuthUserStore } from '../../store';
import style from './style.module.scss';

const Header: FC = () => {
  const user = useAuthUserStore(state => state.user);
  const logOut = useAuthUserStore(state => state.logOut);
  const getPopupContainer = useCallback(() => document.getElementById(headerId) as HTMLElement, []);

  const handleLogOut = useCallback(() => {
    logOut();
  }, []);

  return (
    <Layout.Header className={style.header} id={headerId}>
      <div className={style.header__userInfo}>
        <Dropdown
          overlay={getUserMenu(user, handleLogOut)}
          placement="bottomRight"
          trigger={['click']}
          getPopupContainer={getPopupContainer}
          arrow
        >
          <div className={style.userInfo__wrap}>
            <UserOutlined style={{ fontSize: 20 }} />
            <Typography.Text ellipsis style={{ maxWidth: 200, fontSize: 14 }}>{user?.name || user?.email}</Typography.Text>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
