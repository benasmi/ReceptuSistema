import { getRequest } from '../networking/network';

export const getMyRecipes = () => getRequest({path: '/recipe/user'});
export const getRecipe = (id: number) => getRequest({path: `/recipe/${id}`});
