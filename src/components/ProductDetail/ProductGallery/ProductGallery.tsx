import React, { useState, useEffect } from 'react';
import "./ProductGallery.css";
import ProductSpecs from '../ProductSpecs/ProductSpecs';

// 1. Import các Type cần thiết
import type { HighlightSpec, SpecGroup } from '../../../types/product.types';

// 2. Định nghĩa Props
interface ProductGalleryProps {
    images?: string[];              // List ảnh slider
    thumbnail?: string;             // Ảnh đại diện (Fallback số 1)
    highlightSpecs?: HighlightSpec[]; // Thông số nổi bật
    specsData?: SpecGroup[];          // Thông số chi tiết
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ 
    images = [], 
    thumbnail = "",
    highlightSpecs = [], 
    specsData = [] 
}) => {
    const DEFAULT_IMAGE = "https://placehold.co/600x600?text=No+Image";

    // Logic chắt lọc mảng ảnh để hiển thị
    // Ưu tiên 1: images có data -> dùng images
    // Ưu tiên 2: images rỗng, dùng thumbnail
    // Ưu tiên 3: cả 2 rỗng, dùng ảnh mặc định
    const displayImages = images.length > 0 
        ? images 
        : (thumbnail ? [thumbnail] : [DEFAULT_IMAGE]);

    // State lưu ảnh đang hiển thị to
    const [mainImage, setMainImage] = useState<string>(displayImages[0]);

    // Cập nhật lại ảnh chính nếu danh sách ảnh bị thay đổi từ bên ngoài (khi đổi sản phẩm)
    useEffect(() => {
        setMainImage(displayImages[0]);
    }, [displayImages[0]]);

    return (
        <div className="pd-left-col">
            {/* Ảnh chính + Thumbnails */}
            <div className="pd-gallery-container">
                <div className="pd-main-image">
                    <img 
                        src={mainImage} 
                        alt="Sản phẩm chính" 
                    />
                </div>
                
                {/* Thumbnails - Chỉ hiển thị nếu có từ 2 ảnh trở lên để tránh dư thừa */}
                {displayImages.length > 1 && (
                    <div className="pd-thumbnails">
                        {displayImages.map((img, index) => (
                            <div 
                                key={index} 
                                className={`pd-thumb-item ${mainImage === img ? 'active' : ''}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`thumb-${index}`} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Thông số kỹ thuật (Desktop View) */}
           <div className="pd-specs-desktop">
                <ProductSpecs 
                    highlightSpecs={highlightSpecs} 
                    specsData={specsData} 
                />
            </div>
        </div>
    );
};

export default ProductGallery;