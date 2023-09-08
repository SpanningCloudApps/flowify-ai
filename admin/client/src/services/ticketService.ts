/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { PAGE_ENTITIES_LIMIT } from '../constants/constants';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getTickets({
                    params,
                    signal
                  }: any): Promise<any> {
    const reqParams = {
      query: params.query,
      pageToken: params.pageToken,
      limit: PAGE_ENTITIES_LIMIT
    };
    const resp: AxiosResponse<any> = await axios.get(
        `${API_GATEWAY}/api/tickets`, { params: reqParams, signal }
    );
    return resp.data;
  },

  async classifyTicket({ ticketId, ticketClassification, signal }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/tickets/${ticketId.toString()}/classify`,
        { ticketClassification },
        { signal }
    );
    return resp.data;
  }
};

export default service;
