import { api } from "./Api";
const registerPath = "auth/register";
const loginPath = "/auth/login";
export const login = (body) => api.post(loginPath, body);
export const signin = (body) => api.post(registerPath, body);