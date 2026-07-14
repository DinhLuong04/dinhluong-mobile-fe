// src/components/ProductList/useProductList.ts
import { useState, useEffect } from 'react';
import { productService } from '../../../service/productService';
import type { ProductCardResponse, ProductFilterParams } from '../../../types/product.types';

interface UseProductListProps {
    filters?: ProductFilterParams;
    onDataFetched?: (total: number) => void;
}

export const useProductList = ({ filters, onDataFetched }: UseProductListProps) => {
    const [products, setProducts] = useState<ProductCardResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [activeSort, setActiveSort] = useState<string>('featured');
    const [page, setPage] = useState<number>(0);
    const size = 12;

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

            const cleanData: ProductCardResponse[] = (response.content || []).map((item: any) => ({
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
            
            setTotalElements(response.totalElements || 0);
            setPage(pageIndex);

            if (onDataFetched) {
                onDataFetched(response.totalElements || 0);
            }

        } catch (error) {
            console.error("Lỗi tải danh sách sản phẩm:", error);
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

    const remainingProducts = totalElements - products.length;

    return {
        products,
        loading,
        totalElements,
        activeSort,
        setActiveSort,
        remainingProducts,
        handleLoadMore
    };
};