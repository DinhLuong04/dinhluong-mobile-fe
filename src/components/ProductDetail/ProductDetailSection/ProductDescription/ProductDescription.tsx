import React, { useState, useRef } from 'react';
import './ProductDescription.css';

// Khai báo kiểu dữ liệu cho props
interface ProductDescriptionProps {
    description?: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    // Nếu không có mô tả từ Backend, không render gì hoặc render thông báo
    if (!description) {
        return (
            <div className="pd-desc-wrapper">
                <div className="container pd-desc-container">
                    <div className="pd-desc-box">
                        <h2 className="pd-desc-title">Mô tả sản phẩm</h2>
                        <p style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                            Chưa có thông tin mô tả cho sản phẩm này.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pd-desc-wrapper">
            <div className="container pd-desc-container">
                <div className="pd-desc-box">
                    <h2 className="pd-desc-title" ref={titleRef}>Mô tả sản phẩm</h2>
                    
                    {/* KHỐI HIỂN THỊ NỘI DUNG HTML ĐỘNG */}
                    <div className={`pd-desc-content ${isExpanded ? 'expanded' : ''}`}>
                        <div 
                            className="pd-dynamic-html"
                            dangerouslySetInnerHTML={{ __html: description }} 
                        />
                    </div>
                    
                    {/* Nút Xem thêm (Fade out) */}
                    {!isExpanded && (
                        <div className="pd-desc-viewmore">
                            <div className="pd-desc-gradient-overlay"></div>
                            <button 
                                className="pd-btn-viewmore"
                                onClick={() => setIsExpanded(true)}
                            >
                                Đọc thêm
                            </button>
                        </div>
                    )}
                    
                    {/* Nút Thu gọn */}
                    {isExpanded && (
                        <div className="pd-desc-collapse">
                             <button 
                                className="pd-btn-viewmore"
                                onClick={() => {
                                    setIsExpanded(false);
                                    // Cuộn mượt mà lên đầu phần mô tả
                                    titleRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
                                }}
                            >
                                Thu gọn
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;