/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { intl } from '../intl';

export const customResponseError = {
  404: {
    response: {
      status: 404,
      data: intl.formatMessage({ id: 'PAGE_NOT_FOUND' })
    }
  }
};
