import React, { useState } from 'react';
import {  priceTable, techSpecsComparison, articleSections } from './ProductDescriptionData'; // Import đầy đủ
import './ProductDescription.css';

const ProductDescription = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="pd-desc-wrapper">
            <div className="container pd-desc-container">
                
                {/* Khối mô tả full width */}
                <div className="pd-desc-box">
                    <h2 className="pd-desc-title">Mô tả sản phẩm</h2>
                    
                    <div className={`pd-desc-content ${isExpanded ? 'expanded' : ''}`}>
                        
                        {/* 1. Đoạn Intro */}
                        <div className="pd-desc-section">
                            <p><strong>{articleSections[0].content}</strong></p>
                            
                            <div className="pd-desc-images">
                                {articleSections[0].images?.map((img, idx) => (
                                    <figure key={idx} className="image">
                                        <img src={img} alt={`iPhone 17 Pro Max intro ${idx + 1}`} loading="lazy" />
                                    </figure>
                                ))}
                            </div>
                        </div>

                        {/* 2. Các Section Nội dung chính (Từ index 1 trở đi) */}
                        {articleSections.slice(1).map((section, index) => (
                            <div key={index} className="pd-desc-section">
                                {section.title && <h3>{section.title}</h3>}
                                
                                {/* Render HTML content an toàn */}
                                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                                
                                <div className="pd-desc-images">
                                    {section.images?.map((img, idx) => (
                                        <figure key={idx} className="image">
                                            <img src={img} alt={`${section.title} ${idx + 1}`} loading="lazy" />
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* 3. Bảng Giá */}
                        <div className="pd-desc-section">
                            <h3>Bảng giá iPhone 17 Pro Max (Cập nhật 10/2025)</h3>
                            <div className="pd-table-responsive">
                                <table className="desc-price-table">
                                    <thead>
                                        <tr>
                                            <th>Phiên bản</th>
                                            <th>Giá Quốc tế</th>
                                            <th>Giá Việt Nam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {priceTable.map((row, index) => (
                                            <tr key={index}>
                                                <td><strong>{row.version}</strong></td>
                                                <td>{row.globalPrice}</td>
                                                <td className="price-highlight">{row.vnPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 4. Bảng Thông số kỹ thuật so sánh */}
                        <div className="pd-desc-section">
                            <h3>Thông số kỹ thuật iPhone 17 Pro Max 256GB và các sản phẩm dòng iPhone 17 series</h3>
                            <div className="pd-table-responsive">
                                <table className="desc-specs-table">
                                    <thead>
                                        <tr>
                                            <th>Tiêu chí</th>
                                            <th>iPhone 17</th>
                                            <th>iPhone Air</th>
                                            <th>iPhone 17 Pro</th>
                                            <th>iPhone 17 Pro Max</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {techSpecsComparison.map((row, index) => (
                                            <tr key={index}>
                                                <td><strong>{row.criteria}</strong></td>
                                                <td>{row.ip17}</td>
                                                <td>{row.ipAir}</td>
                                                <td>{row.ipPro}</td>
                                                <td>{row.ipProMax}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Nút Xem thêm (Fade out) */}
                        {!isExpanded && (
                            <div className="pd-desc-viewmore">
                                <button 
                                    className="pd-btn-viewmore"
                                    onClick={() => setIsExpanded(true)}
                                >
                                    Đọc thêm
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Nút Thu gọn */}
                    {isExpanded && (
                        <div className="pd-desc-collapse">
                             <button 
                                className="pd-btn-viewmore"
                                onClick={() => {
                                    setIsExpanded(false);
                                    document.querySelector('.pd-desc-title')?.scrollIntoView({behavior: 'smooth', block: 'start'});
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