import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

// Thêm prop setUnreadCount để cập nhật lại số trên cái chuông
interface NotificationProps {
    onClose: () => void;
    refreshTrigger: number;
    setUnreadCount: (count: number) => void;
}

interface NotificationItem {
    id: number;
    type: 'ORDER_STATUS' | 'PROMOTION' | 'CHAT';
    message: string;
    read: boolean;
    createdAt: string;
}

const Notification: React.FC<NotificationProps> = ({ onClose, refreshTrigger, setUnreadCount }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getLocalUser = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    // Chỉ Fetch danh sách từ API
    useEffect(() => {
        const user = getLocalUser();
        if (!user || !user.token) {
            setLoading(false);
            return;
        }

        const fetchNotifications = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/notifications', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const json = await res.json();
                if (json.status === 'success') {
                    setNotifications(json.data);
                }
            } catch (error) {
                console.error("Lỗi tải thông báo", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [refreshTrigger]); // Load lại khi có trigger mới từ component cha

    // Hàm đánh dấu đã đọc tất cả
    const markAllAsRead = async () => {
        const user = getLocalUser();
        if (!user || !user.token) return;

        try {
            await fetch('http://localhost:8080/api/notifications/read-all', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            // 1. Chuyển hết thông báo hiện tại thành màu trắng (đã đọc)
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            // 2. Đưa số trên cái chuông (ở component cha) về 0
            setUnreadCount(0);
        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc", error);
        }
    };

    const handleNotificationClick = (notif: NotificationItem) => {
        onClose(); 
        if (notif.type === 'ORDER_STATUS') {
            const match = notif.message.match(/#(\d+)/);
            if (match && match[1]) {
                navigate(`/member/order/${match[1]}`);
            } else {
                navigate(`/member/order`); 
            }
        } else if (notif.type === 'PROMOTION') {
            navigate('/vouchers'); 
        }
    };

    return (
        <div className="notification-container" style={{
            backgroundColor: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)', 
            overflow: 'hidden', 
            border: '1px solid #e0e0e0',
            textAlign: 'left'
        }}>
            {/* Header thông báo */}
            <div className="notification-header" style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fdfdfd'
            }}>
                <strong style={{ fontSize: '16px', color: '#333', margin: 0 }}>Thông báo</strong>
                <span onClick={markAllAsRead} style={{ cursor: 'pointer', color: '#007bff', fontSize: '13px' }}>
                    Đánh dấu đã đọc tất cả ✓
                </span>
            </div>

            {/* Danh sách thông báo */}
            <div className="notification-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>Đang tải thông báo...</div>
                ) : notifications.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                        <p style={{ color: '#888', margin: 0 }}>Chưa có thông báo nào.</p>
                    </div>
                ) : (
                    notifications.map(notif => (
                        <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}
                            onClick={() => handleNotificationClick(notif)}
                            style={{ 
                                padding: '14px 16px', 
                                borderBottom: '1px solid #f0f0f0', 
                                display: 'flex', 
                                gap: '15px',
                                backgroundColor: notif.read ? '#fff' : '#e6f4ff', // Xanh nhạt nếu chưa đọc
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '24px' }}>
                                {notif.type === 'ORDER_STATUS' ? '📦' : notif.type === 'PROMOTION' ? '🎉' : '💬'}
                            </div>
                            <div>
                                <p style={{ margin: '0 0 6px 0', fontSize: '14px', lineHeight: '1.4', fontWeight: notif.read ? '400' : '600', color: '#333' }}>
                                    {notif.message}
                                </p>
                                <span style={{ fontSize: '12px', color: '#888' }}>
                                    {new Date(notif.createdAt).toLocaleString('vi-VN')}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;