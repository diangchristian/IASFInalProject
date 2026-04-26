import { getTokenFromLocalStorage } from "./localStorageToken";

export const getAuthHeaders = () => {
    const token = getTokenFromLocalStorage();

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};