// src/api/httpClient.ts

import { API_CONFIG } from '../config/api.config';

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

    // Bạn có thể thêm get, put, delete...
};

export default httpClient;