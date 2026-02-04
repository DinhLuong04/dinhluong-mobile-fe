import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import './ContactFloating.css';

const ContactFloating: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { openLiveChat } = useChat(); // Lấy hàm mở LiveChat từ context

    return (
        <div className="contact-floating-wrapper">
            <div className={`contact-options ${isExpanded ? 'show' : ''}`}>
                
                {/* 1. Nút Chat Live (Click vào sẽ mở box Xanh) */}
                <div className="contact-item chat-live" onClick={() => {
                    openLiveChat();
                    setIsExpanded(false);
                }}>
                    <span className="label">Chat với nhân viên</span>
                    <div className="icon-circle" style={{background: '#0066ff', color: 'white'}}>💬</div>
                </div>

                {/* 2. Nút Gọi */}
                <a href="tel:19002091" className="contact-item">
                    <span className="label">Gọi 1900.2091</span>
                    <div className="icon-circle" style={{background: '#4caf50', color: 'white'}}>📞</div>
                </a>

                {/* 3. Nút Zalo */}
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="contact-item">
                    <span className="label">Zalo</span>
                    <div className="icon-circle" style={{background: 'white', color: '#0068ff'}}>Z</div>
                </a>
            </div>

            {/* Nút Chính để mở menu */}
            <button 
                className={`contact-main-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className="contact-tooltip">Liên hệ</span>
                {isExpanded ? '✕' : '📞'}
            </button>
        </div>
    );
};

export default ContactFloating;