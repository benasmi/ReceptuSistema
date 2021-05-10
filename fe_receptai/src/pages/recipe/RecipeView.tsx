import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import { getRecipe } from '../../api/recipesApi'
import { IFullRecipe } from './RecipeForm'

interface IRecipeViewParams {
    id: string;
}

export default function RecipeView() {
    const { id }: IRecipeViewParams = useParams();
    const [recipe, setRecipe] = useState<IFullRecipe>();
    useEffect(() => {
        getRecipe(+id)
            .then((recipe: IFullRecipe) => setRecipe(recipe))
            .catch(() => toast.error('Unable to get recipe'))
    }, [id]);
    return (
        <>
            <div>
                {recipe?.title}
            </div>
            <div>
                {recipe?.difficulty}
            </div>
        </>
    );
}
