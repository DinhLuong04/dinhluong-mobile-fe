// Trong file src/components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts.tsx

import React, { useEffect, useState } from 'react';
import ProductCard from '../../../Products/ProductCard/ProductCard'; 
import './viewedProducts.css';
import type { Product } from '../../../../types/Product.types';

// 1. Import hàm đọc lịch sử
import { getViewedProductsFromHistory } from '../../../../utils/viewedProductHelper';

interface ViewedProductsProps {
    currentSlug?: string; // Nhận slug của trang hiện tại để không hiển thị lại chính nó
}

const ViewedProducts: React.FC<ViewedProductsProps> = ({ currentSlug }) => {
    const [viewedList, setViewedList] = useState<Product[]>([]);

    // 2. Load dữ liệu từ Local Storage 1 lần khi render
    useEffect(() => {
        const list = getViewedProductsFromHistory();
        setViewedList(list);
    }, [currentSlug]); // Nếu slug đổi thì load lại

    // 3. Lọc bỏ sản phẩm đang xem hiện tại (nếu có)
    const displayProducts = viewedList.filter(p => p.slug !== currentSlug);

    // 4. Nếu chưa xem gì cả, ẩn luôn Component này đi
    if (displayProducts.length === 0) return null;

    return (
        <div className="container vp-wrapper">
            <div className="vp-container">
                <h2 className="vp-title">Sản phẩm đã xem</h2>
                <div className="vp-slider">
                    {displayProducts.map(product => (
                        <div key={product.id} className="vp-slider-item">
                            {/* Load lại ProductCard */}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewedProducts;