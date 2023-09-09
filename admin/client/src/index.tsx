import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './assets/fonts/font-awesome.min.css';
import './assets/fonts/montserrat.css';
import App from './App';
import { RawIntlProvider } from 'react-intl';
import { intl } from './intl';
import { itcThemeTokenStyles, itcThemeComponentsStyles } from './styles/theme/theme.config';
import './index.scss';

ReactDOM.render(
  <RawIntlProvider value={intl}>
    <BrowserRouter>
      <ConfigProvider theme={{
        token: itcThemeTokenStyles,
        components: itcThemeComponentsStyles
      }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </RawIntlProvider>,
  document.getElementById('root')
);
