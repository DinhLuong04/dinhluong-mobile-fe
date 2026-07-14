// src/service/orderService.ts
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { PlaceOrderRequest } from '../types/order.types';
import type { ApiResponse } from '../types/common.types';

export const orderService = {
  
    placeOrder: async (payload: PlaceOrderRequest): Promise<any> => {
        
        const response = await httpClient.post<any>(
            API_CONFIG.ORDERS.PLACE_ORDER,
            payload
        );
        if (response.code !== 200 && response.status !== 'success') {
            throw response; 
        }
        return response; 
    },

    getMyOrders: async (status?: string): Promise<any> => {
        const response = await httpClient.get<ApiResponse<any>>(
            API_CONFIG.ORDERS.MY_ORDERS,
            { params: { status } } 
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể tải danh sách đơn hàng');
        }

        return response.data;
    },

    getRecentOrders: async (): Promise<any> => {
        const response = await httpClient.get<ApiResponse<any>>(
            API_CONFIG.ORDERS.RECENT_ORDERS
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể tải đơn hàng gần đây');
        }

        return response.data;
    },

    getOrderDetail: async (orderId: number): Promise<any> => {
        const response = await httpClient.get<ApiResponse<any>>(
            API_CONFIG.ORDERS.GET_DETAIL(orderId)
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể tải chi tiết đơn hàng');
        }

        return response.data;
    },

    cancelOrder: async (orderId: number, reason?: string): Promise<any> => {
        const response = await httpClient.put<ApiResponse<any>>(
            API_CONFIG.ORDERS.CANCEL(orderId),
            { reason }
        );
        if (response.code !== 200) throw new Error(response.message || 'Lỗi khi hủy đơn hàng');
        return response.data;
    },
    
    verifyVnpay: async (queryString: string): Promise<any> => {
       const response = await httpClient.get<ApiResponse<any>>(
            `${API_CONFIG.ORDERS.VNPAY_RETURN}${queryString}`
        );

        if (response.code !== 200) {
            throw response;
        }

        return response.data;
    }
};