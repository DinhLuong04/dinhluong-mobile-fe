// src/service/storageService.ts
import type { LoginResponse } from '../types/auth.types';

const USER_KEY = 'user';

export const storageService = {
    getUser: (): LoginResponse | null => {
        try {
            const storedUser = localStorage.getItem(USER_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from storage", error);
            return null;
        }
    },
    setUser: (userData: LoginResponse): void => {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
    },
    removeUser: (): void => {
        localStorage.removeItem(USER_KEY);
    }
};