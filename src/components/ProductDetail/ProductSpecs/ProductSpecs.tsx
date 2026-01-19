import React, { useState } from 'react';
// Import dữ liệu
import { productSpecs, policies } from '../../../pages/ProductDetail/data';
// Import Modal
import ProductSpecsModal from '../ProductSpecsModal/ProductSpecsModal';
// Bạn có thể dùng chung CSS của Gallery hoặc tạo file CSS mới
import "../ProductGallery/ProductGallery.css"; 

const ProductSpecs = () => {
    // 1. Chuyển state mở Modal sang đây
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);

    return (
        <div className="pd-specs-container">
            {/* --- ĐOẠN CODE BẠN VỪA GỬI --- */}
            
            {/* Thông số nổi bật */}
            <div className="pd-section mt-20">
                <div className="pd-section-header">
                    <h3>Thông số nổi bật</h3>
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
            {/* ----------------------------- */}

            {/* Đặt Modal ở đây để nút bấm gọi được nó */}
            <ProductSpecsModal 
                isOpen={isSpecsOpen} 
                onClose={() => setIsSpecsOpen(false)} 
            />
        </div>
    );
};

export default ProductSpecs;