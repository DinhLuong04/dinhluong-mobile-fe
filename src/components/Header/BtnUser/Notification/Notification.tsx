import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notification.css';

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
                    
                    // LÔGIC MỚI: Đếm số thông báo chưa đọc và cập nhật ra ngoài
                    const unread = json.data.filter((n: NotificationItem) => !n.read).length;
                    setUnreadCount(unread);
                }
            } catch (error) {
                console.error("Lỗi tải thông báo", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [refreshTrigger, setUnreadCount]); // Thêm setUnreadCount vào dependency

    // Hàm đánh dấu đã đọc tất cả
    const markAllAsRead = async () => {
        const user = getLocalUser();
        if (!user || !user.token) return;

        try {
            await fetch('http://localhost:8080/api/notifications/read-all', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0); // Xóa sạch chấm đỏ
        } catch (error) {
            console.error("Lỗi khi đánh dấu đã đọc", error);
        }
    };

    // LÔGIC MỚI: Xử lý khi click vào 1 thông báo
    const handleNotificationClick = async (notif: NotificationItem) => {
        onClose(); // Đóng popup ngay lập tức để tạo cảm giác mượt mà

        // Nếu thông báo này CHƯA ĐỌC, gọi API đánh dấu đã đọc
        if (!notif.read) {
            const user = getLocalUser();
            if (user && user.token) {
                try {
                    // Gọi API update trạng thái của 1 thông báo (Bạn cần có API này ở Backend)
                    await fetch(`http://localhost:8080/api/notifications/${notif.id}/read`, {
                        method: 'PUT',
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    });
                    
                    // Cập nhật lại state danh sách thông báo (đổi màu trắng)
                    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                    
                    // Trừ đi 1 số lượng chưa đọc hiện tại
                    setUnreadCount(notifications.filter(n => !n.read).length - 1);
                } catch (error) {
                    console.error("Lỗi khi đọc 1 thông báo", error);
                }
            }
        }

        // Chuyển hướng trang
        if (notif.type === 'ORDER_STATUS') {
            const match = notif.message.match(/#(\d+)/);
            if (match && match[1]) {
                navigate(`/member/order/${match[1]}`);
            } else {
                navigate(`/member/order`); 
            }
        } else if (notif.type === 'PROMOTION') {
            navigate('/member/voucher'); // Chỉnh lại theo Route đúng của bạn
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
            <div className="notification-header" style={{ 
                padding: '12px 16px', 
                borderBottom: '1px solid #eee', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fdfdfd'
            }}>
                <strong style={{ fontSize: '16px', color: '#333', margin: 0 }}>Thông báo</strong>
                
                {/* Chỉ hiển thị nút này nếu có ít nhất 1 thông báo chưa đọc */}
                {notifications.some(n => !n.read) && (
                    <span onClick={markAllAsRead} style={{ cursor: 'pointer', color: '#cb1c22', fontSize: '13px', fontWeight: '500' }}>
                        Đánh dấu đã đọc ✓
                    </span>
                )}
            </div>

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
                                backgroundColor: notif.read ? '#fff' : '#fef2f2', // Thay đổi sang màu đỏ nhạt hợp với FPT/DinhLuongMobile
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