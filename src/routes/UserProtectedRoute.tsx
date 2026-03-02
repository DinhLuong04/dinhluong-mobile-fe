import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { ConfirmModal } from '../components/Common/ConfirmModal/ConfirmModal'; 

interface UserProtectedRouteProps {
    children: React.ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({ children }) => {
    // Ép kiểu (any) tạm thời hoặc lấy cả 'user' ra để né lỗi TypeScript
    const { isAuthenticated, user } = useAuth() as any; 
    const navigate = useNavigate();

    // Check xem biến nào đang giữ trạng thái login trong hệ thống của bạn
    const isLogin = isAuthenticated !== undefined ? isAuthenticated : !!user; 

    // Nếu chưa đăng nhập: Trực tiếp bung Modal ra, không cần chờ useEffect
    if (!isLogin) {
        return (
            <div style={{ minHeight: '60vh' }}> 
                <ConfirmModal
                    isOpen={true} // Bật luôn, không cần state showModal nữa
                    title="Yêu cầu đăng nhập"
                    message="Vui lòng đăng nhập để truy cập vào trung tâm tài khoản của bạn."
                    confirmText="Đăng nhập"
                    cancelText="Về trang chủ"
                    onConfirm={() => navigate('/login')}
                    onClose={() => navigate('/')}
                    onCancel={() => navigate('/')}
                />
            </div>
        );
    }

    // Nếu đã đăng nhập thì mở cổng
    return <>{children}</>;
};

export default UserProtectedRoute;