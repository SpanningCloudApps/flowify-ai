/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import axios from 'axios';

import { useAuthUserStore } from '../store';
import { intl } from '../intl';

const LONG_RUNNING_REQUEST_TIMEOUT = 60000; // 60s

const instance = axios.create({
  withCredentials: true,
  timeout: LONG_RUNNING_REQUEST_TIMEOUT, // for development mode set 0
  timeoutErrorMessage: intl.formatMessage({ id: 'TIMEOUT_REQUEST_ERROR' }),
  transitional: {
    clarifyTimeoutError: true
  }
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      useAuthUserStore.setState({ user: null, config: {} });
    }
    return Promise.reject(error);
  });

export default instance;
