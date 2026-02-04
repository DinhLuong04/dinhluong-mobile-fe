import React from 'react';
import './ProductCard.css';
import type { Product } from '../../../types/Product.types';
import { useNavigate } from 'react-router-dom';
export interface ProductSpec {
    icon: string;
    label: string;
    subLabel?: string;
}

export interface ProductVariant {
    label: string;
    active?: boolean;
}

export interface ProductColor {
    hex: string;
}


// --- 2. Props của Component ---
interface ProductCardProps {
    product: Product; // Đổi tên prop từ 'data' sang 'product' cho chuẩn ngữ nghĩa
    onCompare?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onCompare }) => {

    const navigate = useNavigate();

    // Xử lý chuyển trang
    const handleGoToDetail = (e: React.MouseEvent) => {
        e.stopPropagation(); // Chặn sự kiện nổi bọt

        // QUAN TRỌNG: Dùng luôn product.id vì nó đã là slug (VD: xiaomi-redmi-note-15)
        // Đường dẫn sẽ là: domain.com/xiaomi-redmi-note-15
        navigate(`Product/${product.slug}`, { state: { product } });
    };


    // --- Helper: Format tiền tệ (VND) ---
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // --- Helper: Tính % giảm giá ---
    const calculateDiscountPercent = (original: number, current: number) => {
        if (!original || original <= current) return null;
        return Math.round(((original - current) / original) * 100);
    };

    const discountPercent = product.originalPrice
        ? calculateDiscountPercent(product.originalPrice, product.price)
        : null;


    return (
        <div className="product-card" >
            <div className="card-top">

                {/* 1. Ảnh sản phẩm */}
                <div className="card-image-wrapper" onClick={handleGoToDetail}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                </div>

                {/* 2. Thông số kỹ thuật (Icon tròn) */}
                {product.specs && product.specs.length > 0 && (
                    <div className="card-specs">
                        {product.specs.slice(0, 3).map((spec, index) => (
                            <div key={index} className="spec-item">
                                <img src={spec.icon} alt="" className="spec-icon" />
                                <span>{spec.label}</span>
                                <span>{spec.subLabel}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="card-info">
                    {/* 3. Badge (Trả góp) */}
                    <div className="card-badges">
                        {product.installmentText && <span className="badge-installment">{product.installmentText}</span>}
                    </div>

                    {/* 4. Giá & Giảm giá */}
                    <div className="card-price-area">
                        {product.originalPrice && (
                            <div className="price-row">
                                <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                                {discountPercent && (
                                    <span className="discount-percent">-{discountPercent}%</span>
                                )}
                            </div>
                        )}
                        <span className="price-current">{formatCurrency(product.price)}</span>
                        {product.discountNote && <span className="price-note">{product.discountNote}</span>}
                    </div>

                    {/* 5. Countdown (Đếm ngược)
            {product.countDown && (
                <div style={{fontSize: '12px', color:'#F59E0B', fontWeight: 600, marginBottom:'4px'}}>
                    ⏱ {product.countDown}
                </div>
            )} */}

                    {/* 6. Tên sản phẩm */}
                    <h3 className="card-title" onClick={handleGoToDetail} title={product.name}>{product.name}</h3>

                    {/* 7. Màu sắc */}
                    {product.colors && (
                        <div className="card-colors">
                            {product.colors.map((color, idx) => (
                                <div key={idx} className="color-dot" style={{ backgroundColor: color.hex }}></div>
                            ))}
                        </div>
                    )}

                    {/* 8. Các phiên bản (Dung lượng) */}
                    {product.variants && (
                        <div className="card-variants">
                            {product.variants.map((v, idx) => (
                                <div
                                    key={idx}
                                    className={`variant-btn ${v.active ? 'active' : ''}`}
                                >
                                    {v.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 9. Footer: Khuyến mãi & So sánh */}
            <div className="card-footer">
                {product.promotions && product.promotions.length > 0 && (
                    <div className="promo-logos">
                        {product.promotions.map((img, idx) => (
                            <img key={idx} src={img} alt="promo" className="promo-img" />
                        ))}
                    </div>
                )}

                {/* Dùng \u00A0 để giữ khoảng trống nếu không có text, tránh vỡ layout */}
                <p className="promo-text">{product.promotionText || '\u00A0'}</p>

                <button
                    className="btn-compare"
                    onClick={(e) => {
                        e.stopPropagation(); // Ngăn click vào card khi bấm nút so sánh
                        if (onCompare) {
                            onCompare(product); // Gọi hàm onCompare và truyền sản phẩm vào
                        }
                        console.log('Thêm vào so sánh:', product.name);
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 10C6.5 9.72386 6.72386 9.5 7 9.5H10V6.5C10 6.22386 10.2239 6 10.5 6C10.7761 6 11 6.22386 11 6.5V9.5H14C14.2761 9.5 14.5 9.72386 14.5 10C14.5 10.2761 14.2761 10.5 14 10.5H11V13.5C11 13.7761 10.7761 14 10.5 14C10.2239 14 10 13.7761 10 13.5V10.5H7C6.72386 10.5 6.5 10.2761 6.5 10ZM10.5 18C14.9183 18 18.5 14.4183 18.5 10C18.5 5.58172 14.9183 2 10.5 2C6.08172 2 2.5 5.58172 2.5 10C2.5 14.4183 6.08172 18 10.5 18ZM10.5 17C6.63401 17 3.5 13.866 3.5 10C3.5 6.13401 6.63401 3 10.5 3C14.366 3 17.5 6.13401 17.5 10C17.5 13.866 14.366 17 10.5 17Z" fill="currentColor"></path>
                    </svg>
                    Thêm vào so sánh
                </button>
            </div>
        </div>
    );
};

export default ProductCard;