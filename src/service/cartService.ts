
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from '../types/common.types';


export interface AddToCartPayload {
    productVariantId: number | string;
    quantity: number;
    comboVariantIds?: (number | string)[];
    userId?: number | string;
}

const getCurrentUserId = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        return user.id || null;
    } catch {
        return null;
    }
};

export const cartService = {
    addToCart: async (payload: AddToCartPayload): Promise<any> => {
        const userId = getCurrentUserId();
        
        if (!userId) {
            throw new Error('Vui lòng đăng nhập để thực hiện chức năng này!');
        }

        const requestBody = {
            ...payload,
            userId: userId 
        };

        const response = await httpClient.post<ApiResponse<any>>(
            API_CONFIG.CART.ADD(userId),
            requestBody
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Lỗi khi thêm vào giỏ hàng');
        }

        return response.data;
    },

    getCart: async (): Promise<any> => {
        const userId = getCurrentUserId();
        if (!userId) {
            throw new Error('Chưa đăng nhập');
        }

        const response = await httpClient.get<ApiResponse<any>>(
           API_CONFIG.CART.GET_CART(userId)
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Lỗi lấy dữ liệu giỏ hàng');
        }

        return response.data;
    },

    /**
     * Cập nhật số lượng sản phẩm
     */
    updateQuantity: async (cartItemId: number | string, quantity: number): Promise<any> => {
        const response = await httpClient.put<ApiResponse<any>>(
            `${API_CONFIG.CART.UPDATE(cartItemId)}?quantity=${quantity}`,
            {}
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Lỗi cập nhật số lượng');
        }

        return response.data;
    },

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    removeCartItem: async (cartItemId: number | string): Promise<any> => {
        const response = await httpClient.delete<ApiResponse<any>>(
            API_CONFIG.CART.REMOVE(cartItemId)
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Lỗi xóa sản phẩm');
        }

        return response.data;
    }
};