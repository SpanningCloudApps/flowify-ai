/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { AxiosResponse } from 'axios';
import axios from '../config/axiosConfig';
import { API_GATEWAY } from '../constants/urls';

const authService = {

  async logout(): Promise<void> {
    await axios.post(
      `${API_GATEWAY}/logout`, {}
    );
  },

  async getAuthUser(): Promise<any> {
    const resp: AxiosResponse<any> = await axios.get(
      `${API_GATEWAY}/me`
    );
    return resp.data;
  },

  async fetchUserPicture(imageUrl: string): Promise<Blob> {
    const resp: AxiosResponse<Blob> = await axios.get(imageUrl, { responseType: 'blob', withCredentials: false });
    return resp.data;
  }
};

export default authService;
