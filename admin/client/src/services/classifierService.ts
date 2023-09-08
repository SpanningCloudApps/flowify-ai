/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { PAGE_ENTITIES_LIMIT } from '../constants/constants';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getDomainData({
                        params,
                        signal
                      }: any): Promise<any> {
    const reqParams = {
      expiresStart: params.expiredFrom,
      expiresEnd: params.expiredTo,
      query: params.query,
      paymentStatus: params.paymentStatus,
      pageToken: params.pageToken,
      order: params.sort.order,
      limit: PAGE_ENTITIES_LIMIT,
      withZombies: params.withZombies
    };
    const resp: AxiosResponse<any> = await axios.get(
      `${API_GATEWAY}/api/domains`, { params: reqParams, signal }
    );
    return resp.data;
  },

  async syncToSalesForce({ domainId, domainName, signal }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
      `${API_GATEWAY}/api/domains/${domainId.toString()}/sync-to-salesforce`,
      { domainName },
      { signal }
    );
    return resp.data;
  },

  async updateDomain({ domainId, data, signal }: any): Promise<void> {
    await axios.patch(
      `${API_GATEWAY}/api/domains/${domainId.toString()}`,
      data,
      { signal }
    );
  }
};

export default service;
