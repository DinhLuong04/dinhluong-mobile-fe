import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { chatService } from '../../service/chatService';
import { createChatSocket } from '../../service/websocketService';
import { API_CONFIG } from '../../config/api.config';

export interface Message {
    id: number;
    text: string;
    sender: 'me' | 'support';
}

export const useLiveChat = () => {
    const { isLiveChatOpen, closeLiveChat } = useChat();
    const { user } = useAuth(); 
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    
    const stompClientRef = useRef<Client | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const ADMIN_ID = 2;

    const userId = user?.id;
    const userToken = user?.token;

    useEffect(() => {
        if (!isLiveChatOpen || !userToken) {
            return;
        }
        let isMounted = true;

        const fetchHistory = async () => {
            try {
                const history = await chatService.getChatHistory(ADMIN_ID);
                if (isMounted) {
                    const formattedMessages: Message[] = history.map((msg, index) => ({
                        id: msg.id ?? Date.now() + index, 
                        text: msg.message ?? "",          
                        sender: msg.senderId === userId ? 'me' : 'support'
                    }));
                    setMessages(formattedMessages);
                }
            } catch (error) {
                console.error("Lỗi lấy lịch sử chat:", error);
            }
        };
        fetchHistory();
        if (!stompClientRef.current) {
            const client = createChatSocket(
                userToken,
                (newMsg) => {
                    if (isMounted) {
                        setMessages(prev => [...prev, { 
                            id: newMsg.id ?? Date.now(), 
                            text: newMsg.message ?? "", 
                            sender: newMsg.senderId === userId ? 'me' : 'support'
                        }]);
                    }
                },
                (status) => {
                    if (isMounted) setIsConnected(status);
                }
            );
            
            client.activate();
            stompClientRef.current = client;
        }
        
        return () => {
            isMounted = false;
            setIsConnected(false); 
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                stompClientRef.current = null;
            }
        };
    }, [isLiveChatOpen, userToken, userId]);

    useEffect(() => {
        if (isLiveChatOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLiveChatOpen]);

    const handleSendMessage = () => {
        if (!inputText.trim() || !stompClientRef.current || !isConnected || !userId) return;

        const chatMessage = {
            senderId: userId,
            receiverId: ADMIN_ID,
            message: inputText
        };

        stompClientRef.current.publish({
            destination: API_CONFIG.WS.TOPICS.SEND_MESSAGE,
            body: JSON.stringify(chatMessage)
        });

        setMessages(prev => [...prev, { id: Date.now(), text: inputText, sender: 'me' }]);
        setInputText("");
    };

    return {
        user,
        isLiveChatOpen, closeLiveChat,
        messages, messagesEndRef,
        inputText, setInputText,
        isConnected,
        handleSendMessage
    };
};