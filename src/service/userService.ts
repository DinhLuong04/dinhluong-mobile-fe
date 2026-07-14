// src/services/user.service.ts
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from '../types/common.types';
import type { 
    UserProfileResponse, 
    ChangePasswordRequest, 
    UserProfileStatsResponse 
} from '../types/user.types';

export const userService = {
 
    getProfile: async (): Promise<ApiResponse<UserProfileResponse>> => {
        return httpClient.get<ApiResponse<UserProfileResponse>>(
            API_CONFIG.USER.PROFILE
        );
    },


    updateProfile: async (formData: FormData): Promise<ApiResponse<UserProfileResponse>> => {
        return httpClient.put<ApiResponse<UserProfileResponse>>(
            API_CONFIG.USER.PROFILE,
            formData
        );
    },

    changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<string>> => {
        return httpClient.put<ApiResponse<string>>(
            API_CONFIG.USER.CHANGE_PASSWORD,
            data
        );
    },

    getProfileStats: async (): Promise<ApiResponse<UserProfileStatsResponse>> => {
        return httpClient.get<ApiResponse<UserProfileStatsResponse>>(
            API_CONFIG.USER.PROFILE_STATS
        );
    }
};