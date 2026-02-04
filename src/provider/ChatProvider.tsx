import React, { useState, type ReactNode } from 'react';
import { ChatContext } from '../contexts/ChatContext'; // Import Context từ file trên

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);

    const openBot = () => {
        setIsBotOpen(true);
        setIsLiveChatOpen(false); // Đóng Live chat để không bị chồng chéo
    };

    const closeBot = () => {
        setIsBotOpen(false);
    };

    const openLiveChat = () => {
        setIsLiveChatOpen(true);
        setIsBotOpen(false); // Đóng Bot để tập trung chat với nhân viên
    };

    const closeLiveChat = () => {
        setIsLiveChatOpen(false);
    };

    // Giá trị sẽ cung cấp cho toàn bộ ứng dụng
    const value = {
        isBotOpen,
        isLiveChatOpen,
        openBot,
        closeBot,
        openLiveChat,
        closeLiveChat
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};