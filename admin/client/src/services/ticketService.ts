import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { API_GATEWAY } from '../constants/urls';

const service = {
  async getTickets({
                     data,
                     signal
                   }: any): Promise<any> {
    const resp: AxiosResponse<any> = await axios.post(
        `${API_GATEWAY}/api/tickets/search`, data, { signal }
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
