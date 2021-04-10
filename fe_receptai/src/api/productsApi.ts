import { getRequest, IGetRequest } from '../networking/network';

export const getProducts = () => getRequest({path: '/products'});
