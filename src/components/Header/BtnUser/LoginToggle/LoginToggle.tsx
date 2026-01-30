import React from "react";
import "./LoginToggle.css";
import Notification from "../Notification/Notification";

// Định nghĩa kiểu dữ liệu cho props
interface LoginToggleProps {
    onClose: () => void;
}

const LoginToggle: React.FC<LoginToggleProps> = ({ onClose }) => {
    return (
        // e.stopPropagation() giúp ngăn việc click vào menu mà lại kích hoạt sự kiện click của BtnUser
        <div className="login-toggle-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Link Thông tin cá nhân */}
            <a href="/Member" className="menu-item-link">
                <div className="menu-item-left">
                    <img 
                        src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/smember230625.png" 
                        alt="Smember"
                        className="menu-item-icon"
                    />
                    <span className="menu-item-text">Truy cập member</span>
                </div>
                
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="menu-item-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="m184 112 144 144-144 144" />
                </svg>
            </a>

            <div className="toggle-separator"></div>
            
            {/* Truyền hàm onClose xuống Notification */}
            <Notification onClose={onClose} />
        </div>
    );
};

export default LoginToggle;