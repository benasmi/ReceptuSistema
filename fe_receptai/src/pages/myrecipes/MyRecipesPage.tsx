import React, { useEffect, useState } from 'react';
import RecipeCard, { IRecipe, IRecipeCard } from '../../components/RecipeCard';
import { getMyRecipes } from '../../api/recipesApi';
import { AxiosError } from 'axios';
import { useHistory } from "react-router-dom";


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
    history.push(`/app/my-recipes/${id}`)
  }

  return (
    <div>
      {
        recipes.map(recipe => {
          return <RecipeCard recipe={recipe} editRecipe={editRecipe} />;
        })
      }
    </div>
  );
};
