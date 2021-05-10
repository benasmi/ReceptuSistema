import { putRequest } from "../networking/network";

export const updateProfile = (payload: any) => putRequest({ path: '/user/editProfile', payload });