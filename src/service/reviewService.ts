
import httpClient from '../api/httpClient';
import { API_CONFIG } from '../config/api.config';
import type { ReviewResponse } from '../types/review.types'; 
import type { ApiResponse } from '../types/common.types';

export const reviewService = {

    getReviewsByProduct: async (slug: string, page: number, limit: number, rating?: number | null): Promise<ReviewResponse> => {
        const params: any = { page, limit };
        if (rating) {
            params.rating = rating;
        }
        const response = await httpClient.get<ApiResponse<ReviewResponse>>(
            API_CONFIG.REVIEWS.GET_BY_PRODUCT(slug),
            { params }
        );

        if (response.code !== 200) {
            throw new Error(response.message || 'Không thể tải danh sách đánh giá');
        }

        return response.data;
    },

   
    createReview: async (formData: FormData): Promise<any> => {
        const response = await httpClient.post<ApiResponse<any>>(
            API_CONFIG.REVIEWS.CREATE,
            formData
        );

        if (response.code !== 200) {
            throw response; 
        }
        return response.data;
    }
};