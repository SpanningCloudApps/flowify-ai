/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved
 */
import { intl } from '../../intl';
import { WORKFLOWS, TICKETS } from '../../constants/urls';

export const navigationItems = [
  {
    title: intl.formatMessage({ id: 'TICKETS' }),
    key: { id: 'TICKETS' },
    path: TICKETS,
    icon: 'fa fa-tasks'
  },
  {
    title: intl.formatMessage({ id: 'WORKFLOWS' }),
    key: { id: 'WORKFLOWS' },
    path: WORKFLOWS,
    icon: 'fa fa-code-fork'
  }
];

export type NavigationItemType = typeof navigationItems[number];
