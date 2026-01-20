// types.ts
export interface CompareProduct {
  id: string | number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  sku: string;
}

// Mock Data (Lấy từ HTML của bạn)
export const COMPARE_PRODUCTS: CompareProduct[] = [
  {
    id: 1,
    name: "iPhone 17 256GB",
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_lavender_1_607c4326aa.png",
    price: 24890000,
    originalPrice: 24990000,
    sku: "00921653"
  },
  {
    id: 2,
    name: "iPhone 17 Pro Max 256GB",
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
    price: 37690000,
    originalPrice: 37990000,
    sku: "00921654"
  },
  {
    id: 3,
    name: "RedMagic 11 Pro 5G 16GB 512GB",
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/redmagic_11_pro_bac_3ebf7be19e.png",
    price: 23490000,
    originalPrice: 24990000,
    sku: "00923569"
  }
];