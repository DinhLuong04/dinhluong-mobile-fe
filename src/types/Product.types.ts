
import type { PageableObject, SortObject } from './common.types';

// ==================== 1. PRODUCT CARD (Danh sách, Trang chủ) ====================
export interface ColorDto {
    hex?: string;
}

export interface SpecDto {
    icon?: string;
    label?: string;
    subLabel?: string;
}

export interface VariantDto {
    label?: string;
    active?: boolean;
}

export interface ProductCardResponse {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
    price?: number;
    originalPrice?: number;
    discountNote?: string;
    installmentText?: string;
    specs?: SpecDto[];
    colors?: ColorDto[];
    variants?: VariantDto[];
    promotions?: string[];
    promotionText?: string;
}

export interface PageProductCardResponse {
    totalElements?: number;
    totalPages?: number;
    size?: number;
    content?: ProductCardResponse[];
    number?: number;
    sort?: SortObject;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    pageable?: PageableObject;
    empty?: boolean;
}

// ==================== 2. PRODUCT DETAIL (Trang chi tiết) ====================
export interface HighlightSpecDto {
    label?: string;
    value?: string;
    icon?: string;
}

export interface ColorOptionDto {
    name?: string;
    hex?: string;
    img?: string;
}

export interface VariantDetailDto {
    id?: number;
    sku?: string;
    rom?: string;
    colorName?: string;
    price?: number;
    stock?: number;
}

export interface SpecItemDto {
    label?: string;
    value?: string;
}

export interface SpecGroupDto {
    id?: number;
    title?: string;
    items?: SpecItemDto[];
}

export interface ProductDetailResponse {
    id?: number;
    name?: string;
    slug?: string;
    categoryName?: string;
    brandName?: string;
    price?: number;
    originalPrice?: number;
    discountNote?: string;
    installmentText?: string;
    description?: string;
    thumbnail?: string;
    productImages?: string[];
    highlightSpecs?: HighlightSpecDto[];
    storageOptions?: string[];
    colorOptions?: ColorOptionDto[];
    variants?: VariantDetailDto[];
    specsData?: SpecGroupDto[];
    promotions?: string[];
}

// ==================== 3. PRODUCT COMBO (Mua kèm) ====================
export interface ProductComboDto {
    id?: number;
    relatedProductId?: number;
    name?: string;
    image?: string;
    price?: string;
    oldPrice?: string;
    saving?: string;
    rawPrice?: number;
    rawDiscount?: number;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    empty: boolean;
}

export type ProductFilterParams = Record<string, any>;