import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notificationService } from '../../../service/notificationService';

export interface NavItem {
    id: string;
    label: string;
    path: string;
    badge: number;
}
const NAV_ITEMS_CONFIG: Omit<NavItem, 'badge'>[] = [
    { id: 'home', label: 'Trang chủ', path: '/' },
    { id: 'orders', label: 'Đơn hàng', path: '/member/order' },
    { id: 'notification', label: 'Thông báo', path: '#' },
    { id: 'account', label: 'Tài khoản', path: '/member' }
];

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

    const handleNavClick = (item: NavItem) => {
        if (item.id === 'notification') {
            setIsNotifOpen(true);
            return;
        }
        navigate(item.path);            
    };

    // Gắn badge vào cấu hình tĩnh
    const NAV_ITEMS: NavItem[] = NAV_ITEMS_CONFIG.map(item => ({
        ...item,
        badge: item.id === 'notification' ? localUnreadCount : 0
    }));

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