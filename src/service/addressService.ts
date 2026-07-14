import { type Address} from '../types/address.types'    
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from '../types/common.types';

export const addressService = {
    getAddresses: async (): Promise<ApiResponse<Address[]>> => {
        return httpClient.get<ApiResponse<Address[]>>(
            API_CONFIG.ADDRESSES.BASE
        );
    },

    addAddress: async (data: any): Promise<ApiResponse<Address>> => {
        return httpClient.post<ApiResponse<Address>>(
            API_CONFIG.ADDRESSES.BASE,
            data
        );
    },

    updateAddress: async (id: number, data: any): Promise<ApiResponse<Address>> => {
        return httpClient.put<ApiResponse<Address>>(
            API_CONFIG.ADDRESSES.UPDATE(id),
            data
        );
    },

    setDefault: async (id: number): Promise<ApiResponse<any>> => {
        return httpClient.put<ApiResponse<any>>(
            API_CONFIG.ADDRESSES.SET_DEFAULT(id),
            {}
        );
    },

    deleteAddress: async (id: number): Promise<ApiResponse<any>> => {
        return httpClient.delete<ApiResponse<any>>(
            API_CONFIG.ADDRESSES.DELETE(id)
        );
    }
};