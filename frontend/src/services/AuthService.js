import {api} from "./Api";

const registerPath = "auth/register";
const loginPath = "/auth/login";
const userPath = "users/me";

export const login = (body) => api.post(loginPath, body);
export const signin = (body) => api.post(registerPath, body);
export const profile = () => api.get(userPath, {});