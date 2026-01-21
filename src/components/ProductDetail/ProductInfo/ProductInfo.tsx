import React, { useState, useMemo } from 'react';
import "./ProductInfo.css";
import type { ProductDetail, VariantDetail } from '../../../types/Product.types';

interface ProductInfoProps {
    product: ProductDetail;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const { 
        name, 
        storageOptions = [], 
        colorOptions = [], 
        variants = [], 
        promotions = [],
        installmentText,
        originalPrice: defaultOriginalPrice,
        price: defaultPrice
    } = product;

    // 1. State lựa chọn (Input của User) - GIỮ NGUYÊN
    const [selectedStorage, setSelectedStorage] = useState<string>(() => storageOptions.length > 0 ? storageOptions[0] : "");
    const [selectedColor, setSelectedColor] = useState<string>(() => colorOptions.length > 0 ? colorOptions[0].name : "");

    // 2. Logic tìm biến thể (Derived State) - THAY THẾ CHO useEffect
    // Tự động tính toán lại mỗi khi selectedStorage hoặc selectedColor thay đổi
    const selectedVariant = useMemo(() => {
        if (!variants || variants.length === 0) return null;
        return variants.find((v: VariantDetail) => 
            v.rom === selectedStorage && v.colorName === selectedColor
        );
    }, [selectedStorage, selectedColor, variants]);

    // 3. Xác định giá trị hiển thị (Nếu tìm thấy variant thì lấy variant, không thì lấy mặc định)
    const displayPrice = selectedVariant ? selectedVariant.price : defaultPrice;
    const currentSku = selectedVariant ? selectedVariant.sku : "---";
    const currentStock = selectedVariant ? selectedVariant.stock : 0;
    
    // Logic giá gốc: Hiện tại lấy giá gốc chung, nếu variant có giá gốc riêng thì sửa ở đây
    const currentOriginalPrice = defaultOriginalPrice; 

    // Helper: Format tiền tệ
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Helper: Tính % giảm giá
    const discountPercent = useMemo(() => {
        if (currentOriginalPrice > displayPrice && currentOriginalPrice > 0) {
            return Math.round(((currentOriginalPrice - displayPrice) / currentOriginalPrice) * 100);
        }
        return 0;
    }, [displayPrice, currentOriginalPrice]);

