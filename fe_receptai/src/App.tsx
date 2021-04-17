import React, { useEffect } from 'react';
import './App.css';
import { getProfile } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Route } from 'react-router-dom';
import MyRecipesPage from './pages/myrecipes/MyRecipesPage';
import HomePage from './pages/home/HomePage';
import RecipesNavbar from './components/RecipesNavbar';
import RecipePage from './pages/recipe/RecipePage';
import Recipe from "./pages/recipe/Recipe";

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
  }, [dispatch]);

  return profile ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <RecipesNavbar />
      <div style={{ padding: '20px' }}>
        <Route exact path="/app/my-recipes">
          <MyRecipesPage />
        </Route>

        <Route exact path="/app/my-recipes/:id">
          <Recipe />
        </Route>

        <Route exact path="/app/my-recipes/:id/edit">
          <RecipePage />
        </Route>

        <Route path="/app/home">
          <HomePage />
        </Route>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
