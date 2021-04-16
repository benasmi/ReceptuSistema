import { deleteRequest, getRequest, putRequest } from '../networking/network';
import { IRecipe } from '../components/RecipeCard';
import { IFullRecipe } from '../pages/recipe/RecipePage';

export const getMyRecipes = () => getRequest({path: '/recipe/user'});
export const getRecipe = (id: number) => getRequest({path: `/recipe/${id}`});
export const deleteRecipe = (id: number) => deleteRequest({path: `/recipe/${id}`});
export const updateRecipe = (id: number, payload: IFullRecipe) => putRequest({path: `/recipe/${id}`, payload});
