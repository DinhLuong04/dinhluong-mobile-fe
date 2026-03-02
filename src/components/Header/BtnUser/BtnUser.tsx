import React, { useState, useEffect } from 'react';
import './BtnUser.css';
import { Link } from 'react-router-dom';
import LoginToggle from './LoginToggle/LoginToggle';
import Notification from './Notification/Notification'; // Import component Notification
import { useAuth } from '../../../contexts/AuthContext';
import { Badge, message } from 'antd';
import { Client } from '@stomp/stompjs';

const BtnUser = () => {
    const { isLogin, user } = useAuth(); 
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Xử lý mở/đóng menu (mở cái này thì đóng cái kia)
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

        // 1. Fetch số lượng chưa đọc lần đầu
        const fetchUnreadCount = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/notifications/unread-count', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const json = await res.json();
                if (json.status === 'success') {
                    setUnreadCount(json.data); 
                }
            } catch (error) {
                console.error("Lỗi đếm thông báo", error);
            }
        };
        fetchUnreadCount();
        
        // 2. Kết nối WebSocket chạy ngầm
        const wsUrl = `ws://localhost:8080/ws?token=${user.token}`;
        const stompClient = new Client({
            brokerURL: wsUrl, 
            onConnect: () => {
                stompClient.subscribe(`/user/queue/notifications`, (msg) => {
                    const newNotif = JSON.parse(msg.body);
                    
                    // Tăng số thông báo chưa đọc lên 1
                    setUnreadCount(prev => prev + 1);
                    
                    // Bắn Popup Toast ra màn hình
                    message.info({
                        content: `🔔 ${newNotif.message}`,
                        duration: 5,
                        style: { marginTop: '60px' },
                    });
                });
            }
        });

        stompClient.activate();
        return () => stompClient.deactivate();

    }, [isLogin, user]);

    return (
        !isLogin ? (
            <Link to="/login" className="inner-btn-user" title="Tài khoản">
                <i className="fa-solid fa-user"></i>
                <span className="user-text desktop-only">Đăng nhập</span>
            </Link> 
        ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                
                {/* 🔔 NÚT CHUÔNG THÔNG BÁO */}
                <div className='inner-notification' style={{ position: 'relative' }}>
                    <div onClick={handleNotifToggle} style={{ cursor: 'pointer', padding: '5px' }}>
                        <Badge count={unreadCount} overflowCount={99} size="small" offset={[-2, 2]}>
                            <i className="fa-solid fa-bell" style={{ fontSize: '20px', color: '#fff' }}></i>
                        </Badge>
                    </div>

                    {/* Khung Dropdown Thông báo */}
                    {isNotifOpen && (
                        <div style={{ position: 'absolute', top: '40px', right: '-80px', zIndex: 1000, width: '380px' }}>
                            <Notification 
                                onClose={() => setIsNotifOpen(false)} 
                                refreshTrigger={unreadCount} 
                                setUnreadCount={setUnreadCount} 
                            />
                        </div>
                    )}
                </div>

                {/* 👤 NÚT TÀI KHOẢN USER */}
                <div className="inner-btn-user" style={{ position: 'relative', margin: 0 }}> 
                    <div onClick={handleUserToggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fa-solid fa-user" style={{ fontSize: '18px' }}></i>
                        <span className="user-text-login desktop-only">
                            {user?.name || "Khách hàng"}
                        </span>
                    </div>
                    
                    {/* Khung Dropdown Menu User */}
                    {isUserMenuOpen && (
                        <div style={{ position: 'absolute', top: '40px', right: '0', zIndex: 1000 }}>
                            <LoginToggle onClose={() => setIsUserMenuOpen(false)} />
                        </div>
                    )}
                </div>

            </div>
        )
    );
};

export default BtnUser;