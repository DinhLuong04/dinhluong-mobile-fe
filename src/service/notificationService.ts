// src/service/notificationService.ts
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { NotificationItem } from '../types/notification.type';
import type { ApiResponse } from '../types/common.types';

export const notificationService = {
    getAllNotifications: async (): Promise<NotificationItem[]> => {
        const response = await httpClient.get<ApiResponse<NotificationItem[]>>(
            API_CONFIG.NOTIFICATIONS.GET_ALL
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể tải danh sách thông báo');
        }
        return response.data || [];
    },

    getUnreadCount: async (): Promise<number> => {
        const response = await httpClient.get<ApiResponse<number>>(
            API_CONFIG.NOTIFICATIONS.UNREAD_COUNT
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể lấy số lượng thông báo chưa đọc');
        }
        return response.data ?? 0;
    },

    markAsRead: async (id: number): Promise<any> => {
        const response = await httpClient.put<ApiResponse<any>>(
            API_CONFIG.NOTIFICATIONS.MARK_READ(id),
            {}
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể cập nhật trạng thái thông báo');
        }
        return response.data;
    },

    markAllAsRead: async (): Promise<any> => {
        const response = await httpClient.put<ApiResponse<any>>(
            API_CONFIG.NOTIFICATIONS.MARK_ALL_READ,
            {}
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể đánh dấu tất cả đã đọc');
        }
        return response.data;
    }
};