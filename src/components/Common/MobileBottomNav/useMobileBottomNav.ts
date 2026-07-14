// src/components/MobileBottomNav/useMobileBottomNav.ts
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notificationService } from '../../../service/notificationService';

export const useMobileBottomNav = (unreadNotifCount: number, setUnreadCount?: (count: number) => void) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [localUnreadCount, setLocalUnreadCount] = useState<number>(unreadNotifCount);

    useEffect(() => {
        let isMounted = true; 

        const fetchUnreadCount = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;

            try {
                const count = await notificationService.getUnreadCount();
                if (isMounted) { 
                    setLocalUnreadCount(count);
                    if (setUnreadCount) {
                        setUnreadCount(count);
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy số lượng thông báo:", error);
            }
        };

        fetchUnreadCount();

        return () => {
            isMounted = false; 
        };
    }, []);

    const handleUpdateUnreadCount = (count: number) => {
        setLocalUnreadCount(count);
        if (setUnreadCount) setUnreadCount(count);
    };

    const handleNavClick = (item: any) => {
        if (item.id === 'notification') {
            setIsNotifOpen(true);
            return;
        }
        navigate(item.path);            
    };

    const NAV_ITEMS = [
        { id: 'home', label: 'Trang chủ', path: '/', badge: 0 },
        { id: 'orders', label: 'Đơn hàng', path: '/member/order', badge: 0 },
        { id: 'notification', label: 'Thông báo', path: '#', badge: localUnreadCount },
        { id: 'account', label: 'Tài khoản', path: '/member', badge: 0 }
    ];

    let activeIndex = NAV_ITEMS.findIndex(item => {
        if (item.path === '/' && location.pathname === '/') return true;
        if (item.path !== '/' && item.path !== '#' && location.pathname.startsWith(item.path)) return true;
        return false;
    });

    if (activeIndex === -1) activeIndex = 0;

    return {
        isNotifOpen, setIsNotifOpen,
        handleUpdateUnreadCount,
        handleNavClick, activeIndex, NAV_ITEMS
    };
};