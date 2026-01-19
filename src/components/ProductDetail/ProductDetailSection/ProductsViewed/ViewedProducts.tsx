import React from 'react';
import ProductCard, {type Product } from '../../../Products/ProductCard/ProductCard'; // Đường dẫn tới file ProductCard của bạn
import { viewedProducts } from './viewedProductsData';
import './ViewedProducts.css';

const ViewedProducts = () => {
    
    const handleProductClick = (product: Product) => {
        console.log("Click sản phẩm đã xem:", product.name);
        // Điều hướng tới trang chi tiết
    };

    return (
        <div className="container vp-wrapper">
            <div className="vp-container">
                <h2 className="vp-title">Sản phẩm đã xem</h2>
                
                <div className="vp-slider">
                    {viewedProducts.map(product => (
                        <div key={product.id} className="vp-slider-item">
                            {/* Truyền prop onCompare là undefined để không hiện nút (hoặc xử lý bằng CSS wrapper như trên) */}
                            <ProductCard 
                                product={product} 
                                onClick={handleProductClick}
                                // Không truyền onCompare ở đây nếu ProductCard hỗ trợ ẩn nút khi prop này null
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewedProducts;