import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { tokenStored } from '../../utils';
import { RootState } from '../../app/store';

export interface ILoginRequest {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginConfig, setLoginConfig] = useState<ILoginRequest>({ email: '', password: '' });

  const {isAuthenticated} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setLoginConfig(oldVal => {
      return {
        ...oldVal,
        [name]: value
      };
    });
  }

  if (tokenStored() || isAuthenticated) {
    return <Redirect to='/app' />;
  }

  return (
    <div className='loginDiv'>
      <input id='credentialField' type='text' name='email' placeholder='Username' value={loginConfig.email}
             onChange={handleChange} />{' '}
      <input
        id='credentialField'
        type='password'
        name='password'
        placeholder='Password'
        value={loginConfig.password}
        onChange={handleChange}
      />
      <button type='submit' onClick={() => dispatch(login(loginConfig))}>
        Login
      </button>
    </div>
  );
};
