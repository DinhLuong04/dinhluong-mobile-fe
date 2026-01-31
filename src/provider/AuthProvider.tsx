import React, { useState, type ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import Context từ file kia
import type { User } from '../types/auth.types';

interface AuthProviderProps {
    children: ReactNode;
}

// Chỉ export Component này thôi
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    // Lazy Initialization để tránh lỗi setState trong useEffect
    const [user, setUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from storage", error);
            return null;
        }
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const isLogin = !!user;

    return (
        <AuthContext.Provider value={{ user, isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};