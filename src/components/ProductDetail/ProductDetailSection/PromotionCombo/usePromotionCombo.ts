import { useState, useEffect } from 'react';
import { productService } from '../../../../service/productService';
import type { ProductComboDto } from '../../../../types/product.types';

export const usePromotionCombo = (slug: string) => {
    const [combos, setCombos] = useState<ProductComboDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCombos = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const data = await productService.getCombos(slug);
                setCombos(data);
            } catch (err) {
                console.error("Lỗi tải combo:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCombos();
    }, [slug]);

    const totalPrice = combos.reduce((sum, item) => sum + (item.rawPrice || 0), 0);
    const totalSaving = combos.reduce((sum, item) => sum + (item.rawDiscount || 0), 0);
    const totalOriginalPrice = totalPrice + totalSaving;

    const totalPercent = totalOriginalPrice > 0 
        ? Math.round((totalSaving / totalOriginalPrice) * 100) 
        : 0;

    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
    };

    return {
        combos,
        loading,
        totalPrice,
        totalSaving,
        totalOriginalPrice,
        totalPercent,
        formatVND
    };
};