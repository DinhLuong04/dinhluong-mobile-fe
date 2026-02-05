import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { useCompare } from '../../../contexts/CompareContext';
import ProductCard from '../ProductCard/ProductCard';
import MobileFilterBar from "../../Fillter/FilterBar/FilterBar";
import { productService } from '../../../service/productService';
// 1. IMPORT EMPTY SEARCH (Kiểm tra lại đường dẫn nếu báo đỏ)
import EmptySearch from '../../EmptySearch/EmptySearch'; 

// 2. IMPORT TYPE
import type { Product } from '../../../types/Product.types';
import type { ProductFilterParams } from '../../../types/Product.types';

// --- Icons ---
const NFCIcon = () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="#1250DC" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.8297 3.08681C13.9391 3.1962 14.0005 3.34455 14.0005 3.49922C14.0005 3.6539 13.9391 3.80225 13.8297 3.91164L8.28806 9.45331C8.17867 9.56267 8.03032 9.6241 7.87564 9.6241C7.72096 9.6241 7.57262 9.56267 7.46323 9.45331L4.95898 6.94906L0.996394 10.9116C0.886376 11.0179 0.739025 11.0767 0.586077 11.0754C0.433129 11.074 0.286822 11.0127 0.178667 10.9045C0.0705122 10.7964 0.00916363 10.6501 0.00783455 10.4971C0.00650547 10.3442 0.0653022 10.1968 0.171561 10.0868L4.54656 5.71181C4.65595 5.60245 4.8043 5.54102 4.95898 5.54102C5.11366 5.54102 5.262 5.60245 5.37139 5.71181L7.87564 8.21606L13.0049 3.08681C13.1143 2.97745 13.2626 2.91602 13.4173 2.91602C13.572 2.91602 13.7203 2.97745 13.8297 3.08681Z" fill="inherit"></path><path fillRule="evenodd" clipRule="evenodd" d="M9.33594 3.49935C9.33594 3.34464 9.3974 3.19627 9.50679 3.08687C9.61619 2.97747 9.76456 2.91602 9.91927 2.91602H13.4193C13.574 2.91602 13.7224 2.97747 13.8317 3.08687C13.9411 3.19627 14.0026 3.34464 14.0026 3.49935V6.99935C14.0026 7.15406 13.9411 7.30243 13.8317 7.41183C13.7224 7.52122 13.574 7.58268 13.4193 7.58268C13.2646 7.58268 13.1162 7.52122 13.0068 7.41183C12.8974 7.30243 12.8359 7.15406 12.8359 6.99935V4.08268H9.91927C9.76456 4.08268 9.61619 4.02122 9.50679 3.91183C9.3974 3.80243 9.33594 3.65406 9.33594 3.49935Z" fill="inherit"></path></svg>);
const CheckArrowIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="#090D14"></path></svg>);

const TRENDS = [
  { label: 'NFC', icon: <NFCIcon /> },
  { label: 'Pin trâu: trên 5500 mAh', icon: <NFCIcon /> },
  { label: '5G', icon: <NFCIcon /> },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Nổi bật' },
  { id: 'price_asc', label: 'Giá tăng dần' },
  { id: 'price_desc', label: 'Giá giảm dần' },
  { id: 'installment', label: 'Trả góp 0%' },
];

// 3. CẬP NHẬT INTERFACE PROPS
interface ProductListProps {
  onOpenFilter?: () => void;
  filters?: ProductFilterParams;
  onDataFetched?: (total: number) => void; // Callback báo số lượng về cha
}

const ProductList: React.FC<ProductListProps> = ({ onOpenFilter, filters, onDataFetched }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalElements, setTotalElements] = useState<number>(0);
  
  // State quản lý
  const [activeSort, setActiveSort] = useState<string>('featured');
  const [page, setPage] = useState<number>(0);
  const size = 12;

  const { addToCompare } = useCompare();

  const getSortParam = (sortId: string): string => {
    switch (sortId) {
      case 'price_asc': return 'displayPrice,asc';
      case 'price_desc': return 'displayPrice,desc';
      case 'installment': return 'createdAt,desc'; 
      case 'featured': default: return 'createdAt,desc';
    }
  };

  const fetchProducts = async (pageIndex: number, isLoadMore: boolean) => {
    setLoading(true);
    try {
      const sortParam = getSortParam(activeSort);
      
      const response = await productService.getProducts({
        page: pageIndex,
        size: size,
        sort: [sortParam],
        ...filters,
      });

      const cleanData: Product[] = response.content.map((item: Product) => ({
        ...item,
        discountNote: item.discountNote ?? undefined,
        installmentText: item.installmentText ?? undefined,
        promotionText: item.promotionText ?? undefined,
        originalPrice: item.originalPrice ?? 0,
      }));

      if (isLoadMore) {
        setProducts(prev => [...prev, ...cleanData]);
      } else {
        setProducts(cleanData);
      }
      
      setTotalElements(response.totalElements);
      setPage(pageIndex);

      // --- QUAN TRỌNG: BÁO CÁO VỀ SEARCH PAGE ---
      if (onDataFetched) {
          onDataFetched(response.totalElements);
      }

    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchProducts(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSort, filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchProducts(nextPage, true);
  };

  const handleCompare = (product: Product) => {
    addToCompare(product);
  };

  const remainingProducts = totalElements - products.length;

  return (
    <div className="product-list-container">
      <div className="trend-wrapper">
        <span className="trend-label">Xu hướng:</span>
        {TRENDS.map((trend, index) => (
          <div key={index} className="trend-item">
            {trend.icon}
            <span>{trend.label}</span>
          </div>
        ))}
      </div>

      <div className="sort-bar-container">
        <p className="result-count">
            Tìm thấy <strong>{totalElements}</strong> kết quả
        </p>
        <MobileFilterBar onOpenFilter={onOpenFilter || (() => {})} />
        <div className="sort-options">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`sort-btn ${activeSort === option.id ? 'active' : ''}`}
              onClick={() => setActiveSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

    
    
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onCompare={handleCompare} 
            />
          ))}
        </div>
      

      {loading && <div className="text-center py-4">Đang tải...</div>}

      {!loading && remainingProducts > 0 && products.length > 0 && (
        <div className="load-more-container">
          <button className="btn-load-more" onClick={handleLoadMore}>
            Xem thêm {remainingProducts} kết quả
            <CheckArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;