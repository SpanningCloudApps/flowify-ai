import { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { notification } from 'antd';

import { intl } from './intl';
import { WORKFLOWS, TICKETS, LOGIN, ROOT, API_GATEWAY, LOGIN_URI } from './constants/urls';
import { useAuthUserStore } from './store';
import { CacheService } from './services/cacheService';
import AuthorizedLayout from './components/AuthorizedLayout';
import { FullScreenLoader } from './components/FullScreenLoader';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { TicketsPage } from './pages/TicketsPage';
import { LoginPage } from './pages/LoginPage';

const App: FC = () => {
  const getUser = useAuthUserStore(state => state.getUser);
  const loading = useAuthUserStore(state => state.loading);
  const user = useAuthUserStore(state => state.user);
  const successLogOut = useAuthUserStore(state => state.successLogOut);
  const { pathname } = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    notification.destroy();
  }, [pathname]);

  const handleStartURLRedirect = () => {
    const startURL = CacheService.getAdminURLCache();
    if (startURL) {
      CacheService.removeAdminURLCache();
      return <Redirect to={startURL} />;
    }
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  if (user) {
    return (
        <AuthorizedLayout>
          <Switch>
            {handleStartURLRedirect()}
            <Route exact path={TICKETS} component={TicketsPage} />
            <Route exact path={WORKFLOWS} component={WorkflowsPage} />
            <Redirect from={ROOT} to={TICKETS} />
          </Switch>
        </AuthorizedLayout>
    );
  }

  if (pathname !== LOGIN && !successLogOut) {
    CacheService.setAdminURLCache(pathname);
  }

  return (
      <Switch>
        <Route exact path={'/login'}>
          <LoginPage title={intl.formatMessage({ id: 'POOPER_AI' })}
                     color={'#10a37f'}
                     hrefGoogleRedirect={`${API_GATEWAY + LOGIN_URI}`}
                     buttonText={intl.formatMessage({ id: 'LOGIN_BUTTON' })}
                     delay={1.5} />
        </Route>
        <Redirect to={'/login'} />
      </Switch>
  );
};

export default App;
