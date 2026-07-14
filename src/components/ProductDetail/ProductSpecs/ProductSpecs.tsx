import React, { useState } from 'react';
import ProductSpecsModal from '../ProductSpecsModal/ProductSpecsModal';
import "../ProductGallery/ProductGallery.css"; 

import type { HighlightSpec, SpecGroup } from '../../../types/product.types';

interface ProductSpecsProps {
    highlightSpecs?: HighlightSpec[]; 
    specsData?: SpecGroup[];          
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ 
    highlightSpecs = [], 
    specsData = [] 
}) => {
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);

    const policies = [
        { icon: "https://cdn2.fptshop.com.vn/svg/Type_Bao_hanh_chinh_hang_4afa1cb34d.svg", text: "Hàng chính hãng - Bảo hành 12 tháng" },
        { icon: "https://cdn2.fptshop.com.vn/svg/Type_Giao_hang_toan_quoc_318e6896b4.svg", text: "Miễn phí giao hàng toàn quốc" },
        { icon: "https://cdn2.fptshop.com.vn/svg/icon_ktv_8c9caa2c06.svg", text: "Kỹ thuật viên hỗ trợ trực tuyến" },
    ];

    return (
        <div className="pd-specs-container">
            
            {/* CHỈ ẨN ĐÚNG KHỐI NÀY NẾU KHÔNG CÓ DỮ LIỆU */}
            {highlightSpecs && highlightSpecs.length > 0 && (
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
                        {highlightSpecs.map((spec, i) => (
                            <div key={i} className="pd-spec-item">
                                <div className="spec-icon-wrapper">
                                    <img src={spec.icon} alt={spec.label} />
                                </div>
                                <p className="spec-label">{spec.label}</p>
                                <strong className="spec-value">{spec.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* KHỐI CHÍNH SÁCH NÀY LUÔN LUÔN HIỂN THỊ ĐỂ LẤP CHỖ TRỐNG */}
            <div className="pd-section border-top mt-20">
                <div className="pd-section-header">
                    <h3>Chính sách sản phẩm</h3>
                    <a href="#" className="pd-link-view-all">Tìm hiểu thêm</a>
                </div>

                <div className="pd-policies-flex">
                    {policies.map((p, i) => (
                        <div key={i} className="pd-policy-item-1">
                            <img src={p.icon} alt="" className="policy-icon-1" />
                            <span className="policy-text-1">{p.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <ProductSpecsModal 
                isOpen={isSpecsOpen} 
                onClose={() => setIsSpecsOpen(false)} 
                specsData={specsData}
            />
        </div>
    );
};

export default ProductSpecs;