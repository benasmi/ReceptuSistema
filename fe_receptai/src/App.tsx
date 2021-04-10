import React, { useEffect } from 'react';
import './App.css';
import { getProfile } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';


function App() {

  const { profile } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return profile ? (
    <div className='App'>
      Main app for authenticated user: {profile.email}
    </div>
  ) : <div>Loading...</div>;
}

export default App;
