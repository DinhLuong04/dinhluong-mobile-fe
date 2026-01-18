import React, { useState } from 'react';
import { storageOptions, colorOptions, promotions } from '../../../pages/ProductDetail/data';
import "./ProductInfo.css";

const ProductInfo = () => {
    const [selectedStorage, setSelectedStorage] = useState("256 GB");
    const [selectedColor, setSelectedColor] = useState("Cam Vũ Trụ");

    return (
        <div className="pd-right-col">
            <h1 className="pd-title">iPhone 17 Pro Max 256GB</h1>
            
            <div className="pd-rating-row">
                <span className="pd-product-sku">No.00921800</span>
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
                            {/* Icon check tam giác ở góc */}
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
                            <img src={color.img} alt="" className="pd-color-img" />
                            <span className="opt-text">{color.name}</span>
                            {selectedColor === color.name && <span className="pd-check-triangle"></span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Banner Game (Thêm vào cho giống mẫu) */}
            <div className="pd-game-banner">
                <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/apple_507x85_6370b903fe.png" alt="Banner" />
            </div>

            {/* Box Giá */}
            <div className="pd-price-box">
                <div className="pd-price-main">
                    <span className="pd-price-current">37.690.000đ</span>
                    <div className="pd-price-sub">
                        <span className="pd-price-old">37.990.000đ</span>
                        <span className="pd-discount-tag">1%</span>
                    </div>
                </div>
                <div className="pd-bonus-point">
                    <span className="bonus-icon">+</span> 9.422 Điểm thưởng
                </div>
                
                {/* Phần trả góp */}
                <div className="pd-installment-info">
                    <span className="text-or">Hoặc</span>
                    <div className="installment-col">
                        <span className="ins-label">Trả góp</span>
                        <span className="ins-price">1.571.493đ<small>/tháng</small></span>
                    </div>
                </div>
            </div>

            {/* Khuyến mãi */}
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

            {/* Nút hành động */}
            <div className="pd-actions">
                <button className="spb-btn-cart-1 icon-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="#cb1c22">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.33398 4.66699C3.7817 4.66699 3.33398 5.11471 3.33398 5.66699C3.33398 6.21928 3.7817 6.66699 4.33398 6.66699H5.07834C5.27901 6.66699 5.50314 6.75873 5.78429 7.27192C6.07381 7.80039 6.26865 8.50767 6.47625 9.26477L6.47897 9.2747L8.1571 14.9397L9.17109 18.6344C9.60812 20.2269 11.0557 21.3307 12.707 21.3307H20.6378C22.2756 21.3307 23.7148 20.2446 24.1639 18.6696L26.6009 10.1241C26.9044 9.05955 26.105 8.00033 24.9981 8.00033H8.33505C8.28964 8.00033 8.24474 8.00211 8.20041 8.0056C8.03675 7.45123 7.82754 6.83891 7.53831 6.31098C7.10442 5.51898 6.34563 4.66699 5.07834 4.66699H4.33398ZM14.6673 25.3337C14.6673 26.8064 13.4734 28.0003 12.0007 28.0003C10.5279 28.0003 9.33398 26.8064 9.33398 25.3337C9.33398 23.8609 10.5279 22.667 12.0007 22.667C13.4734 22.667 14.6673 23.8609 14.6673 25.3337ZM24.0007 25.3337C24.0007 26.8064 22.8067 28.0003 21.334 28.0003C19.8612 28.0003 18.6673 26.8064 18.6673 25.3337C18.6673 23.8609 19.8612 22.667 21.334 22.667C22.8067 22.667 24.0007 23.8609 24.0007 25.3337ZM16.75 10C17.0922 10 17.3696 10.2774 17.3696 10.6196V14.1304H20.8804C21.2226 14.1304 21.5 14.4078 21.5 14.75C21.5 15.0922 21.2226 15.3696 20.8804 15.3696H17.3696V18.8804C17.3696 19.2226 17.0922 19.5 16.75 19.5C16.4078 19.5 16.1304 19.2226 16.1304 18.8804V15.3696H12.6196C12.2774 15.3696 12 15.0922 12 14.75C12 14.4078 12.2774 14.1304 12.6196 14.1304H16.1304V10.6196C16.1304 10.2774 16.4078 10 16.75 10Z" fill="inherit"></path>
                            </svg>
                        </button>
                <button className="pd-btn-buy">
                    Mua ngay
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