import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { ILoginRequest } from '../../pages/login/LoginPage';
import { loginRequest, userProfileRequest } from '../../api/authApi';
import { AxiosError } from 'axios';
import { setCookie } from '../../utils';

interface IProfile {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  blocked: boolean;
}

interface ILoginResponse {
  jwtToken: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  profile: IProfile | null;

}

const initialState: IAuthState = {
  isAuthenticated: false,
  profile: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: state => {
      state.isAuthenticated = true;
    },
    setProfile: (state,action: PayloadAction<IProfile | null>) => {
      state.profile = action.payload
      console.log(action.payload)
    }
  }
});

export const { authenticate, setProfile } = authSlice.actions;

export const login = (loginData: ILoginRequest): AppThunk => dispatch => {
  loginRequest(loginData).then((jwtResponse: ILoginResponse) => {
    setCookie('jwt', jwtResponse.jwtToken);
    dispatch(authenticate());
  }).catch((err: AxiosError<Error>) => {
  });
};

export const getProfile = (): AppThunk => dispatch => {
  console.log("Get profile")
  userProfileRequest().then((profile: IProfile) => {
    console.log("Profile", profile)
    dispatch(setProfile(profile));
  }).catch((err: AxiosError<Error>) => {
    dispatch(setProfile(null))
  });
};

export default authSlice.reducer;