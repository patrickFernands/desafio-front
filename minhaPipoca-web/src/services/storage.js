const KEY = "token";

export const getToken = async () => localStorage.getItem(KEY);
export const setToken = async (token) => localStorage.setItem(KEY, token);
export const removeToken = async () => localStorage.removeItem(KEY);
