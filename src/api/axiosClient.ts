// src/api/httpClient.ts

import { API_CONFIG } from '../config/api.config';

// Định nghĩa kiểu cho lỗi API (để TypeScript hiểu object lỗi có field message)
interface ApiError {
    message?: string;
    [key: string]: unknown;
}
export interface RequestConfig {
    params?: any;
    headers?: Record<string, string>;
    paramsSerializer?: (params: any) => string; // Hàm xử lý query string tùy chỉnh
}
const httpClient = {
    // TResponse: Kiểu dữ liệu nhận về
    // TBody: Kiểu dữ liệu gửi đi (mặc định là unknown nếu không truyền)
    post: async <TResponse, TBody = unknown>(endpoint: string, data: TBody): Promise<TResponse> => {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Lấy dữ liệu JSON thô
        const responseData = await response.json();

        // Xử lý lỗi tập trung
        if (!response.ok) {
            // Ép kiểu responseData về ApiError để lấy message an toàn
            const errorData = responseData as ApiError;
            throw new Error(errorData.message || 'Something went wrong');
        }

        // Ép kiểu về TResponse trước khi trả về
        return responseData as TResponse;
    },

    get: async <TResponse>(endpoint: string, config?: RequestConfig): Promise<TResponse> => {
        let url = `${API_CONFIG.BASE_URL}${endpoint}`;

        // Xử lý Query Params
        if (config?.params) {
            let queryString = "";

            // A. Nếu có serializer tùy chỉnh (dùng cho trường hợp mảng brands=A&brands=B)
            if (config.paramsSerializer) {
                queryString = config.paramsSerializer(config.params);
            } 
            // B. Fallback: Dùng URLSearchParams mặc định (cho các case đơn giản)
            else {
                const validParams: Record<string, string> = {};
                Object.keys(config.params).forEach(key => {
                    const value = config.params[key];
                    if (value !== undefined && value !== null) {
                        validParams[key] = String(value);
                    }
                });
                queryString = new URLSearchParams(validParams).toString();
            }

            if (queryString) {
                url += `?${queryString}`;
            }
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers, // Gộp headers nếu có
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorData = responseData as ApiError;
            throw new Error(errorData.message || 'Get data failed');
        }

        return responseData as TResponse;
    }
};

export default httpClient;