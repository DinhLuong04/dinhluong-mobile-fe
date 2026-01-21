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


// ==========================================
// --- CÁC TYPE MỚI (Dùng cho Detail) ---
// ==========================================

export interface HighlightSpec {
  label: string;
  value: string;
  icon: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  img: string;
}

export interface VariantDetail {
  sku: string;
  rom: string;
  colorName: string;
  price: number;
  stock: number;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecGroup {
  id: number | string;
  title: string;
  items: SpecItem[];
}

// Map đúng với JSON "data" của API Product Detail
export interface ProductDetail {
  id: number | string; // Có thể là Long hoặc String tùy backend trả về ID hay Slug ở field này
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discountNote?: string;
  installmentText?: string;
  description: string;
  thumbnail :string;
  productImages: string[];
  highlightSpecs: HighlightSpec[];
  storageOptions: string[];
  colorOptions: ColorOption[];
  variants: VariantDetail[];
  specsData: SpecGroup[];
  promotions: string[];
}