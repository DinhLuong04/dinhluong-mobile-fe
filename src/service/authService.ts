import httpClient from "../api/axiosClient";
// Xóa import thừa: import Login from "../pages/Login"; 
import { API_CONFIG } from '../config/api.config';
// Import đúng các type cần thiết
import type { LoginRequest, AuthData, LoginResponse } from "../types/auth.types"; 

export const authService = {
    // 1. input là credentials, output là AuthData (User info)
    login: async (credentials: LoginRequest): Promise<AuthData> => {
        
        // 2. Generic Type phải là LoginResponse (Cấu trúc chứa code, message, data...)
        // LoginResponse = ApiResponse<AuthData>
        const response = await httpClient.post<LoginResponse>(
            API_CONFIG.AUTH.LOGIN, 
            credentials
        );

        // 3. SỬA LỖI LOGIC Ở ĐÂY: Phải check response.code
        if (response.code !== 200) {
            throw new Error(response.message || 'Login failed');
        }

        // 4. Lấy dữ liệu thật sự từ response.data
        const authData = response.data;

        if (authData.token) {
            localStorage.setItem('accessToken', authData.token);
            localStorage.setItem('userData', JSON.stringify({
                name: authData.name,
                avatar: authData.avatar,
                id: authData.id
            }));
        }

        return authData;
    }
}