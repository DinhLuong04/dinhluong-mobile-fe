import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { message } from 'antd';
import type { AuthData } from '../types/auth.types';
import { useAuth } from '../contexts/AuthContext';

const AdminProtectedRoute: React.FC = () => {
    // 1. LẤY THÊM HÀM setSearchParams TỪ HOOK NÀY
    const [searchParams, setSearchParams] = useSearchParams();
    const [isChecking, setIsChecking] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    
    const { login } = useAuth();

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');

        if (tokenFromUrl) {
            try {
                const base64Url = tokenFromUrl.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    window.atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')
                );

                const decodedToken = JSON.parse(jsonPayload);
                const userRole = decodedToken.role || 'USER';

                if (userRole === 'ADMIN' || userRole === 'ROLE_ADMIN') {
                    const adminData: AuthData = {
                        id: decodedToken.id || 0,
                        email: decodedToken.sub || '',
                        name: decodedToken.name || 'Admin', 
                        avatar: '',
                        typeAccount: 'NORMAL',
                        role: userRole,
                        token: tokenFromUrl,
                    };
                    
                    login(adminData); 
                    setHasAccess(true);
                    message.success("Đăng nhập quản trị thành công!");
                } else {
                    message.error("Tài khoản không có quyền quản trị!");
                    setHasAccess(false);
                }
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
                message.error("Dữ liệu xác thực không hợp lệ!");
                setHasAccess(false);
            }

            // 2. XÓA TOKEN BẰNG REACT ROUTER (Thay thế cho window.history...)
            searchParams.delete('token');
            setSearchParams(searchParams, { replace: true });
            
            setIsChecking(false);

        } else {
            // Nhánh check localStorage giữ nguyên
            const userStr = localStorage.getItem('user');
            const user: AuthData | null = userStr ? JSON.parse(userStr) : null;
            const isAdmin = user ? (user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') : false;

            if (user && !isAdmin) {
                message.error("Tài khoản khách hàng không được phép truy cập khu vực này!");
                setHasAccess(false);
            } else if (isAdmin) {
                setHasAccess(true);
            } else {
                setHasAccess(false);
            }
            setIsChecking(false);
        }
        
    // 3. THÊM DÒNG NÀY ĐỂ BỎ QUA CẢNH BÁO CỦA LINTER TRÁNH LOOP
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); 

    if (isChecking) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h3>Đang xác thực quyền quản trị...</h3>
            </div>
        );
    }

    if (!hasAccess) {
        window.location.href = 'http://localhost:8080/admin/login';
        return null;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;