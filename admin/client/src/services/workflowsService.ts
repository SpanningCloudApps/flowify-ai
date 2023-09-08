/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getWorkflows({
                       data,
                       signal
                     }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/workflows/search`, data, { signal }
    );
    return resp.data;
  },

  async addWorkflow({ data, signal }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/workflows`,
        data,
        { signal }
    );
    return resp.data;
  },

  async deleteWorkflow({ workflowId, signal }: any): Promise<void> {
    await axios.delete(
        `${API_GATEWAY}/api/workflows/${workflowId.toString()}`,
        { signal }
    );
  }
};

export default service;
