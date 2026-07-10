import type { UserModel } from "../models/UserModel";
import { api } from "./ApiService";

const registerPath = "auth/register";
const loginPath = "/auth/login";
const userPath = "users/me";

export const login = (body: UserModel) => api.post(loginPath, body);
export const signin = (body: UserModel) => api.post(registerPath, body);
export const profile = () => api.get(userPath, {});
export const editProfile = (body: UserModel) => api.put(userPath, body);