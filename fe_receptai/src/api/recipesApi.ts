import { getRequest } from '../networking/network';

export const getMyRecipes = () => getRequest({path: '/recipe/user'});
