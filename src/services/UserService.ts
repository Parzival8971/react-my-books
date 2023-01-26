import { LoginReqType } from './../types';
import axios from 'axios';

const USER_API_URL = 'https://api.marktube.tv/v1/me';

export const UserService = {
  async login(reqData: LoginReqType): Promise<string> {
    const response = await axios.post(USER_API_URL, reqData);
    return response.data.token;
  },

  async logout(token: string): Promise<void> {
    await axios.delete(USER_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
