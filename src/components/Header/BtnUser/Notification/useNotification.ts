// src/components/Header/BtnUser/Notification/useNotification.ts
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../../../../service/notificationService';
import type { NotificationItem } from '../../../../types/notification.type';

export const useNotification = (
    onClose: () => void, 
    refreshTrigger: number, 
    setUnreadCount: (count: number) => void
) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            const data = await notificationService.getAllNotifications();
            setNotifications(data);
            const unread = data.filter((n: NotificationItem) => !n.read).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Lỗi tải thông báo", error);
        } finally {
            setLoading(false);
        }
    }, [setUnreadCount]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchNotifications();
        }
        return () => {
            isMounted = false;
        };
    }, [refreshTrigger, fetchNotifications]);

    // Đánh dấu tất cả đã đọc
    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0); 
        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc", error);
        }
    };

    const handleNotificationClick = async (notif: NotificationItem) => {
        onClose(); 

        if (!notif.read) {
            try {
                await notificationService.markAsRead(notif.id);
                
                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                
                const remainingUnread = notifications.filter(n => !n.read && n.id !== notif.id).length;
                setUnreadCount(remainingUnread);
            } catch (error) {
                console.error("Lỗi khi đọc 1 thông báo", error);
            }
        }

        // Điều hướng chuẩn theo type 'ORDER_STATUS'
        if (notif.type === 'ORDER_STATUS') {
            const match = notif.message.match(/#(\d+)/);
            if (match && match[1]) {
                navigate(`/member/order/${match[1]}`);
            } else {
                navigate(`/member/order`); 
            }
        } else if (notif.type === 'PROMOTION') {
            navigate('/member/voucher'); 
        }
    };

    return {
        notifications,
        loading,
        handleMarkAllAsRead,
        handleNotificationClick
    };
};