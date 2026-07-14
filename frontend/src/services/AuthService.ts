import type { ChangePswType } from "@/pages/ProfilePage/ChangePswType";
import type { UserModel } from "../models/UserModel";
import { api } from "./ApiService";

const registerPath = "/auth/register";
const loginPath = "/auth/login";
const userPath = "/users/me";
const searchAddresses = "/addresses/search";

export const login = (body: UserModel) => api.post(loginPath, body);
export const signin = (body: UserModel) => api.post(registerPath, body);
export const profile = () => api.get(userPath, {});
export const editProfile = (body: UserModel) => api.put(userPath, body);
export const searchAddress = (searchInput: string) => api.get(searchAddresses, {
    params: {
        search: searchInput
    }
});
export const editPsw = (body: ChangePswType) => api.put(`${userPath}/password`, body);