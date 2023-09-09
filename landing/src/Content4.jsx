/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import VideoPlay from 'react-sublime-video';
import { getChildrenToRender } from './utils';

function Content4(props) {
  const { ...tagProps } = props;
  const { dataSource, isMobile } = tagProps;
  delete tagProps.dataSource;
  delete tagProps.isMobile;
  const animation = {
    y: '+=30',
    opacity: 0,
    type: 'from',
    ease: 'easeOutQuad'
  };
  const video1Children = dataSource.video1.children.video;
  const video2Children = dataSource.video2.children.video;
  const videoNameArray = video1Children.split('.');
  const type = videoNameArray[videoNameArray.length - 1];
  return (
    <div {...tagProps} {...dataSource.wrapper}>
      <div {...dataSource.page}>
        <div key="title" {...dataSource.titleWrapper}>
          {dataSource.titleWrapper.children.map(getChildrenToRender)}
        </div>
        <div style={{ textAlign: 'center', fontSize: 20 }}>
          {dataSource.video1Title.children.map(getChildrenToRender)}
        </div>
        <br />
        <OverPack {...dataSource.OverPack}>
          <TweenOne
            key="video1"
            animation={{ ...animation, delay: 300 }}
            {...dataSource.video1}
          >
            {isMobile ? (
              <video
                width="100%"
                loop
                controls
                poster={dataSource.video1.children.image}
              >
                <source src={video1Children} type={`video/${type}`} />
                <track kind="captions" />
              </video>
            ) : (
              <VideoPlay
                loop
                width="100%"
                poster={dataSource.video1.children.image}
              >
                <source src={video1Children} type={`video/${type}`} />
              </VideoPlay>
            )}
          </TweenOne>
        </OverPack>
        <br />
        <div style={{ textAlign: 'center', fontSize: 20 }}>
          {dataSource.video2Title.children.map(getChildrenToRender)}
        </div>
        <br />
        <OverPack {...dataSource.OverPack}>
          <TweenOne
            key="video2"
            animation={{ ...animation, delay: 300 }}
            {...dataSource.video2}
          >
            {isMobile ? (
              <video
                width="100%"
                loop
                controls
                poster={dataSource.video2.children.image}
              >
                <source src={video2Children} type={`video/${type}`} />
                <track kind="captions" />
              </video>
            ) : (
              <VideoPlay
                loop
                width="100%"
                poster={dataSource.video2.children.image}
              >
                <source src={video2Children} type={`video/${type}`} />
              </VideoPlay>
            )}
          </TweenOne>
        </OverPack>
      </div>
    </div>
  );
}

export default Content4;
