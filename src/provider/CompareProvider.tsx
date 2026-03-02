// src/contexts/CompareProvider.tsx
import React, { useState, useEffect, type ReactNode } from 'react';
import { message } from 'antd'; // 1. Import message
import type { Product } from '../types/Product.types';
import { CompareContext } from '../contexts/CompareContext';

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [isVisible, setIsVisible] = useState(false);

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
    // 2. Di chuyển logic kiểm tra ra NGOÀI hàm setCompareList
    if (compareList.some((p) => p.id === product.id)) {
      message.warning('Sản phẩm này đã có trong danh sách so sánh!');
      return;
    }
    
    if (compareList.length >= 3) {
      message.warning('Chỉ được so sánh tối đa 3 sản phẩm!');
      return;
    }
      
    // 3. Nếu hợp lệ thì mới cập nhật state và hiện thông báo
    setCompareList((prev) => [...prev, product]);
    setIsVisible(true);
    message.success('Đã thêm vào danh sách so sánh!'); // Phản hồi UX tốt hơn
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