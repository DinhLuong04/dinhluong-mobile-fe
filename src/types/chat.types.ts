export interface ChatBotRequest {
    message?: string;
}

export interface ChatProductDto {
    id?: number;
    name?: string;
    slug?: string;
    image?: string;
    price?: number;
    originalPrice?: number;
    discountLabel?: string;
    configSummary?: string;
}

export interface ChatBotResponse {
    answer?: string;
    products?: ChatProductDto[];
}

export interface ChatMessageDTO {
    id?: number;
    senderId?: number;
    receiverId?: number;
    message?: string;
    sentAt?: string;
}

export interface ConversationDTO {
    userId?: number;
    userName?: string;
    userAvatar?: string;
    lastMessage?: string;
    sentAt?: string;
    unreadCount?: number;
    isRead?: boolean;
}