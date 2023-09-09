import { create } from 'zustand';

import authService from '../../services/authService';
import { showErrorNotification } from '../../components/Notification';
import { AxiosError } from 'axios';
import { intl } from '../../intl';

const initialState: any = {
  user: null,
  loading: true,
  successLogOut: false
};

export const authUserStore = create<any>(set => ({
  ...initialState,

  getUser: async () => {
    try {
      const { name, email } = await authService.getAuthUser();

      set({
        user: {
          name,
          email
        }
      });
    } catch (error) {
      const newError = error as AxiosError;
      showErrorNotification({
        error: newError,
        subject: intl.formatMessage({ id: 'NOTIFICATION_SUBJECT_USER' })
      });
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logOut: async () => {
    try {
      set({ loading: true });
      await authService.logout();
      set({ user: null, successLogOut: true });
    } catch (error) {
      const newError = error as AxiosError;
      showErrorNotification({ error: newError });
    } finally {
      set({ loading: false });
    }
  }
}));
