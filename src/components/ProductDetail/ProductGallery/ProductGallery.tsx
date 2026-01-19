import React, { useState } from 'react';
import { productImages} from '../../../pages/ProductDetail/data';
import "./ProductGallery.css";
import ProductSpecs from '../ProductSpecs/ProductSpecs';
const ProductGallery = () => {
    const [mainImage, setMainImage] = useState(productImages[0]);
    return (
        <div className="pd-left-col">
            {/* Ảnh chính + Thumbnails */}
            <div className="pd-gallery-container">
                <div className="pd-main-image">
                    <img src={mainImage} alt="Sản phẩm chính" />
                </div>
                
                {/* Thumbnails */}
                <div className="pd-thumbnails">
                    {productImages.map((img, index) => (
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
       <div className="pd-specs-desktop">
                <ProductSpecs />
            </div>
        </div>
    );
};

export default ProductGallery;