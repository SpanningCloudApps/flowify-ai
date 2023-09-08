/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { PAGE_ENTITIES_LIMIT } from '../constants/constants';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getWorkflows({
                       params,
                       signal
                     }: any): Promise<any> {
    const reqParams = {
      query: params.query,
      pageToken: params.pageToken,
      limit: PAGE_ENTITIES_LIMIT
    };
    const resp: AxiosResponse<any> = await axios.get(
        `${API_GATEWAY}/api/workflows`, { params: reqParams, signal }
    );
    return resp.data;
  },

  async addWorkflow({ domainId, domainName, signal }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/domains/${domainId.toString()}/sync-to-salesforce`,
        { domainName },
        { signal }
    );
    return resp.data;
  },

  async deleteWorkflow({ domainId, data, signal }: any): Promise<void> {
    await axios.delete(
        `${API_GATEWAY}/api/domains/${domainId.toString()}`,
        data,
        { signal }
    );
  }
};

export default service;
