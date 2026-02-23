// src/utils/viewedProductHelper.ts
import type { Product } from '../types/Product.types';

const VIEWED_KEY = 'dlm_viewed_products';
const MAX_ITEMS = 10; 

// Hàm dùng để THÊM vào LocalStorage (Gọi khi click)
export const addProductToViewedHistory = (product: Product) => {
    try {
        const stored = localStorage.getItem(VIEWED_KEY);
        let currentList: Product[] = [];
        
        if (stored) {
            currentList = JSON.parse(stored);
        }

        // 1. Xóa sản phẩm nếu đã tồn tại (để chốc nữa đẩy nó lên vị trí đầu tiên)
        const filteredList = currentList.filter(p => p.id !== product.id);

        // 2. Thêm vào đầu mảng và chỉ lấy tối đa 10 sản phẩm
        const newList = [product, ...filteredList].slice(0, MAX_ITEMS);

        // 3. Lưu ngược lại vào Local Storage
        localStorage.setItem(VIEWED_KEY, JSON.stringify(newList));
    } catch (error) {
        console.error("Lỗi khi lưu sản phẩm đã xem:", error);
    }
};

// Hàm dùng để ĐỌC từ LocalStorage (Gọi khi hiển thị)
export const getViewedProductsFromHistory = (): Product[] => {
    try {
        const stored = localStorage.getItem(VIEWED_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Lỗi khi đọc sản phẩm đã xem:", error);
    }
    return [];
};