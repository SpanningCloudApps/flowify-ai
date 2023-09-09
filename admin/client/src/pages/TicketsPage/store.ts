import { create } from 'zustand';
import { AxiosError } from 'axios';

import ticketService from '../../services/ticketService';
import { PAGE_ENTITIES_LIMIT } from '../../constants/constants';
import { showErrorNotification } from '../../components/Notification';
import { intl } from '../../intl';

export const initialState: any = {
  classifiedTickets: [],
  classifiedSearch: '',
  isClassifiedDataLoading: true,
  hasMoreClassified: true,

  unclassifiedTickets: [],
  unclassifiedSearch: '',
  isUnclassifiedDataLoading: true,
  hasMoreUnclassified: true,

  openClassifier: false,
  selectedTicket: {},

  controller: new AbortController()
};

export const useTicketsStore = create<any>((set, get) => ({
  ...initialState,

  getClassifiedTickets: async (props: any): Promise<void> => {
    const { query, pageToken } = props;
    const tickets = get().classifiedTickets;
    const additionalParams = pageToken
        ? { pageToken }
        : {};
    const reqParams = {
      ...additionalParams,
      search: { all: query || '' },
      isClassified: true,
      limit: PAGE_ENTITIES_LIMIT
    };
    try {
      set({ isClassifiedDataLoading: true });
      const resp: any = await ticketService.getTickets({
        data: reqParams,
        signal: get().controller.signal
      });
      const newTickets = resp?.tickets ?? [];
      set({
        classifiedTickets: pageToken ? [...tickets, ...newTickets] : [...newTickets],
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
    const { query, pageToken } = props;
    const tickets = get().unclassifiedTickets;
    const additionalParams = pageToken
        ? { pageToken }
        : {};
    const reqParams = {
      ...additionalParams,
      search: { all: query || '' },
      isClassified: false,
      limit: PAGE_ENTITIES_LIMIT
    };
    try {
      set({ isUnclassifiedDataLoading: true });
      const resp: any = await ticketService.getTickets({
        data: reqParams,
        signal: get().controller.signal
      });
      const newTickets = resp?.tickets ?? [];
      set({
        unclassifiedTickets:  pageToken ? [...tickets, ...newTickets] : [...newTickets],
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

  updateTicket: async (props: any): Promise<void> => {
    const { workflowName, description, id } = props;
    const reqParams = {
      workflowName,
      description
    };
    try {
      set({
        isUnclassifiedDataLoading: true,
        isClassifiedDataLoading: true
      });
      await ticketService.updateTicket({
        ticketId: id,
        data: reqParams,
        signal: get().controller.signal
      });
      get().getClassifiedTickets({});
      get().getUnclassifiedTickets({});
    } catch (error) {
      set({
        isUnclassifiedDataLoading: false,
        isClassifiedDataLoading: false
      });
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
