
export type NotificationType = 'ORDER_STATUS' | 'ORDER' | 'SYSTEM' | 'PROMOTION' | 'PAYMENT' | 'CHAT';

export interface NotificationItem {
    id: number;
    userId: number;
    title?: string;
    message: string;          
    type: NotificationType;   
    read: boolean;            
    createdAt: string;        
    referenceId?: number;
}