import React, { useEffect } from 'react';
import './App.css';
import { getProfile } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

/*
todo:
  1. To create materialSlice (that has general data like products, allergenes etc.) and load here
  2. Show loading until all resources are loaded
  3. Add router inside this component + navbar
  4. My recipes navbar option and components for it
 */


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
