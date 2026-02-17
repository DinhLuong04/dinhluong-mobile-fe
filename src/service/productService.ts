import qs from "qs";
import httpClient from "../api/axiosClient";
import { API_CONFIG } from '../config/api.config';

// 1. IMPORT CÁC TYPE TỪ FILE BẠN VỪA TẠO
import type { 
  Product, 
  ProductDetail,
  ComboResponse,
  PageResponse, 
  ApiResponse, 
  ProductFilterParams 
} from "../types/Product.types";

// 2. TẠO INTERFACE CHO API REQUEST (Kết hợp Phân trang + Bộ lọc)
// Kế thừa ProductFilterParams để có sẵn brands, os, minPrice...
export interface ProductQueryParams extends ProductFilterParams {
  page?: number;
  size?: number;
  sort?: string[]; // ["createdAt,desc"]
  search?: string;
}

export const productService = {
  // Sử dụng ProductQueryParams làm kiểu dữ liệu đầu vào
  getProducts: async (params?: ProductQueryParams): Promise<PageResponse<Product>> => {
    try {
      const response = await httpClient.get<ApiResponse<PageResponse<Product>>>(
        API_CONFIG.PRODUCTS.GET_LIST,
        {
          params: params,
          
          // Serializer để gửi mảng đúng chuẩn Spring Boot (brands=A&brands=B)
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
          },
        }
      );

      if (response.code !== 200) {
        throw new Error(response.message || 'Lấy danh sách thất bại');
      }

      return response.data;
    } catch (error) {
      console.error("Product Service Error:", error);
      throw error;
    }
  },

  getProductBySlug: async (slug: string): Promise<ProductDetail> => {
    try {
      const response = await httpClient.get<ApiResponse<ProductDetail>>(
        API_CONFIG.PRODUCTS.GET_DETAIL(slug)
      );

      if (response.code !== 200 || !response.data) {
        throw new Error(response.message || 'Không tìm thấy sản phẩm');
      }

      return response.data;
    } catch (error) {
      console.error("Product Detail Error:", error);
      throw error;
    }
  },

  getProductsBySlugs: async (slugs: string[]): Promise<ProductDetail[]> => {
    try {
      if (!slugs || slugs.length === 0) return [];

      const response = await httpClient.get<ApiResponse<ProductDetail[]>>(
        API_CONFIG.PRODUCTS.GET_BATCH,
        { 
            params: { slugs: slugs }, 
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        } 
      );

      if (response.code !== 200) {
        throw new Error(response.message || 'Lấy danh sách so sánh thất bại');
      }

      return response.data || [];
    } catch (error) {
      console.error("Batch Product Error:", error);
      throw error;
    }
  },
  getSuggestions: async (keyword: string): Promise<Product[]> => {
    try {
      // Gọi API tìm kiếm nhanh, limit khoảng 5 sản phẩm
      const response = await httpClient.get<ApiResponse<PageResponse<Product>>>(
        API_CONFIG.PRODUCTS.GET_LIST, 
        {
          params: { search: keyword, size: 5 }, // Lấy 5 sản phẩm gợi ý
        } as any
      );
      // Trả về list sản phẩm, nếu lỗi trả về mảng rỗng
      return response.data?.content || [];
    } catch (error) {
      console.error("Batch Product Error:", error);
      return [];
    }
  },
  getCombos: async (slug: string): Promise<ComboResponse> => {
    try {
      const response = await httpClient.get<ApiResponse<ComboResponse>>(
        `${API_CONFIG.PRODUCTS.GET_LIST}/${slug}/combos` // Giả sử path là /products/{slug}/combos
      );

      if (response.code !== 200 || !response.data) {
        // Nếu không có combo, trả về mảng rỗng thay vì throw error
        // để giao diện chỉ cần ẩn đi chứ không lỗi trang
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Combo API Error:", error);
      return []; // Trả về rỗng nếu lỗi
    }
  },
};