// src/types/product.types.ts

// 1. Inner Classes (Map từ Inner DTOs của Java)
export interface SpecDto {
  icon: string;
  label: string;
  subLabel: string;
}

export interface ColorDto {
  hex: string;
}

export interface VariantDto {
  label: string;
  active: boolean;
}

// 2. Main Product Response (Map từ ProductCardResponse)
export interface Product {
  id: string;              // Backend: id (là slug)
  name: string;
  image: string;           // Backend: image
  price: number;           // Backend: BigDecimal -> number
  originalPrice: number;
  discountNote?: string;   // Backend có thể null -> thêm dấu ?
  installmentText?: string;
  
  // Lists
  specs: SpecDto[];
  colors: ColorDto[];
  variants: VariantDto[];
  promotions: string[];
  promotionText?: string;
}

// 3. Page Structure (Cấu trúc trả về của Spring Data Page)
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Current page index
  last: boolean;  // True nếu là trang cuối
}

// 4. API Wrapper (Map từ class ApiResponse)
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  timestamp: string;
  data: T;
}