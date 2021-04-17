import { getRequest, postRequest } from '../networking/network';
import { ILoginRequest } from '../pages/login/LoginPage';

export const loginRequest = (payload: ILoginRequest) =>
  postRequest({ path: '/auth/login', payload });
export const userProfileRequest = () => getRequest({ path: '/user/profile' });
