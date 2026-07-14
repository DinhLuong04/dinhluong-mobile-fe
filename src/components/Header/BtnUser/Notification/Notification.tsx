import React from 'react';
import './Notification.css';
import { useNotification } from './useNotification';

interface NotificationProps {
    onClose: () => void;
    refreshTrigger: number;
    setUnreadCount: (count: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ onClose, refreshTrigger, setUnreadCount }) => {
    const {
        notifications,
        loading,
        handleMarkAllAsRead,
        handleNotificationClick
    } = useNotification(onClose, refreshTrigger, setUnreadCount);

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
                
                {notifications.some(n => !n.read) && (
                    <span onClick={handleMarkAllAsRead} style={{ cursor: 'pointer', color: '#cb1c22', fontSize: '13px', fontWeight: '500' }}>
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
                                backgroundColor: notif.read ? '#fff' : '#fef2f2',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '24px' }}>
                                {notif.type === 'ORDER' ? '📦' : notif.type === 'PROMOTION' ? '🎉' : '💬'}
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