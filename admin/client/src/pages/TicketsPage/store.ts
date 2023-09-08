/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { create } from 'zustand';
import { AxiosError } from 'axios';

import issueService from '../../services/issueService';
import { PAGE_ENTITIES_LIMIT } from '../../constants/constants';
import { showErrorNotification } from '../../components/Notification';
import { intl } from '../../intl';

export const initialState: any = {
  tickets: [],
  isDataLoading: false,
  hasMore: true,
  controller: new AbortController()
};

export const useTicketsStore = create<any>((set, get) => ({
  ...initialState,

  getTickets: async (props: any): Promise<void> => {
    const { query } = props;
    const tickets = get().tickets;
    const additionalParams = tickets?.length > 0
      ? { pageToken: tickets[tickets.length - 1].id }
      : {};
    const reqParams = { ...additionalParams, query };
    try {
      set({ isDataLoading: true });
      const resp: any = await issueService.getTickets({
        params: reqParams,
        signal: get().controller.signal
      });
      const newTickets = resp?.tickets ?? [];
      set({
        tickets: [...tickets, ...newTickets ?? []],
        hasMore: newTickets.length === PAGE_ENTITIES_LIMIT,
        isDataLoading: false
      });
    } catch (error) {
      set({ isDataLoading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_DOMAINS_LIST' })
      });
    }
  },

  clearTickets: () => {
    set({ tickets: [] });
  },

  resetStore: () => {
    get().controller.abort();
    set({ ...initialState, controller: new AbortController() });
  }
}));
