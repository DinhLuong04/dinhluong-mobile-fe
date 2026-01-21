import React, { useState } from 'react';
import "./ProductGallery.css";
import ProductSpecs from '../ProductSpecs/ProductSpecs';

// 1. Import các Type cần thiết
import type { HighlightSpec, SpecGroup } from '../../../types/Product.types';

// 2. Định nghĩa Props
interface ProductGalleryProps {
    images?: string[];              // List ảnh slider
    highlightSpecs?: HighlightSpec[]; // Thông số nổi bật (truyền xuống ProductSpecs)
    specsData?: SpecGroup[];          // Thông số chi tiết (truyền xuống ProductSpecs -> Modal)
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ 
    images = [], 
    highlightSpecs = [], 
    specsData = [] 
}) => {
    // State lưu ảnh đang hiển thị to
    const [mainImage, setMainImage] = useState<string>(images.length > 0 ? images[0] : "");

   
   
    return (
        <div className="pd-left-col">
            {/* Ảnh chính + Thumbnails */}
            <div className="pd-gallery-container">
                <div className="pd-main-image">
                    {/* Hiển thị ảnh hoặc Placeholder nếu chưa có ảnh */}
                    <img 
                        src={mainImage || "https://placehold.co/600x600?text=Loading..."} 
                        alt="Sản phẩm chính" 
                    />
                </div>
                
                {/* Thumbnails */}
                <div className="pd-thumbnails">
                    {images.map((img, index) => (
                        <div 
                            key={index} 
                            className={`pd-thumb-item ${mainImage === img ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        >
                            <img src={img} alt={`thumb-${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Thông số kỹ thuật (Desktop View) */}
            <div className="pd-specs-desktop">
                {/* 4. Truyền tiếp data xuống component con */}
                <ProductSpecs 
                    highlightSpecs={highlightSpecs} 
                    specsData={specsData} 
                />
            </div>
        </div>
    );
};

export default ProductGallery;