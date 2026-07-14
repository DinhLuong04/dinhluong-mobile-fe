import { createContext, useContext } from 'react';
import type { LoginResponse } from '../types/auth.types'; // Import từ file types

export interface AuthContextType {
    user: LoginResponse | null;
    isLogin: boolean;
    login: (userData: LoginResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};