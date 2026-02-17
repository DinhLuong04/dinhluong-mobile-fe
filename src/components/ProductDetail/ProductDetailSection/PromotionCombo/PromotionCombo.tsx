import React, { useEffect, useState } from 'react';
import './PromotionCombo.css';
import { productService } from '../../../../service/productService'; // Đảm bảo đường dẫn import đúng
import type { ComboProduct } from '../../../../types/Product.types'; // Đảm bảo đường dẫn import đúng

interface PromotionComboProps {
    slug: string;
}

const PromotionCombo: React.FC<PromotionComboProps> = ({ slug }) => {
    const [combos, setCombos] = useState<ComboProduct[]>([]);
    const [loading, setLoading] = useState(true);

    // Tính tổng tiền & Tiết kiệm (Dựa trên dữ liệu API trả về)
    // Giả sử API trả về rawPrice (giá đã giảm) và rawDiscount (số tiền giảm)
    const totalPrice = combos.reduce((sum, item) => sum + (item.rawPrice || 0), 0);
    const totalSaving = combos.reduce((sum, item) => sum + (item.rawDiscount || 0), 0);
    const totalOriginalPrice = totalPrice + totalSaving;

    // Tính % giảm giá tổng
    const totalPercent = totalOriginalPrice > 0 
        ? Math.round((totalSaving / totalOriginalPrice) * 100) 
        : 0;

    // Hàm format tiền tệ (nếu cần dùng lại)
    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
    };

    useEffect(() => {
        const fetchCombos = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                // Gọi API lấy danh sách combo
                const data = await productService.getCombos(slug);
                setCombos(data);
            } catch (err) {
                console.error("Lỗi tải combo:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCombos();
    }, [slug]);

    // Nếu đang tải hoặc không có combo nào -> Ẩn section này đi
    if (!loading && combos.length === 0) return null;

    return (
        <div className="combo-wrapper">
            <div className="container">
                <div className="combo-container">
                    
                    {/* 1. Header */}
                    <div className="combo-header">
                        <svg width="28" height="28" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="combo-icon">
                            <path d="M12.4155 5.12246C12.3089 5.01889..." fill="#CB1C22"/> {/* (Giữ nguyên path SVG của bạn) */}
                        </svg>
                        <h4 className="combo-title">Giảm thêm khi mua kèm</h4>
                    </div>

                    {/* 2. Tabs (Giả lập tab "Gói Phụ kiện Chuẩn" mặc định) */}
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
                        <div className="combo-actions">
                            <button className="combo-btn-cart-icon">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="#cb1c22">

                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.33398 4.66699C3.7817 4.66699 3.33398 5.11471 3.33398 5.66699C3.33398 6.21928 3.7817 6.66699 4.33398 6.66699H5.07834C5.27901 6.66699 5.50314 6.75873 5.78429 7.27192C6.07381 7.80039 6.26865 8.50767 6.47625 9.26477L6.47897 9.2747L8.1571 14.9397L9.17109 18.6344C9.60812 20.2269 11.0557 21.3307 12.707 21.3307H20.6378C22.2756 21.3307 23.7148 20.2446 24.1639 18.6696L26.6009 10.1241C26.9044 9.05955 26.105 8.00033 24.9981 8.00033H8.33505C8.28964 8.00033 8.24474 8.00211 8.20041 8.0056C8.03675 7.45123 7.82754 6.83891 7.53831 6.31098C7.10442 5.51898 6.34563 4.66699 5.07834 4.66699H4.33398ZM14.6673 25.3337C14.6673 26.8064 13.4734 28.0003 12.0007 28.0003C10.5279 28.0003 9.33398 26.8064 9.33398 25.3337C9.33398 23.8609 10.5279 22.667 12.0007 22.667C13.4734 22.667 14.6673 23.8609 14.6673 25.3337ZM24.0007 25.3337C24.0007 26.8064 22.8067 28.0003 21.334 28.0003C19.8612 28.0003 18.6673 26.8064 18.6673 25.3337C18.6673 23.8609 19.8612 22.667 21.334 22.667C22.8067 22.667 24.0007 23.8609 24.0007 25.3337ZM16.75 10C17.0922 10 17.3696 10.2774 17.3696 10.6196V14.1304H20.8804C21.2226 14.1304 21.5 14.4078 21.5 14.75C21.5 15.0922 21.2226 15.3696 20.8804 15.3696H17.3696V18.8804C17.3696 19.2226 17.0922 19.5 16.75 19.5C16.4078 19.5 16.1304 19.2226 16.1304 18.8804V15.3696H12.6196C12.2774 15.3696 12 15.0922 12 14.75C12 14.4078 12.2774 14.1304 12.6196 14.1304H16.1304V10.6196C16.1304 10.2774 16.4078 10 16.75 10Z" fill="inherit"></path>

                                </svg>
                            </button>
                            <button className="combo-btn-buy">Chọn mua kèm</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PromotionCombo;