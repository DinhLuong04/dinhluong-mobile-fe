// src/services/auth.service.ts
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from '../types/common.types';
import type { 
    LoginRequest, 
    RegisterRequest, 
    LoginResponse, 
    Oauth2LoginRequest,
    ResetPasswordRequest,
    TokenRefreshRequest
} from '../types/auth.types';

export const authService = {
    register: async (registerData: RegisterRequest): Promise<ApiResponse<unknown>> => {
        return httpClient.post<ApiResponse<unknown>>(
            API_CONFIG.AUTH.REGISTER, 
            registerData
        );
    },

    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await httpClient.post<ApiResponse<LoginResponse>>(
            API_CONFIG.AUTH.LOGIN, 
            credentials
        );
        return response.data;
    },

    loginGoogle: async (idToken: string): Promise<LoginResponse> => {
        const payload: Oauth2LoginRequest = { id_token: idToken };
        const response = await httpClient.post<ApiResponse<LoginResponse>>(
            API_CONFIG.AUTH.LOGIN_GOOGLE,
            payload
        );
        return response.data;
    },

    loginFacebook: async (idToken: string): Promise<LoginResponse> => {
        const payload: Oauth2LoginRequest = { id_token: idToken };
        const response = await httpClient.post<ApiResponse<LoginResponse>>(
            API_CONFIG.AUTH.LOGIN_FACEBOOK,
            payload
        );
        return response.data;
    },

    forgotPassword: async (email: string): Promise<string> => {
        const response = await httpClient.post<ApiResponse<unknown>>(
            API_CONFIG.AUTH.FORGOT_PASSWORD, 
            null, 
            { params: { email } }
        );
        return response.message || "Đã gửi OTP";
    },

    resetPassword: async (data: ResetPasswordRequest): Promise<string> => {
        const response = await httpClient.post<ApiResponse<unknown>>(
            API_CONFIG.AUTH.RESET_PASSWORD, 
            data
        );
        return response.message || "Đổi mật khẩu thành công";
    },

    logout: async (refreshToken: string): Promise<ApiResponse<unknown>> => {
        const payload: TokenRefreshRequest = { refreshToken };
        return httpClient.post<ApiResponse<unknown>>(
            API_CONFIG.AUTH.LOGOUT,
            payload
        );
    },
    resendVerification: async (email: string): Promise<ApiResponse<unknown>> => {
        return httpClient.post<ApiResponse<unknown>>(
            API_CONFIG.AUTH.RESEND_VERIFICATION,
            null,
            { params: { email } }
        );
    },

    verifyEmail: async (code: string): Promise<ApiResponse<unknown>> => {
        return httpClient.get<ApiResponse<unknown>>(
            API_CONFIG.AUTH.VERIFY_EMAIL,
            { params: { code } }
        );
    }
};