import { Client } from '@stomp/stompjs';
import { API_CONFIG } from '../config/api.config';

export const createNotificationSocket = (token: string, onMessageReceived: (message: any) => void) => {
    const wsUrl = `${API_CONFIG.WS.BASE_URL}?token=${token}`;
    
    const stompClient = new Client({
        brokerURL: wsUrl,
        reconnectDelay: 5000,
        onConnect: () => {
            stompClient.subscribe(API_CONFIG.WS.TOPICS.NOTIFICATIONS, (msg) => {
                const newNotif = JSON.parse(msg.body);
                onMessageReceived(newNotif);
            });
        },
        onStompError: (frame) => {
            console.error('Lỗi WebSocket Stomp:', frame.headers['message']);
        }
    });

    return stompClient;
};

export const createChatSocket = (
    token: string, 
    onMessageReceived: (message: any) => void, 
    onConnectStatusChange: (status: boolean) => void
) => {
    const wsUrl = `${API_CONFIG.WS.BASE_URL}?token=${token}`;
    
    const stompClient = new Client({
        brokerURL: wsUrl,
        reconnectDelay: 5000,
        onConnect: () => {
            onConnectStatusChange(true);
            stompClient.subscribe(API_CONFIG.WS.TOPICS.CHAT_MESSAGES, (msg) => {
                const newMsg = JSON.parse(msg.body);
                onMessageReceived(newMsg);
            });
        },
        onDisconnect: () => {
            onConnectStatusChange(false);
        },
        onStompError: (frame) => {
            console.error('Lỗi WebSocket Stomp (Chat):', frame.headers['message']);
        }
    });

    return stompClient;
};