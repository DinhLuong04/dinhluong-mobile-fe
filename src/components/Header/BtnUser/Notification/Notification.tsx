import React from 'react';
import './Notification.css';

// Định nghĩa props
interface NotificationProps {
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ onClose }) => {
    return (
        <div className="notification-container">
            <div className="notification-body-wrapper">
                {/* Header */}
                <div className="notification-header">
                    <p className="notification-title">Thông báo</p>
                    <div className="notification-status">
                        Bạn đã đọc tất cả thông báo
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"></path>
                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"></path>
                        </svg>
                    </div>
                </div>

                {/* Content List */}
                <div className="notification-list">
                    <div className="notification-empty">
                        <img 
                            alt="Không có thông báo" 
                            src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/empty230625.png" 
                            className="empty-img"
                        />
                        <div className="empty-text-wrapper">
                            <p className="empty-title">Ở đây hơi trống trải.</p>
                            <p className="empty-desc">DinhLuongMobile sẽ gửi cho bạn những thông báo mới nhất tại đây nhé!</p>
                        </div>
                    </div>
                </div>

                {/* Footer Button - Gắn sự kiện onClick vào đây */}
                <button className="notification-close-btn" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default Notification;