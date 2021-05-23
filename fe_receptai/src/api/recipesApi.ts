import { IFilterProps, IPagingProps } from '../components/RecipeList';
import { deleteRequest, getRequest, postRequest, putRequest } from '../networking/network';
import { IFullRecipe, IProduct } from '../pages/recipe/RecipeForm';

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
export const addRecipe = (payload: IFullRecipe) => postRequest({ path: `/recipe/`, payload})
export const getRecipes = (full: boolean = false) => getRequest({ path: `/recipe/` })
export const getRecipePage = (pagingProps: IPagingProps, filterProps: IFilterProps | undefined) => 
  getRequest({ path: `/recipe?page=${pagingProps.page}&size=${pagingProps.size}&price=${filterProps?.price}&difficulty=${filterProps?.difficulty}`});
export const getRecommendedRecipes = () => getRequest({ path: '/recipe/recommended' });