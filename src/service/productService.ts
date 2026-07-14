
import qs from "qs";
import httpClient from "../api/httpClient";
import { API_CONFIG } from '../config/api.config';
import type { ApiResponse } from "../types/common.types";
import type { 
    ProductCardResponse, 
    PageProductCardResponse,
    ProductDetailResponse,
    ProductComboDto 
} from "../types/product.types";

export interface ProductQueryParams {
    search?: string;
    category?: string;
    brands?: string[];
    os?: string[];
    roms?: string[];
    rams?: string[];
    networks?: string[];
    minPrice?: number;
    maxPrice?: number;
    minBattery?: number;
    maxBattery?: number;
    minScreenSize?: number;
    maxScreenSize?: number;
    minRefreshRate?: number;
    maxRefreshRate?: number;
    page?: number;
    size?: number;
    sort?: string[];
}

export const productService = {
    getProducts: async (params?: ProductQueryParams): Promise<PageProductCardResponse> => {
        try {
            const response = await httpClient.get<ApiResponse<PageProductCardResponse>>(
                API_CONFIG.PRODUCTS.GET_LIST,
                {
                    params,
                    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
                }
            );

            if (response.code !== 200 || !response.data) {
                throw new Error(response.message || 'Lấy danh sách sản phẩm thất bại');
            }

            return response.data;
        } catch (error) {
            console.error("Product Service Error:", error);
            throw error;
        }
    },

    // 2. Lấy chi tiết sản phẩm theo Slug
    getProductBySlug: async (slug: string): Promise<ProductDetailResponse> => {
        try {
            const response = await httpClient.get<ApiResponse<ProductDetailResponse>>(
                API_CONFIG.PRODUCTS.GET_DETAIL(slug)
            );

            if (response.code !== 200 || !response.data) {
                throw new Error(response.message || 'Không tìm thấy chi tiết sản phẩm');
            }

            return response.data;
        } catch (error) {
            console.error("Product Detail Error:", error);
            throw error;
        }
    },

    // 3. Lấy nhiều sản phẩm bằng mảng Slug (Dùng cho tính năng So sánh)
    getProductsBySlugs: async (slugs: string[]): Promise<ProductDetailResponse[]> => {
        try {
            if (!slugs || slugs.length === 0) return [];

            const response = await httpClient.get<ApiResponse<ProductDetailResponse[]>>(
                API_CONFIG.PRODUCTS.GET_BATCH,
                { 
                    params: { slugs }, 
                    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
                } 
            );

            if (response.code !== 200 || !response.data) {
                throw new Error(response.message || 'Lấy danh sách so sánh thất bại');
            }

            return response.data;
        } catch (error) {
            console.error("Batch Product Error:", error);
            throw error;
        }
    },

    // 4. Gợi ý tìm kiếm nhanh (Search Box)
    getSuggestions: async (keyword: string): Promise<ProductCardResponse[]> => {
        try {
            const response = await httpClient.get<ApiResponse<PageProductCardResponse>>(
                API_CONFIG.PRODUCTS.GET_LIST, 
                {
                    params: { search: keyword, size: 5 },
                }
            );
            return response.data?.content || [];
        } catch (error) {
            console.error("Suggestions Error:", error);
            return [];
        }
    },

    // 5. Lấy danh sách sản phẩm mua kèm (Combo)
    getCombos: async (slug: string): Promise<ProductComboDto[]> => {
        try {
            const response = await httpClient.get<ApiResponse<ProductComboDto[]>>(
                API_CONFIG.PRODUCTS.GET_COMBOS(slug) 
            );

            if (response.code !== 200 || !response.data) {
                return [];
            }

            return response.data;
        } catch (error) {
            console.error("Combo API Error:", error);
            return []; 
        }
    },

    // 6. Lấy danh sách sản phẩm nổi bật
    getFeaturedProducts: async (limit: number = 10): Promise<ProductCardResponse[]> => {
        try {
            const response = await httpClient.get<ApiResponse<ProductCardResponse[]>>(
                API_CONFIG.PRODUCTS.GET_FEATURED,
                { params: { limit } }
            );

            if (response.code !== 200 || !response.data) {
                return [];
            }

            return response.data;
        } catch (error) {
            console.error("Featured Products Error:", error);
            return [];
        }
    }
};