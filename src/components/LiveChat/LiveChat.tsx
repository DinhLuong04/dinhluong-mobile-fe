// src/components/LiveChat/LiveChat.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useChat } from '../../contexts/ChatContext'; // Import hook
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

    // ==========================================================
    // 1. KHAI BÁO HÀM TRƯỚC (Move function definition up here)
    // ==========================================================
    const connectWebSocket = () => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // Đường dẫn Backend Spring Boot
            onConnect: () => {
                setIsConnected(true);
                setMessages(prev => [...prev, { id: Date.now(), text: "Đã kết nối với nhân viên!", sender: 'support' }]);
                
                client.subscribe('/topic/public', (message) => {
                    const body = JSON.parse(message.body);
                    if (body.sender !== 'guest-123') { // Lọc tin nhắn của chính mình
                        setMessages(prev => [...prev, { id: Date.now(), text: body.content, sender: 'support' }]);
                    }
                });
            },
            onDisconnect: () => setIsConnected(false)
        });
        client.activate();
        stompClientRef.current = client;
    };

    const handleSendMessage = () => {
        if (!inputText.trim() || !stompClientRef.current || !isConnected) return;

        stompClientRef.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify({ sender: 'guest-123', content: inputText, type: 'CHAT' })
        });

        setMessages(prev => [...prev, { id: Date.now(), text: inputText, sender: 'me' }]);
        setInputText("");
    };

    // ==========================================================
    // 2. SAU ĐÓ MỚI GỌI TRONG USEEFFECT
    // ==========================================================

    // Tự động kết nối khi mở cửa sổ LiveChat
    useEffect(() => {
        if (isLiveChatOpen && !isConnected) {
            connectWebSocket(); // Bây giờ hàm này đã được định nghĩa ở trên, không còn lỗi
        }
        return () => {
            // Ngắt kết nối khi đóng cửa sổ
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
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-row ${msg.sender}`}>
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
                <button onClick={handleSendMessage} disabled={!isConnected}>➤</button>
            </div>
        </div>
    );
};

export default LiveChat;