import { useState, useRef, useEffect, useCallback } from 'react';
import { chatService } from '../../service/chatService';
import type { ChatProductDto } from '../../types/chat.types';


export interface Message {
    id: number;
    text: string;
    products?: ChatProductDto[];
    sender: 'user' | 'bot';
    timestamp: Date;
}

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! Mình là trợ lý ảo DLM Store. 👋\nMình có thể giúp gì cho bạn? (Ví dụ: *Tìm điện thoại 10 triệu*, *So sánh iPhone 15 và S24*...)",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const currentText = inputText;

        const newUserMsg: Message = {
            id: Date.now(),
            text: currentText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");
        setIsLoading(true);

        try {
            const responseData = await chatService.sendMessageToBot(currentText);

            const newBotMsg: Message = {
                id: Date.now() + 1,
                text: responseData.answer || "Xin lỗi, tôi chưa hiểu rõ ý bạn.",
                products: responseData.products,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newBotMsg]);

        } catch (error: any) {
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: `⚠️ Xin lỗi, đã có lỗi xảy ra: ${error.message || "Vui lòng thử lại!"}`,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return {
        isOpen, setIsOpen,
        messages,
        inputText, setInputText,
        isLoading,
        messagesEndRef,
        handleSendMessage,
        handleKeyDown
    };
};