import React from 'react';
import { similarProducts } from './ProductComparisonData';
import './ProductComparison.css';

const ProductComparison = () => {
    return (
        <div className="container pc-wrapper">
            <div className="pc-container">
                
                {/* 1. Header Section */}
                <div className="pc-header">
                    <div className="pc-title-group">
                        <h2 className="pc-title">So sánh sản phẩm tương tự</h2>
                        
                        {/* AI Badge */}
                        <div className="pc-ai-badge">
                            <div className="pc-ai-content">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <g clipPath="url(#clip0_ai)">
                                        <path d="M8.30754 1.21791C8.62441 0.505414 9.60035 0.470726 9.98285 1.11104L10.0382 1.21791L11.015 3.41635C11.868 5.33534 13.2866 6.94816 15.081 8.03916L15.3829 8.21635L17.1172 9.19135C17.2551 9.26854 17.3715 9.37901 17.4557 9.51269C17.54 9.64637 17.5894 9.799 17.5996 9.95669C17.6098 10.1144 17.5803 10.2721 17.5139 10.4155C17.4475 10.5589 17.3463 10.6834 17.2194 10.7776L17.1182 10.8432L15.3829 11.8182C13.5523 12.8479 12.0797 14.412 11.1622 16.3014L11.015 16.6182L10.0382 18.8167C9.72129 19.5292 8.74535 19.5639 8.36285 18.9235L8.30754 18.8167L7.33066 16.6182C6.47766 14.6992 5.05912 13.0864 3.26473 11.9954L2.96285 11.8182L1.22848 10.8432C1.0906 10.766 0.974227 10.6556 0.889973 10.5219C0.805718 10.3882 0.756258 10.2356 0.7461 10.0779C0.735941 9.9202 0.765407 9.76247 0.831813 9.61909C0.898219 9.47571 0.999453 9.35122 1.12629 9.25698L1.22754 9.19135L2.96285 8.21635C4.79343 7.18665 6.26596 5.62253 7.18348 3.73323L7.33066 3.41635L8.30754 1.21791Z" fill="url(#paint0_linear_ai)"/>
                                    </g>
                                    <defs>
                                        <linearGradient id="paint0_linear_ai" x1="6.20915" y1="5.04908" x2="11.6451" y2="17.8977" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FCD34D"/>
                                            <stop offset="0.46" stopColor="#FBBF24"/>
                                            <stop offset="1" stopColor="#D97706"/>
                                        </linearGradient>
                                        <clipPath id="clip0_ai"><rect width="20" height="20" fill="white"/></clipPath>
                                    </defs>
                                </svg>
                                <span className="pc-ai-text">Gợi ý bởi AI</span>
                            </div>
                        </div>
                    </div>

                    <a href="/so-sanh" className="pc-btn-search">
                        <svg width="20" height="20" viewBox="0 0 20 21" fill="none">
                            <path d="M8.5 3.66675C11.5376 3.66675 14 6.12918 14 9.16675C14 10.5055 13.5217 11.7326 12.7266 12.6864L16.8536 16.8132C17.0488 17.0085 17.0488 17.325 16.8536 17.5203C16.68 17.6939 16.4106 17.7132 16.2157 17.5782L16.1464 17.5203L12.0196 13.3933C11.0659 14.1884 9.83879 14.6667 8.5 14.6667C5.46243 14.6667 3 12.2043 3 9.16675C3 6.12918 5.46243 3.66675 8.5 3.66675ZM8.5 4.66675C6.01472 4.66675 4 6.68147 4 9.16675C4 11.652 6.01472 13.6667 8.5 13.6667C10.9853 13.6667 13 11.652 13 9.16675C13 6.68147 10.9853 4.66675 8.5 4.66675Z" fill="#1250DC"/>
                        </svg>
                        Tìm sản phẩm khác để so sánh
                    </a>
                </div>

                {/* 2. Scrollable List */}
                <div className="pc-list">
                    {similarProducts.map((product) => (
                        <div key={product.id} className="pc-item">
                            {/* Phần thông tin cố định chiều cao */}
                            <div className="pc-item-top">
                                <div className="pc-img-box">
                                    <img src={product.image} alt={product.name} className="pc-img" />
                                </div>
                                <a href={product.link} className="pc-name" title={product.name}>
                                    {product.name}
                                </a>
                                <div className="pc-price-box">
                                    <span className="pc-price-current">{product.currentPrice}</span>
                                    <span className="pc-price-old">{product.oldPrice}</span>
                                </div>
                                
                                {/* Hành động: Sản phẩm đang xem hoặc So sánh chi tiết */}
                                <div className="pc-action-box">
                                    {product.isCurrent ? (
                                        <span className="pc-badge-current">Sản phẩm đang xem</span>
                                    ) : (
                                        <a href="#" className="pc-link-compare">
                                            So sánh chi tiết
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 20" fill="currentColor">
                                                <path d="M7.8499 4.20694C8.14982 3.92125 8.62456 3.93279 8.91025 4.23271L13.9116 9.48318C14.1875 9.77285 14.1875 10.2281 13.9116 10.5178L8.91025 15.7682C8.62456 16.0681 8.14982 16.0797 7.8499 15.794C7.54998 15.5083 7.53844 15.0336 7.82413 14.7336L12.3327 10.0005L7.82413 5.26729C7.53844 4.96737 7.54998 4.49264 7.8499 4.20694Z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Các dòng thông số kỹ thuật */}
                            <div className="pc-specs">
                                <div className="pc-spec-row">
                                    <div className="pc-spec-header">
                                        <span className="pc-spec-label">Kích thước màn hình</span>
                                        <hr className="pc-spec-line" />
                                    </div>
                                    <div className="pc-spec-value">{product.screen}</div>
                                </div>
                                
                                <div className="pc-spec-row">
                                    <div className="pc-spec-header">
                                        <span className="pc-spec-label">Dung lượng pin</span>
                                        <hr className="pc-spec-line" />
                                    </div>
                                    <div className="pc-spec-value">{product.battery}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Mobile Button (Chỉ hiện ở mobile) */}
                <div className="pc-mobile-btn-container">
                    <a href="/so-sanh" className="pc-btn-search">
                        <svg width="20" height="20" viewBox="0 0 20 21" fill="none">
                            <path d="M8.5 3.66675C11.5376 3.66675 14 6.12918 14 9.16675C14 10.5055 13.5217 11.7326 12.7266 12.6864L16.8536 16.8132C17.0488 17.0085 17.0488 17.325 16.8536 17.5203C16.68 17.6939 16.4106 17.7132 16.2157 17.5782L16.1464 17.5203L12.0196 13.3933C11.0659 14.1884 9.83879 14.6667 8.5 14.6667C5.46243 14.6667 3 12.2043 3 9.16675C3 6.12918 5.46243 3.66675 8.5 3.66675ZM8.5 4.66675C6.01472 4.66675 4 6.68147 4 9.16675C4 11.652 6.01472 13.6667 8.5 13.6667C10.9853 13.6667 13 11.652 13 9.16675C13 6.68147 10.9853 4.66675 8.5 4.66675Z" fill="#1250DC"/>
                        </svg>
                        Tìm sản phẩm khác để so sánh
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ProductComparison;