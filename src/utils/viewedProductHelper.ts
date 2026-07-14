// src/utils/viewedHistory.ts
import type { ProductCardResponse } from '../types/product.types';

const VIEWED_KEY = 'dlm_viewed_products';
const MAX_ITEMS = 10; 

export const addProductToViewedHistory = (product: ProductCardResponse) => {
    try {
        const stored = localStorage.getItem(VIEWED_KEY);
        let currentList: ProductCardResponse[] = [];
        
        if (stored) {
            currentList = JSON.parse(stored);
        }    
        
        // Lọc bỏ sản phẩm nếu đã tồn tại để tránh trùng lặp
        const filteredList = currentList.filter(p => p.id !== product.id);
        
        // Đẩy sản phẩm mới nhất lên đầu và cắt giữ lại tối đa MAX_ITEMS
        const newList = [product, ...filteredList].slice(0, MAX_ITEMS);

        localStorage.setItem(VIEWED_KEY, JSON.stringify(newList));
    } catch (error) {
        console.error("Lỗi khi lưu sản phẩm đã xem:", error);
    }
};

export const getViewedProductsFromHistory = (): ProductCardResponse[] => {
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