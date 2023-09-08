/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import { create } from 'zustand';
import { AxiosError } from 'axios';

import ticketService from '../../services/ticketService';
import { PAGE_ENTITIES_LIMIT } from '../../constants/constants';
import { showErrorNotification } from '../../components/Notification';
import { intl } from '../../intl';

export const initialState: any = {
  classifiedTickets: [],
  isClassifiedDataLoading: true,
  hasMoreClassified: true,

  unclassifiedTickets: [],
  isUnclassifiedDataLoading: true,
  hasMoreUnclassified: true,

  openClassifier: false,
  selectedTicket: {},

  controller: new AbortController()
};

export const useTicketsStore = create<any>((set, get) => ({
  ...initialState,

  getClassifiedTickets: async (props: any): Promise<void> => {
    const { query } = props;
    const tickets = get().classifiedTickets;
    const additionalParams = tickets?.length > 0
        ? { pageToken: tickets[tickets.length - 1].id }
        : {};
    const reqParams = {
      ...additionalParams,
      search: { all: query },
      isClassified: true,
      limit: PAGE_ENTITIES_LIMIT
    };
    try {
      set({ isClassifiedDataLoading: true });
      const resp: any = await ticketService.getTickets({
        params: reqParams,
        signal: get().controller.signal
      });
      const newTickets = resp?.tickets ?? [];
      set({
        classifiedTickets: [...tickets, ...newTickets ?? []],
        hasMoreClassified: newTickets.length === PAGE_ENTITIES_LIMIT,
        isClassifiedDataLoading: false
      });
    } catch (error) {
      set({ isClassifiedDataLoading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_CLASSIFIED_TICKETS_LIST' })
      });
    }
  },

  getUnclassifiedTickets: async (props: any): Promise<void> => {
    const { query } = props;
    const tickets = get().unclassifiedTickets;
    const additionalParams = tickets?.length > 0
        ? { pageToken: tickets[tickets.length - 1].id }
        : {};
    const reqParams = {
      ...additionalParams,
      search: { all: query },
      isClassified: false,
      limit: PAGE_ENTITIES_LIMIT
    };
    try {
      set({ isUnclassifiedDataLoading: true });
      const resp: any = await ticketService.getTickets({
        params: reqParams,
        signal: get().controller.signal
      });
      const newTickets = resp?.tickets ?? [];
      set({
        unclassifiedTickets: [...tickets, ...newTickets ?? []],
        hasMoreUnclassified: newTickets.length === PAGE_ENTITIES_LIMIT,
        isUnclassifiedDataLoading: false
      });
    } catch (error) {
      set({ isUnclassifiedDataLoading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_UNCLASSIFIED_TICKETS_LIST' })
      });
    }
  },

  clearClassifiedTickets: () => {
    set({
      classifiedTickets: []
    });
  },

  clearUnclassifiedTickets: () => {
    set({
      unclassifiedTickets: []
    });
  },

  toggleClassifier: (selectedTicket: any, open: boolean) => {
    set({
      openClassifier: open,
      selectedTicket
    });
  },

  resetStore: () => {
    get().controller.abort();
    set({ ...initialState, controller: new AbortController() });
  }
}));
