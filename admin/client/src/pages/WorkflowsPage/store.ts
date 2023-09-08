/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import { create } from 'zustand';
import { AxiosError } from 'axios';

import workflowsService from '../../services/workflowsService';
import { PAGE_ENTITIES_LIMIT } from '../../constants/constants';
import { showErrorNotification } from '../../components/Notification';
import { intl } from '../../intl';

export const initialState: any = {
  workflows: [],
  loading: true,
  hasMore: true,
  open: false,
  controller: new AbortController()
};

export const useWorkflowsStore = create<any>((set, get) => ({
  ...initialState,

  getWorkflows: async (props: any): Promise<void> => {
    const { query } = props;
    const workflows = get().workflows;
    const additionalParams = workflows?.length > 0
        ? { pageToken: workflows[workflows.length - 1].id }
        : {};
    const reqParams = {
      ...additionalParams,
      search: { all: query },
      limit: PAGE_ENTITIES_LIMIT
    };
    try {
      set({ loading: true });
      const resp: any = await workflowsService.getWorkflows({
        data: reqParams,
        signal: get().controller.signal
      });
      const newWorkflows = resp?.workflows ?? [];
      set({
        classifiedTickets: [...workflows, ...newWorkflows ?? []],
        hasMore: newWorkflows.length === PAGE_ENTITIES_LIMIT,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_CLASSIFIED_TICKETS_LIST' })
      });
    }
  },

  clearWorkflows: () => {
    set({
      workflows: []
    });
  },

  toggleDrawer: (open: boolean) => {
    set({ open });
  },

  resetStore: () => {
    get().controller.abort();
    set({ ...initialState, controller: new AbortController() });
  }
}));
