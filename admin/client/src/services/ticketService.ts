/*
 * Copyright (C) 2021 Spanning Cloud Apps.  All rights reserved
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { PAGE_ENTITIES_LIMIT } from '../constants/constants';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getTickets({
                     data,
                     signal
                   }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/tickets`, data, { signal }
    );
    return resp.data;
  },

  async updateTicket({ ticketId, data, signal }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.put(
        `${API_GATEWAY}/api/tickets/${ticketId.toString()}`,
        data,
        { signal }
    );
    return resp.data;
  }
};

export default service;
