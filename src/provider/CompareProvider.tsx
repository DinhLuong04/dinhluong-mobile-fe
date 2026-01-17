// src/contexts/CompareProvider.tsx
import React, { useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../components/Products/ProductCard/ProductCard'; // Đảm bảo đường dẫn đúng
import { CompareContext } from '../contexts/CompareContext'; // Import Context từ file vừa tạo ở Bước 1

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isVisible, setIsVisible] = useState(true);

  // Lazy initialization: Chỉ chạy 1 lần khi mount để lấy dữ liệu từ localStorage
  const [compareList, setCompareList] = useState<Product[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('compareList');
        return saved ? JSON.parse(saved) : [];
      }
    } catch (error) {
      console.error("Lỗi khi đọc localStorage:", error);
    }
    return [];
  });

  // Lưu vào localStorage mỗi khi list thay đổi
  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product: Product) => {
    setCompareList((prev) => {
      // 1. Kiểm tra trùng lặp
      if (prev.some((p) => p.id === product.id)) {
        alert('Sản phẩm này đã có trong danh sách so sánh!');
        return prev;
      }
      // 2. Kiểm tra số lượng
      if (prev.length >= 3) {
        alert('Chỉ được so sánh tối đa 3 sản phẩm!');
        return prev;
      }
      
      // Mở thanh so sánh khi thêm thành công
      setIsVisible(true);
      return [...prev, product];
    });
  };

  const removeFromCompare = (id: number | string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const toggleCompareVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <CompareContext.Provider value={{ 
        compareList, 
        addToCompare, 
        removeFromCompare, 
        clearCompare, 
        toggleCompareVisibility, 
        isVisible 
    }}>
      {children}
    </CompareContext.Provider>
  );
};