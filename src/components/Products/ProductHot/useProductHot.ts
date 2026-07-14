// src/components/Home/ProductHot/useProductHot.ts
import { useState, useEffect } from 'react';
import { productService } from '../../../service/productService';
import type { ProductCardResponse } from '../../../types/product.types';

export const useProductHot = () => {
    const [products, setProducts] = useState<ProductCardResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                setLoading(true);
                const responseData = await productService.getFeaturedProducts(10);
                // Map dữ liệu
                const cleanData: ProductCardResponse[] = responseData.map((item: any) => ({
                    ...item,
                    image: item.image || item.thumbnailUrl, 
                    price: item.price || item.displayPrice, 
                    discountNote: item.discountNote ?? undefined,
                    installmentText: item.installmentText ?? undefined,
                    promotionText: item.promotionText ?? undefined,
                    originalPrice: item.originalPrice ?? 0,
                }));

                setProducts(cleanData);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm Hot Sale:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotProducts();
    }, []);

    return {
        products,
        loading
    };
};