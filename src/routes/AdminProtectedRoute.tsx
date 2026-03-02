import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { message } from 'antd';
import type { AuthData } from '../types/auth.types';

const AdminProtectedRoute: React.FC = () => {
    const userStr = localStorage.getItem('user');
    const user: AuthData | null = userStr ? JSON.parse(userStr) : null;

    // 1. Kiểm tra an toàn quyền Admin (nếu chưa login thì mặc định là false)
    const isAdmin = user ? (user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') : false;

    // 2. GỌI HOOK Ở TRÊN CÙNG (Tuyệt đối không để sau các lệnh return)
    useEffect(() => {
        // Chỉ hiện thông báo báo lỗi khi: ĐÃ đăng nhập NHƯNG KHÔNG CÓ quyền Admin
        if (user && !isAdmin) {
            message.error("Bạn không có quyền truy cập trang quản trị!");
        }
    }, [user, isAdmin]);

    // 3. Xử lý các điều kiện chuyển hướng (Early Returns) SAU KHI đã gọi xong Hooks
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // 4. Hợp lệ thì cho đi tiếp
    return <Outlet />;
};

export default AdminProtectedRoute;