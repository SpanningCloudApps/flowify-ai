import { FC, useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useIntl } from 'react-intl';
import { NavLink, useLocation } from 'react-router-dom';

import { navigationItems, NavigationItemType } from './helper';
import logo from '../../assets/img/pooper.png';
import style from './style.module.scss';
import { TICKETS } from '../../constants/urls';

const Sider: FC = () => {
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseSider = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
      <Layout.Sider
          width={250} collapsedWidth={70} className={style.sider} collapsed={collapsed}>
        <div className={style.sider__header}>
          <div className={style.header__logo_container}>
            <img className={style.header__logo} src={logo} alt="logo" />
            <h2 className={style.header__title}>
              {formatMessage({ id: 'SIDER_TITLE' })}
            </h2>
          </div>
          <span className={`fa fa-exchange ${style.header__btn_collapse}`} onClick={handleCollapseSider} />
        </div>
        <div className={style.menu__title}>{formatMessage({ id: 'NAVIGATION' })}</div>
        <Menu mode="inline" className={style.sider__menu} selectedKeys={[pathname]}
              defaultSelectedKeys={[TICKETS]}>
          {navigationItems.map(({ key, path, icon }: NavigationItemType) => (
              <Menu.Item key={path} className={style.menu__item}>
                <NavLink to={path} className={style.menu__navlink}>
                  <span className={style.navlink__text}>{formatMessage(key)}</span>
                  <span className={`${style.navlink__icon} ${icon}`} />
                </NavLink>
              </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
  );
};

export default Sider;
