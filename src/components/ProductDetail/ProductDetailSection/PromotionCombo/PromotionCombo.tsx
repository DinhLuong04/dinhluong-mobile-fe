// src/components/ProductDetail/PromotionCombo/PromotionCombo.tsx
import React from 'react';
import './PromotionCombo.css';
import { usePromotionCombo } from './usePromotionCombo';

interface PromotionComboProps {
    slug: string;
}

const PromotionCombo: React.FC<PromotionComboProps> = ({ slug }) => {
    const {
        combos,
        loading,
        totalPrice,
        totalSaving,
        totalOriginalPrice,
        totalPercent,
        formatVND
    } = usePromotionCombo(slug);

    // Nếu đang tải hoặc không có combo nào -> Ẩn section này đi
    if (!loading && combos.length === 0) return null;

    return (
        <div className="combo-wrapper">
            <div className="container">
                <div className="combo-container">
                    
                    {/* 1. Header */}
                    <div className="combo-header">
                        <svg width="28" height="28" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="combo-icon">
                            <path d="M12.4155 5.12246C12.3089 5.01889..." fill="#CB1C22"/>
                        </svg>
                        <h4 className="combo-title">Giảm thêm khi mua kèm</h4>
                    </div>

                    {/* 2. Tabs */}
                    <div className="combo-tabs">
                        <div className="combo-tab-item active">Gói Phụ kiện Chuẩn</div>
                    </div>

                    {/* 3. Product List Scroll */}
                    <div className="combo-list">
                        {combos.map(product => (
                            <div key={product.id} className="combo-item">
                                <img src={product.image} alt={product.name} className="combo-item-img" />
                                <div className="combo-item-info">
                                    <p className="combo-item-name" title={product.name}>{product.name}</p>
                                    <div className="combo-price-row">
                                        <span className="combo-price-new">{product.price}</span>
                                        <span className="combo-price-old">{product.oldPrice}</span>
                                    </div>
                                    <p className="combo-saving">{product.saving}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 4. Footer (Total & Button) */}
                    <div className="combo-footer">
                        <div className="combo-total-info">
                            <div className="combo-total-row">
                                <span className="combo-label">Tổng:</span>
                                <span className="combo-total-price">{formatVND(totalPrice)}</span>
                                <span className="combo-total-old">{formatVND(totalOriginalPrice)}</span>
                                <span className="combo-total-percent">-{totalPercent}%</span>
                            </div>
                            <div className="combo-saving-row">
                                <span>Tiết kiệm:</span>
                                <b>{formatVND(totalSaving)}</b>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PromotionCombo;