import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from '../types/common.types';
import type { ChatBotResponse, ChatMessageDTO, ConversationDTO } from '../types/chat.types'; 

export const chatService = {
  
    sendMessageToBot: async (messageText: string): Promise<ChatBotResponse> => {
        const response = await httpClient.post<ApiResponse<ChatBotResponse>>(
            API_CONFIG.CHAT.CHATBOT,
            { message: messageText }
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể nhận phản hồi từ trợ lý ảo');
        }
        return response.data || { answer: "Không có phản hồi từ máy chủ." };
    },

    getConversations: async (): Promise<ConversationDTO[]> => {
        const response = await httpClient.get<ConversationDTO[]>(
            API_CONFIG.CHAT.CONVERSATIONS
        );
        return response || [];
    },

    getChatHistory: async (adminId: number): Promise<ChatMessageDTO[]> => {
        const response = await httpClient.get<ChatMessageDTO[]>(
            API_CONFIG.CHAT.HISTORY(adminId)
        );
        return response || [];
    },

    markAsRead: async (senderId: number): Promise<any> => {
        const response = await httpClient.put<any>(
            API_CONFIG.CHAT.MARK_READ(senderId),
            {}
        );
        return response;
    }
};