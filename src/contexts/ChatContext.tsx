import { createContext, useContext } from 'react';

// Định nghĩa kiểu dữ liệu cho Context
export interface ChatContextType {
    isBotOpen: boolean;
    isLiveChatOpen: boolean;
    openBot: () => void;
    closeBot: () => void;
    openLiveChat: () => void;
    closeLiveChat: () => void;
}

// 1. Tạo Context
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

// 2. Tạo Hook useChat để các component con sử dụng
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};