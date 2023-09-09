import { create } from 'zustand';
import { AxiosError } from 'axios';

import workflowsService from '../../services/workflowsService';
import { PAGE_ENTITIES_LIMIT } from '../../constants/constants';
import { showErrorNotification } from '../../components/Notification';
import {intl} from "../../intl";

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
    const { query, pageToken } = props;
    const workflows = get().workflows;
    const additionalParams = pageToken
        ? { pageToken }
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
        workflows: pageToken ? [...workflows, ...newWorkflows] : [...newWorkflows],
        hasMore: newWorkflows.length === PAGE_ENTITIES_LIMIT,
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: 'Get Workflows'
      });
    }
  },

  addWorkflow: async (props: any): Promise<void> => {
    const { workflowName, description } = props;
    const reqParams = {
      workflowName,
      description
    };
    try {
      set({ loading: true });
      await workflowsService.addWorkflow({
        data: reqParams,
        signal: get().controller.signal
      });
      get().getWorkflows({});
    } catch (error) {
      set({ loading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: 'Add Workflow'
      });
    }
  },

  deleteWorkflow: async (props: any): Promise<void> => {
    const { id } = props;
    try {
      set({ loading: true });
      await workflowsService.deleteWorkflow({
        workflowId: id,
        signal: get().controller.signal
      });
      get().getWorkflows({});
    } catch (error) {
      set({ loading: false });
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject:  intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_DELETING_WORKFLOW' })
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
