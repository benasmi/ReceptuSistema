import { IEditAllergen } from "../components/AllergenItem";
import { IEditProduct } from "../components/ProductItem";
import { deleteRequest, getRequest, postRequest, putRequest } from "../networking/network";
import { IAllergen } from "../pages/profile/EditAllergens";
import { IProduct } from "../pages/profile/EditProducts";

export const updateProfile = (payload: any) => putRequest({ path: '/user/editProfile', payload });
export const getUserAllergens = () => getRequest({ path: '/allergens/user/'});
export const addUserAllergen = (payload: IAllergen) => postRequest({path: '/allergens/user/', payload});
export const deleteUserAllergen = (id: number) => deleteRequest({ path: `/allergens/user/${id}` });
export const editUserAllergen = (id: number, payload: IEditAllergen) => putRequest( { path: `/allergens/user/${id}`, payload});

export const getUserProducts = () => getRequest({ path: '/products/user/'});
export const addUserProduct = (payload: IProduct) => postRequest({path: '/products/user/', payload});
export const deleteUserProduct = (id: number) => deleteRequest({ path: `/products/user/${id}` });
export const editUserProduct = (id: number, payload: IEditProduct) => putRequest( { path: `/products/user/${id}`, payload});