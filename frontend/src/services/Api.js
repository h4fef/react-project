import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

// recupera il token PRIMA di fare la richiesta
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})