/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */
import { FC, useCallback, useLayoutEffect, useRef } from 'react';
import './animation.scss';
import './style.scss';
import logo from '../../assets/img/pooper.png';

interface AdminLoginPageProps {
  title: string;
  color: string;
  hrefGoogleRedirect: string;
  buttonText: string;
  delay: number; // in seconds
}

const getLinearGradient = (color: string) => `linear-gradient(to left, ${color} 0%, #208a86 100%)`;

const getFlyAnimation = (time: number) => `bottom: 110vw; transition: bottom ${time}s`;

const LoginPage: FC<AdminLoginPageProps> = ({
                                              title,
                                              hrefGoogleRedirect,
                                              color,
                                              buttonText,
                                              delay
                                            }) => {
  const rocketBodyRef = useRef<any>(null);
  const launchBtnRef = useRef<any>(null);

  useLayoutEffect(() => {
    rocketBodyRef.current.style = '';
    launchBtnRef.current.disabled = false;

    const handlePagehide = () => {
      rocketBodyRef.current.style = '';
      launchBtnRef.current.disabled = false;
    };

    window.addEventListener('pagehide', handlePagehide); // to reset styles when window.location changes
    return () => {
      window.removeEventListener('pagehide', handlePagehide);
    };
  }, []);

  const handleRedirect = useCallback(() => {
    rocketBodyRef.current.style = getFlyAnimation(delay);
    launchBtnRef.current.disabled = true;
    const reg = /^https?:\/\//i;

    setTimeout(() => {
      if (reg.test(hrefGoogleRedirect)) {
        window.location.href = hrefGoogleRedirect;
      } else {
        window.location.pathname = hrefGoogleRedirect;
      }
    }, delay * 1000);
  }, [delay]);

  return (
      <div className="admin-login-page-container" style={{ background: getLinearGradient(color) }}>
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <div className="launch-container">
          <button ref={launchBtnRef} className="launch-btn" type="button" onClick={handleRedirect}>
            <div className="loading-spinner" />
            <span>{buttonText}</span>
          </button>
        </div>
        <div className="rocket">
          <div ref={rocketBodyRef} className="rocket-body">
            <div className="body">
              <div className="text">
                <text>
                  <span style={{ fontWeight: 'bold' }}>Pooper</span>
                  AI
                </text>
              </div>
            </div>
            <div className="fin fin-left" />
            <div className="fin fin-right" />

            <div className="window">
              <img src={logo} alt="icon" className="image" />
              <div className="glass" />

            </div>
            <div className="rocket-flame-container">
              <div className="red flame" />
              <div className="orange flame" />
              <div className="yellow flame" />
              <div className="white flame" />
              <div className="blue circle" />
              <div className="black circle" />
            </div>
          </div>
          <ul className="exhaust-fumes">
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="stars-small" />
        <div className="stars-middle" />
        <div className="stars-large" />
      </div>
  );
};

export default LoginPage;
