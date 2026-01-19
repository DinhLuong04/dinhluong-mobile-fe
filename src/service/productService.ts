import httpClient from "../api/axiosClient";
import { API_CONFIG } from '../config/api.config';
import type { Product, PageResponse, ApiResponse } from "../types/Product.types";

// Khớp với @RequestParam trong Controller
export interface ProductParams {
  page?: number;
  size?: number;
  sort?: string[]; // Controller nhận mảng String (VD: ["createdAt,desc"])
  // Filter params
  brand?: string;
  os?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export const productService = {
  getProducts: async (params?: ProductParams): Promise<PageResponse<Product>> => {
    try {
      const response = await httpClient.get<ApiResponse<PageResponse<Product>>>(
        API_CONFIG.PRODUCTS.GET_LIST,
        // Ép kiểu để httpClient xử lý query string
        params as unknown as Record<string, string | number | boolean | undefined>
      );

      if (response.code !== 200) {
        throw new Error(response.message || 'Lấy danh sách thất bại');
      }

      return response.data;
    } catch (error) {
      console.error("Product Service Error:", error);
      throw error;
    }
  }
};