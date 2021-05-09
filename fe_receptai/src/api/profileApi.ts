import { putRequest } from "../networking/network";

export const updateProfile = (payload: string) => putRequest({ path: '/user/editProfile', payload });