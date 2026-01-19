// src/api/httpClient.ts

import { API_CONFIG } from '../config/api.config';
type SearchParams = Record<string, string | number | boolean | undefined>;
// Định nghĩa kiểu cho lỗi API (để TypeScript hiểu object lỗi có field message)
interface ApiError {
    message?: string;
    [key: string]: unknown;
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

    get: async <TResponse>(endpoint: string, params?: SearchParams): Promise<TResponse> => {
        let url = `${API_CONFIG.BASE_URL}${endpoint}`;

        if (params) {
            // Lọc bỏ các giá trị undefined/null trước khi đưa vào URLSearchParams
            const validParams: Record<string, string> = {};
            
            Object.keys(params).forEach(key => {
                const value = params[key];
                if (value !== undefined && value !== null) {
                    // Convert tất cả sang string để URLSearchParams hiểu
                    validParams[key] = String(value);
                }
            });

            const queryString = new URLSearchParams(validParams).toString();
            url += `?${queryString}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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