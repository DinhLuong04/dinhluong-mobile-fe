import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { Voucher, UserVoucher } from '../types/voucher.types'
import type { ApiResponse } from '../types/common.types';

export const voucherService = {

    getAvailableVouchers: async (): Promise<Voucher[]> => {
        const response = await httpClient.get<ApiResponse<Voucher[]>>(
            API_CONFIG.VOUCHERS.AVAILABLE
        );
        if (response.code !== 200) throw new Error(response.message || 'Không thể tải danh sách voucher');
        return response.data || [];
    },

    getMyVouchers: async (): Promise<UserVoucher[]> => {
        const response = await httpClient.get<ApiResponse<UserVoucher[]>>(
            API_CONFIG.VOUCHERS.MY_VOUCHERS
        );
        if (response.code !== 200) throw new Error(response.message || 'Không thể tải ví voucher');
        return response.data || [];
    },

    collectVoucher: async (voucherId: number): Promise<any> => {
        const response = await httpClient.post<ApiResponse<any>>(
            API_CONFIG.VOUCHERS.COLLECT(voucherId),
            {}
        );
        if (response.code !== 200) {
            throw response; 
        }
        return response;
    }
};