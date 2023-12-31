/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { enquireScreen } from 'enquire-js';

import Nav0 from './Nav0';
import Banner0 from './Banner0';
import Pricing0 from './Pricing0';
import Pricing01 from './Pricing01';
import Content4 from './Content4';
import Content13 from './Content13';
import Content3 from './Content3';
import Content9 from './Content9';
import Teams4 from './Teams4';
import Footer2 from './Footer2';
import 'antd/dist/antd.css';

import {
  Nav00DataSource,
  Banner00DataSource,
  Pricing00DataSource,
  Pricing01DataSource,
  Content40DataSource,
  Content130DataSource,
  Content30DataSource,
  Content90DataSource,
  Teams40DataSource,
  Footer20DataSource,
  PRODUCT_LINK,
  ABOUT_US_LINK,
  FEATURES_LINK,
  ROADMAP_LINK,
  OUR_TEAM_LINK,
  CONNECT_LINK
} from './data.source';
import './less/antMotionStyle.less';

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      show: !location.port
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    if (location.port) {
      setTimeout(() => {
        this.setState({
          show: true
        });
      }, 500);
    }
  }

  render() {
    const children = [
      <Nav0
        id="Nav0_0"
        key="Nav0_0"
        dataSource={Nav00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Banner0
        id="Banner0_0"
        key="Banner0_0"
        dataSource={Banner00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content13
        id={ABOUT_US_LINK}
        key="Content13_0"
        dataSource={Content130DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing0
        id={CONNECT_LINK}
        key="Pricing0_0"
        dataSource={Pricing00DataSource}
        isMobile={this.state.isMobile}
      />,
      <Pricing01
        id="Pricing0_1"
        key="Pricing0_1"
        dataSource={Pricing01DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content4
        id={PRODUCT_LINK}
        key="Content4_0"
        dataSource={Content40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content3
        id={FEATURES_LINK}
        key="Content3_0"
        dataSource={Content30DataSource}
        isMobile={this.state.isMobile}
      />,
      <Content9
        id={ROADMAP_LINK}
        key="Content9_0"
        dataSource={Content90DataSource}
        isMobile={this.state.isMobile}
      />,
      <Teams4
        id={OUR_TEAM_LINK}
        key="Teams4_0"
        dataSource={Teams40DataSource}
        isMobile={this.state.isMobile}
      />,
      <Footer2
        id="Footer2_0"
        key="Footer2_0"
        dataSource={Footer20DataSource}
        isMobile={this.state.isMobile}
      />
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {this.state.show && children}
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