    return (
        <div className="pd-right-col">
            <h1 className="pd-title">{name} {selectedStorage}</h1>
            
            <div className="pd-rating-row">
                <span className="pd-product-sku">No.{currentSku}</span>
                <div className="pd-rating-star">
                    <span className="star-icon">★</span>
                    <span className="rating-num">4.9</span>
                </div>
                <a href="#reviews" className="pd-rating-count">179 đánh giá</a>
                <span className="pd-divider">|</span>
                <a href="#tech-specs" className="pd-tech-specs">Thông số kỹ thuật</a>
            </div>

            {/* Chọn Dung lượng */}
            <div className="pd-option-group">
                <div className="pd-option-label">Dung lượng</div>
                <div className="pd-options">
                    {storageOptions.map((opt) => (
                        <button
                            key={opt}
                            className={`pd-btn-option ${selectedStorage === opt ? 'active' : ''}`}
                            onClick={() => setSelectedStorage(opt)}
                        >
                            <span className="opt-text">{opt}</span>
                            {selectedStorage === opt && <span className="pd-check-triangle"></span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chọn Màu sắc */}
            <div className="pd-option-group">
                <div className="pd-option-label">Màu sắc</div>
                <div className="pd-options">
                    {colorOptions.map((color) => (
                        <button
                            key={color.name}
                            className={`pd-btn-option ${selectedColor === color.name ? 'active' : ''}`}
                            onClick={() => setSelectedColor(color.name)}
                        >
                            <img src={color.img || "https://placehold.co/20x20"} alt={color.name} className="pd-color-img" />
                            <span className="opt-text">{color.name}</span>
                            {selectedColor === color.name && <span className="pd-check-triangle"></span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pd-game-banner">
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/apple_507x85_6370b903fe.png" alt="Banner" />
            </div>

            {/* Box Giá */}
            <div className="pd-price-box">
                <div className="pd-price-main">
                    <span className="pd-price-current">{formatCurrency(displayPrice)}</span>
                    
                    {currentOriginalPrice > displayPrice && (
                        <div className="pd-price-sub">
                            <span className="pd-price-old">{formatCurrency(currentOriginalPrice)}</span>
                            <span className="pd-discount-tag">-{discountPercent}%</span>
                        </div>
                    )}
                </div>
                <div className="pd-bonus-point">
                    <span className="bonus-icon">+</span> {Math.round(displayPrice / 1000)} Điểm thưởng
                </div>
                
                {installmentText && (
                    <div className="pd-installment-info">
                        <span className="text-or">Hoặc</span>
                        <div className="installment-col">
                            <span className="ins-label">Trả góp</span>
                            <span className="ins-price">{installmentText}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Khuyến mãi */}
            {promotions && promotions.length > 0 && (
                <div className="pd-promo-box">
                    <div className="pd-promo-header">
                        <span className="promo-icon">🎁</span> Khuyến mãi được hưởng
                    </div>
                    <ul className="pd-promo-list">
                        {promotions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="pd-actions">
                <button className="spb-btn-cart-1 icon-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="#cb1c22">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.33398 4.66699C3.7817 4.66699 3.33398 5.11471 3.33398 5.66699C3.33398 6.21928 3.7817 6.66699 4.33398 6.66699H5.07834C5.27901 6.66699 5.50314 6.75873 5.78429 7.27192C6.07381 7.80039 6.26865 8.50767 6.47625 9.26477L6.47897 9.2747L8.1571 14.9397L9.17109 18.6344C9.60812 20.2269 11.0557 21.3307 12.707 21.3307H20.6378C22.2756 21.3307 23.7148 20.2446 24.1639 18.6696L26.6009 10.1241C26.9044 9.05955 26.105 8.00033 24.9981 8.00033H8.33505C8.28964 8.00033 8.24474 8.00211 8.20041 8.0056C8.03675 7.45123 7.82754 6.83891 7.53831 6.31098C7.10442 5.51898 6.34563 4.66699 5.07834 4.66699H4.33398ZM14.6673 25.3337C14.6673 26.8064 13.4734 28.0003 12.0007 28.0003C10.5279 28.0003 9.33398 26.8064 9.33398 25.3337C9.33398 23.8609 10.5279 22.667 12.0007 22.667C13.4734 22.667 14.6673 23.8609 14.6673 25.3337ZM24.0007 25.3337C24.0007 26.8064 22.8067 28.0003 21.334 28.0003C19.8612 28.0003 18.6673 26.8064 18.6673 25.3337C18.6673 23.8609 19.8612 22.667 21.334 22.667C22.8067 22.667 24.0007 23.8609 24.0007 25.3337ZM16.75 10C17.0922 10 17.3696 10.2774 17.3696 10.6196V14.1304H20.8804C21.2226 14.1304 21.5 14.4078 21.5 14.75C21.5 15.0922 21.2226 15.3696 20.8804 15.3696H17.3696V18.8804C17.3696 19.2226 17.0922 19.5 16.75 19.5C16.4078 19.5 16.1304 19.2226 16.1304 18.8804V15.3696H12.6196C12.2774 15.3696 12 15.0922 12 14.75C12 14.4078 12.2774 14.1304 12.6196 14.1304H16.1304V10.6196C16.1304 10.2774 16.4078 10 16.75 10Z" fill="inherit"></path>
                    </svg>
                </button>

                <button className={`pd-btn-buy ${currentStock <= 0 ? 'disabled' : ''}`} disabled={currentStock <= 0}>
                    {currentStock > 0 ? "Mua ngay" : "Tạm hết hàng"}
                    <span className="pd-btn-subtext">Giao hàng miễn phí hoặc nhận tại shop</span>
                </button>

                <button className="pd-btn-installment">
                    Trả góp 0%
                    <span className="pd-btn-subtext">Duyệt hồ sơ trong 5 phút</span>
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;