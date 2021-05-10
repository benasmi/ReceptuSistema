import React, { useEffect } from 'react';
import './App.css';
import { getProfile } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserRecipeList from './pages/myrecipes/UserRecipeList';
import HomePage from './pages/home/HomePage';
import RecipesNavbar from './components/RecipesNavbar';
import RecipeForm from './pages/recipe/RecipeForm';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import { Spinner } from 'react-bootstrap';
import RecipeView from './pages/recipe/RecipeView';

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
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <RecipesNavbar />
        <div style={{padding: '20px'}}>
          <Route exact path='/app/recipe/:id?'>
            <RecipeView />
          </Route>
          <Route exact path='/app/my-recipes'>
            <UserRecipeList />
          </Route>
          <Route exact path='/app/recipe/edit/:id?'>
            <RecipeForm />
          </Route>
          <Route path='/app/home'>
            <HomePage />
          </Route>
          <Route path='/app/profile'>
            <Profile />
          </Route>
          <Route path='/app/editProfile'>
            <EditProfile />
          </Route>
          <Route path='/app/editAllergens'>
            <EditProfile />
          </Route>
        </div>
    </div>
  ) : <Spinner animation="border" />;
}

export default App;
