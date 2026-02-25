import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { AuthData } from '../types/auth.types'; // Nhớ import đúng đường dẫn

const AdminProtectedRoute: React.FC = () => {
    const userStr = localStorage.getItem('user');
    const user: AuthData | null = userStr ? JSON.parse(userStr) : null;

    // 1. Chưa đăng nhập
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Không phải Admin
    if (user.role !== 'ADMIN' && user.role !== 'ROLE_ADMIN') {
        alert("Bạn không có quyền truy cập trang quản trị!");
        return <Navigate to="/" replace />;
    }

    // 3. Đúng là Admin thì cho đi tiếp
    return <Outlet />;
};

export default AdminProtectedRoute;