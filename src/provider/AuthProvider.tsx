import React, { useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 
import { storageService } from '../service/storageService';
import type { LoginResponse } from '../types/auth.types'; 

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<LoginResponse | null>(() => storageService.getUser());
    const login = (userData: LoginResponse) => {
        setUser(userData);
        storageService.setUser(userData);
    };
    const logout = () => {
        setUser(null);
        storageService.removeUser(); 
    };
    const isLogin = !!user;

    return (
        <AuthContext.Provider value={{ user, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};