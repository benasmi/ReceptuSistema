import { getRequest } from "../networking/network";

export const getAllergens = () => getRequest({ path: '/allergens/' });