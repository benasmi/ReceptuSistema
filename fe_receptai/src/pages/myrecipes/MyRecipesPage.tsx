import React, { useEffect, useState } from 'react';
import RecipeCard, { IRecipe, IRecipeCard } from '../../components/RecipeCard';
import { getMyRecipes } from '../../api/recipesApi';
import { AxiosError } from 'axios';
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';


export default function MyRecipesPage() {

  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const history = useHistory();

  useEffect(() => {
    getMyRecipes().then((data: IRecipe[]) => {
      setRecipes(data);
    }).catch((err: AxiosError<Error>) => {

    });
  }, []);

  function editRecipe(id: number){
    history.push(`/app/recipe/${id}`);
  }

  function addNewRecipe(): void {
    history.push('/app/recipe/');
  }

  return (
    <div>
      <Button variant='primary' onClick={addNewRecipe}>Add new</Button>
      {
        recipes.map(recipe => {
          return <RecipeCard recipe={recipe} editRecipe={editRecipe} />;
        })
      }
    </div>
  );
};
