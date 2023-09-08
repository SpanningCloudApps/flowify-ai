/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { AxiosError } from 'axios';
import { intl } from '../intl';
import { CANCEL_REQUEST_MESSAGE } from '../constants/constants';

export const getErrorMessage = (error: unknown): string => {
  const newError = error as AxiosError;
  const errorString = typeof error === 'string' && error;
  return errorString || newError && newError.message || intl.formatMessage({ id: 'UNKNOWN_ERROR' });
};

export const isJsonString = (string: string | null): boolean => {
  try {
    JSON.parse(string as string);
  } catch (e) {
    return false;
  }
  return true;
};

export const isAbortedByUser = (error: AxiosError): boolean => {
  return error.message === CANCEL_REQUEST_MESSAGE;
};

export const findSearchParam = (searchString: string, searchParam: string): string | null => {
  return new URLSearchParams(searchString).get(searchParam);
};
