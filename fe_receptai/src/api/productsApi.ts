import { getRequest } from '../networking/network';

export const getProducts = () => getRequest({ path: '/products' });
