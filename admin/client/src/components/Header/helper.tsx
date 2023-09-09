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
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                 stroke="#000000">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="9" r="3" stroke="#000000" strokeWidth="1.5"></circle>
                <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5"></circle>
                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                      stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
              </g>
            </svg>
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
          <Button type={'text'}
                  className={style.userInfo__btnLogout}
                  onClick={handleLogOut}
                  icon={<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"></path>
                      </g>
                    </g>
                  </svg>}>
            <span className={style.userInfo__btnLogout_text}>{intl.formatMessage({ id: 'HEADER_LOGOUT' })}</span>
          </Button>
        </Menu.Item>
      </Menu>
  );
};

export const headerId = 'ai_header_container';
