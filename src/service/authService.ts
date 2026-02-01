
import httpClient from "../api/axiosClient";
import { API_CONFIG } from '../config/api.config';
import type { LoginRequest, AuthData, LoginResponse, RegisterRequest } from "../types/auth.types"; 

export const authService = {
    register: async (registerData: RegisterRequest): Promise<any> => {
        const response = await httpClient.post<any>(
            API_CONFIG.AUTH.REGISTER, 
            registerData
        );

        if (response.code && response.code !== 200) {
            throw new Error(response.message || 'Đăng ký thất bại');
        }

        return response;
    }
    ,
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
        
        return response;
    },
     loginFacebook: async (idToken: string): Promise<AuthData> => {
        const response = await httpClient.post<AuthData>(
            API_CONFIG.AUTH.LOGIN_FACEBOOK,
            { id_token: idToken }
        );
        return response;
    },
    forgotPassword: async (email: string): Promise<string> => {
        const url = `${API_CONFIG.AUTH.FORGOT_PASSWORD}?email=${email}`;
        const response = await httpClient.post<any>(
             url,
             null
        );
        return response.message || "Đã gửi OTP";
    },

    resetPassword: async (data: any): Promise<string> => {
        
        const response = await httpClient.post<any>(
             API_CONFIG.AUTH.RESET_PASSWORD, 
            data
        );
        return response.message || "Đổi mật khẩu thành công";
    }
}