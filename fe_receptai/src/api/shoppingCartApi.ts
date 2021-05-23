import { getRequest } from "../networking/network";

export const formShoppingCart = (id: string) => getRequest({ path: `/cart/${id}` }); 