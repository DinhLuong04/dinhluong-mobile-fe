import React from 'react';
import './LiveChat.css'; 
import { useLiveChat } from './useLiveChat';

const LiveChat: React.FC = () => {
    const {
        user,
        isLiveChatOpen, closeLiveChat,
        messages, messagesEndRef,
        inputText, setInputText,
        isConnected,
        handleSendMessage
    } = useLiveChat();

    if (isLiveChatOpen && !user) {
        return (
            <div className={`livechat-window open`}>
                 <div className="livechat-header">
                    <h4>Hỗ trợ trực tuyến</h4>
                    <button className="close-btn" onClick={closeLiveChat}>✕</button>
                </div>
                <div className="livechat-body" style={{ padding: '20px', textAlign: 'center' }}>
                    Vui lòng đăng nhập để chat với nhân viên hỗ trợ!
                </div>
            </div>
        )
    }

    return (
        <div className={`livechat-window ${isLiveChatOpen ? 'open' : ''}`}>
            <div className="livechat-header">
                <div className="title">
                    <span className="avatar">👨‍💻</span>
                    <div>
                        <h4>Hỗ trợ trực tuyến</h4>
                        <small>{isConnected ? '● Online' : '○ Connecting...'}</small>
                    </div>
                </div>
                <button className="close-btn" onClick={closeLiveChat}>✕</button>
            </div>

            <div className="livechat-body">
                {messages.length === 0 && (
                    <p style={{textAlign: 'center', color: '#999', marginTop: 20}}>
                        Bắt đầu cuộc trò chuyện...
                    </p>
                )}
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-row ${msg.sender}`}>
                        <div className="bubble">{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="livechat-footer">
                <input 
                    value={inputText} 
                    onChange={e => setInputText(e.target.value)} 
                    placeholder="Chat với nhân viên..." 
                    disabled={!isConnected}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                    onClick={handleSendMessage} 
                    disabled={!isConnected || !inputText.trim()} 
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: isConnected && inputText.trim() ? '#0D8ABC' : '#ccc' }}>
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default LiveChat;