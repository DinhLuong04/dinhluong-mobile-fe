import React, { useState } from 'react';
import { productImages, productSpecs, policies } from '../../../pages/ProductDetail/data';
import "./ProductGallery.css";
import ProductSpecsModal from '../ProductSpecsModal/ProductSpecsModal';
const ProductGallery = () => {
    const [mainImage, setMainImage] = useState(productImages[0]);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
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

            {/* Thông số nổi bật */}
            <div className="pd-section mt-20">
                <div className="pd-section-header">
                    <h3>Thông số nổi bật</h3>
                    
                    {/* 2. Gắn sự kiện onClick vào nút "Xem tất cả" */}
                    <button 
                        className="pd-link-view-all" 
                        onClick={() => setIsSpecsOpen(true)}
                        style={{background: 'none', border: 'none', cursor: 'pointer', color: '#1250dc'}}
                    >
                        Xem tất cả thông số
                    </button>
                </div>
                
                <div className="pd-specs-flex">
                    {productSpecs.map((spec, i) => (
                        <div key={i} className="pd-spec-item">
                            <div className="spec-icon-wrapper">
                                <img src={spec.icon} alt="" />
                            </div>
                            <p className="spec-label">{spec.label}</p>
                            <strong className="spec-value">{spec.value}</strong>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chính sách sản phẩm */}
            <div className="pd-section border-top">
                <div className="pd-section-header">
                    <h3>Chính sách sản phẩm</h3>
                    <a href="#" className="pd-link-view-all">Tìm hiểu thêm</a>
                </div>

                <div className="pd-policies-flex">
                    {policies.map((p, i) => (
                        <div key={i} className="pd-policy-item">
                            <img src={p.icon} alt="" className="policy-icon" />
                            <span className="policy-text">{p.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ProductSpecsModal 
                isOpen={isSpecsOpen} 
                onClose={() => setIsSpecsOpen(false)} 
            />
        </div>
    );
};

export default ProductGallery;