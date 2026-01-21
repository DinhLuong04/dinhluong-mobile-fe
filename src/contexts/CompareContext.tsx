// src/contexts/CompareContext.ts
import { createContext, useContext } from 'react';
import type { Product } from '../types/Product.types';

// 1. Định nghĩa Interface cho Context
export interface CompareContextType {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (id: number | string) => void;
  clearCompare: () => void;
  toggleCompareVisibility: () => void;
  isVisible: boolean;
}

// 2. Khởi tạo Context
export const CompareContext = createContext<CompareContextType | undefined>(undefined);

// 3. Export Hook để sử dụng (Fast Refresh cho phép export Hook ở file riêng)
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};