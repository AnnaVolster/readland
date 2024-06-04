// auth.js
export const setToken = (access, refresh) => {
    localStorage.setItem('token', access);
    localStorage.setItem('refresh_token', refresh);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
};

export const isLoggedIn = () => {
    const token = getToken();
    return !!token;
};
