// Api.jsx
import axios from 'axios';
import { getToken, getRefreshToken, setToken, removeToken } from './auth';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
                    const { access } = response.data;
                    setToken(access, refreshToken);
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;
                    return apiClient(originalRequest);
                } catch (e) {
                    removeToken();
                    window.location.href = '/login';
                }
            } else {
                removeToken();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
