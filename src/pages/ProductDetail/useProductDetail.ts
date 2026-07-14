import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../../service/productService';
import type { ProductDetailResponse } from '../../types/product.types';

export const useProductDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<ProductDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await productService.getProductBySlug(slug); 
                setProduct(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [slug]);

    return {
        slug,
        product,
        loading
    };
};