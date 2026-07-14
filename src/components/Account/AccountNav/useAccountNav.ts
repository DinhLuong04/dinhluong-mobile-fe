import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { authService } from '../../../service/authService';

export const useAccountNav = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleConfirmLogout = async () => {
        try {
            if (user?.refreshToken) {
                await authService.logout(user.refreshToken);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API đăng xuất phía Backend:", error);
        } finally {
            logout(); 
            window.dispatchEvent(new Event('cartUpdated'));      
            navigate('/');  
            setShowLogoutModal(false); 
        }
    };

    return {
        showLogoutModal,
        setShowLogoutModal,
        handleConfirmLogout
    };
};