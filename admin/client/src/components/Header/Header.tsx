import { FC, useCallback } from 'react';
import { Dropdown, Layout, Typography } from 'antd';

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
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="9" r="3" stroke="#fff" strokeWidth="1.5"></circle>
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5"></circle>
                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                      stroke="#fff" strokeWidth="1.5" strokeLinecap="round"></path>
              </g>
            </svg>
            <Typography.Text ellipsis style={{ maxWidth: 200, fontSize: 14 }}>{user?.name || user?.email}</Typography.Text>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
