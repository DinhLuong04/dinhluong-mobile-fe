import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useChat } from '../../contexts/ChatContext'; 
import './LiveChat.css'; 

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'support';
}

const LiveChat: React.FC = () => {
    const { isLiveChatOpen, closeLiveChat } = useChat();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    
    const stompClientRef = useRef<Client | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    // Giả định Admin hỗ trợ luôn có ID là 1 (bạn có thể thay đổi tùy logic)
    const ADMIN_ID = 2;

    // 1. Fetch lịch sử chat
    const loadChatHistory = async () => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:8080/api/chat/history/${ADMIN_ID}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (response.ok) {
                const history = await response.json();
                const formattedMessages = history.map((msg: any) => ({
                    id: msg.id,
                    text: msg.message,
                    sender: msg.senderId === user.id ? 'me' : 'support'
                }));
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error("Lỗi lấy lịch sử chat:", error);
        }
    };

   const connectWebSocket = () => {
        if (!user) return; 

        // TRUYỀN TOKEN TRỰC TIẾP VÀO URL THAY VÌ HEADERS
        const wsUrl = `ws://localhost:8080/ws?token=${user.token}`;

        const client = new Client({
            brokerURL: wsUrl, 
            // XÓA phần connectHeaders đi vì không cần thiết nữa
            onConnect: () => {
                setIsConnected(true);
                
                // Đăng ký nhận tin nhắn
               client.subscribe(`/user/queue/messages`, (message) => {
    const body = JSON.parse(message.body);
    setMessages(prev => [...prev, { 
        id: body.id, 
        text: body.message, 
        sender: body.senderId === user.id ? 'me' : 'support' // Thêm check để chắc chắn
    }]);
});
            },
            onDisconnect: () => setIsConnected(false)
        });
        
        client.activate();
        stompClientRef.current = client;
    };

    const handleSendMessage = () => {
        if (!inputText.trim() || !stompClientRef.current || !isConnected || !user) return;

        // Định dạng payload gửi lên Backend
        const chatMessage = {
            senderId: user.id,
            receiverId: ADMIN_ID,
            message: inputText
        };

        stompClientRef.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(chatMessage)
        });

        // Hiển thị ngay lên màn hình của mình
        setMessages(prev => [...prev, { id: Date.now(), text: inputText, sender: 'me' }]);
        setInputText("");
    };

    // 3. Khởi tạo khi mở khung chat
    useEffect(() => {
        if (isLiveChatOpen && user) {
            loadChatHistory();
            if (!isConnected) connectWebSocket(); 
        }
        
        return () => {
            if (!isLiveChatOpen && stompClientRef.current) {
                stompClientRef.current.deactivate();
                setIsConnected(false);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLiveChatOpen]);

    // Auto scroll
    useEffect(() => {
        if (isLiveChatOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLiveChatOpen]);

    // Nếu chưa đăng nhập, hiển thị thông báo
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
            {/* HTML Phần Header, Body, Footer giữ nguyên như cũ của bạn */}
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
                {messages.length === 0 && <p style={{textAlign: 'center', color: '#999', marginTop: 20}}>Bắt đầu cuộc trò chuyện...</p>}
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
                <button onClick={handleSendMessage} disabled={!isConnected} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: isConnected ? '#0D8ABC' : '#ccc' }}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
</button>
            </div>
        </div>
    );
};

export default LiveChat;