import { postRequest, IGetRequest, getRequest } from '../networking/network';
import { ILoginRequest } from '../pages/login/LoginPage';
import { IRegisterRequest } from '../pages/register/RegisterPage';

export const loginRequest = (payload: ILoginRequest) => postRequest({path: '/auth/login', payload});
export const userProfileRequest = () => getRequest({path: '/user/profile'});
export const signUpRequest = (payload: IRegisterRequest) => postRequest({ path: '/auth/sign-up', payload });