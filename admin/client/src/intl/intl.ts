/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved.
 */
import { createIntlCache, createIntl } from 'react-intl';
import flatten from 'flat';
import enLocalData from '../resources/en';

const intlCache = createIntlCache();

const locales: { EN: { localName: string; localMessages: Record<string, string> } } = {
  EN: {
    localName: 'en',
    localMessages: { ...flatten(enLocalData) }
  },
};

const defaultLocale = locales.EN.localName;

const intl = createIntl(
  {
    defaultLocale,
    locale: locales.EN.localName,
    messages: locales.EN.localMessages,
  },
  intlCache,
);

export { locales, intl };
