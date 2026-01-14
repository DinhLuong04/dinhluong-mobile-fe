

export interface ProductVariant {
  label: string;
  active?: boolean;
}

export interface ProductColor {
  hex: string;
}

export interface ProductSpec {
  icon: string;
  label: string;
  subLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountNote?: string;
  installmentText?: string;
  specs: ProductSpec[];
  colors: ProductColor[];
  variants: ProductVariant[];
  promotions: string[];
  promotionText?: string;
}