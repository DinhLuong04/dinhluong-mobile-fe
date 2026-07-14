// src/components/Header/BtnUser/useBtnUser.ts
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { notificationService } from '../../../service/notificationService';
import { createNotificationSocket } from '../../../service/websocketService';

export const useBtnUser = (isLogin: boolean, user: any) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleUserToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsNotifOpen(false); 
    };

    const handleNotifToggle = () => {
        setIsNotifOpen(!isNotifOpen);
        setIsUserMenuOpen(false); 
    };

    useEffect(() => {
        if (!isLogin || !user?.token) return;

        let isMounted = true; 

        const fetchUnreadCount = async () => {
            try {
                const count = await notificationService.getUnreadCount();
                if (isMounted) {
                    setUnreadCount(count); 
                }
            } catch (error) {
                console.error("Lỗi đếm thông báo", error);
            }
        };

        fetchUnreadCount();
        const stompClient = createNotificationSocket(user.token, (newNotif) => {
            if (isMounted) {
                setUnreadCount(prev => prev + 1);
                message.info({
                    content: `🔔 ${newNotif.message}`,
                    duration: 5,
                    style: { marginTop: '60px' },
                });
            }
        });

        stompClient.activate();

        return () => {
            isMounted = false;
            stompClient.deactivate();
        };

    }, [isLogin, user?.token]);

    return {
        isUserMenuOpen, setIsUserMenuOpen,
        isNotifOpen, setIsNotifOpen,
        unreadCount, setUnreadCount,
        handleUserToggle, handleNotifToggle
    };
};