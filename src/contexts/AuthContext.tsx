import { createContext, useContext } from 'react';
import type { User } from '../types/auth.types'; // Import từ file types

// Định nghĩa kiểu dữ liệu cho Context
export interface AuthContextType {
    user: User | null;
    isLogin: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

// 1. Tạo Context (nhưng không export default)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Tạo Hook useAuth tại đây
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};