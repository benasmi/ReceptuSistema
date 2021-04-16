import { deleteRequest, getRequest, postRequest, putRequest } from '../networking/network';
import { IRecipe } from '../components/RecipeCard';
import { IFullRecipe, IProduct } from '../pages/recipe/RecipePage';

export const getMyRecipes = () => getRequest({ path: '/recipe/user' });
export const getRecipe = (id: number) => getRequest({ path: `/recipe/${id}` });
export const deleteRecipe = (id: number) => deleteRequest({ path: `/recipe/${id}` });
export const updateRecipe = (id: number, payload: IFullRecipe) => putRequest({ path: `/recipe/${id}`, payload });
export const addRecipeProducts = (id: number, payload: IProduct[]) => postRequest({
  path: `/recipe/${id}/products`,
  payload
});
export const deleteRecipeProducts = (id: number, ids: number[]) => postRequest({
  path: `/recipe/${id}/products/delete`,
  payload: ids
});
