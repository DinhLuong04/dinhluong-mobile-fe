import httpClient from "../api/axiosClient";
import { API_CONFIG } from '../config/api.config';
import type { LoginRequest, AuthData, LoginResponse } from "../types/auth.types"; 

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthData> => {
        const response = await httpClient.post<LoginResponse>(
            API_CONFIG.AUTH.LOGIN, 
            credentials
        );
        if (response.code !== 200) {
            throw new Error(response.message || 'Login failed');
        }
        const authData = response.data;
        return authData;
    },

    loginGoogle: async (idToken: string): Promise<AuthData> => {
        const response = await httpClient.post<AuthData>(
            API_CONFIG.AUTH.LOGIN_GOOGLE,
            { id_token: idToken }
        );
        
        console.log("Dữ liệu nhận được từ Google Login:", response);
        return response;
    },
     loginFacebook: async (idToken: string): Promise<AuthData> => {
        const response = await httpClient.post<AuthData>(
            API_CONFIG.AUTH.LOGIN_FACEBOOK,
            { id_token: idToken }
        );
        
        console.log("Dữ liệu nhận được từ Google Login:", response);
        return response;
    }
}