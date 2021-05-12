import { IEditAllergen } from "../components/AllergenItem";
import { deleteRequest, getRequest, postRequest, putRequest } from "../networking/network";
import { IAllergen } from "../pages/profile/EditAllergens";

export const updateProfile = (payload: any) => putRequest({ path: '/user/editProfile', payload });
export const getUserAllergens = () => getRequest({ path: '/allergens/user/'});
export const addUserAllergen = (payload: IAllergen) => postRequest({path: '/allergens/user/', payload});
export const deleteUserAllergen = (id: number) => deleteRequest({ path: `/allergens/user/${id}` });
export const editUserAllergen = (id: number, payload: IEditAllergen) => putRequest( { path: `/allergens/user/${id}`, payload});