// src/pages/CompareProduct/useCompareProduct.ts
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../service/productService';
import type { ProductDetailResponse } from '../../types/product.types';

export const useCompareProduct = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState<ProductDetailResponse[]>([]);
    const [showDiff, setShowDiff] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            const slugsParam = searchParams.get('slugs');
            if (slugsParam) {
                try {
                    const slugs = slugsParam.split(',');
                    const data = await productService.getProductsBySlugs(slugs);
                    setProducts(data);
                } catch (error) {
                    console.error("Lỗi tải dữ liệu so sánh:", error);
                }
            }
        };
        fetchData();
    }, [searchParams]);

    const handleRemoveProduct = (id: number | string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return {
        products,
        showDiff,
        setShowDiff,
        handleRemoveProduct
    };
};