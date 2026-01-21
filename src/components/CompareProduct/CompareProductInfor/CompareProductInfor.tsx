// CompareProductInfor.tsx
import React, { useState, useEffect } from 'react';
import type { ProductDetail } from '../../../types/Product.types';
import './CompareProductInfor.css';

interface Props {
  products: ProductDetail[];
  // Cập nhật type id để khớp với ProductDetail (number | string)
  onRemove: (id: number | string) => void;
  
  // (Optional) Nếu bạn muốn Tabs điều khiển việc ẩn hiện component cha, hãy uncomment dòng dưới
  // onTabChange?: (tab: 'highlight' | 'detail') => void;
  // onDiffChange?: (showDiff: boolean) => void;
}

const CompareProductInfor: React.FC<Props> = ({ products, onRemove }) => {
  const [isStuck, setIsStuck] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlight' | 'detail'>('detail');
  const [showDiff, setShowDiff] = useState(false);

  // Format tiền tệ an toàn
  const formatCurrency = (amount?: number) => 
    (amount !== undefined && amount !== null)
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount) 
      : 'Đang cập nhật';

  // Xử lý scroll để làm Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      // 60px là khoảng chiều cao header/breadcrumb
      setIsStuck(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm scroll đến section (Nếu Tab dùng để scroll)
  const scrollToSection = (id: string, tab: 'highlight' | 'detail') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
        // Trừ đi khoảng cao của sticky header (~200px) để không bị che mất
        const offset = 200; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className={`compare-section ${isStuck ? 'is-stuck' : ''}`}>
      <div className="container">
        
        {/* Heading */}
        <div className="compare-heading">
            <h3>So sánh sản phẩm</h3>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="compare-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                {/* Nút Xóa */}
                <button 
                    className="btn-remove" 
                    onClick={() => onRemove(product.id)}
                    title="Xóa sản phẩm này"
                >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M18 6L6 18M6 6l12 12"/>
                   </svg>
                </button>

                {/* Ảnh sản phẩm */}
                <div className="product-thumb">
                  {/* Logic: Ưu tiên ảnh đầu tiên trong mảng -> thumbnail -> ảnh placeholder */}
                  <img 
                    src={
                        (product.productImages && product.productImages.length > 0) 
                        ? product.productImages[0] 
                        : (product.thumbnail || "https://placehold.co/300x300?text=No+Image")
                    } 
                    alt={product.name} 
                  />
                </div>

                {/* Thông tin & Giá */}
                <div className="product-info">
                  <div className="product-details-top">
                    <div className="price-box">
                      <span className="price-final">{formatCurrency(product.price)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                         <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <a href={`/product/${product.slug}`} className="product-name" title={product.name}>
                        {product.name}
                    </a>
                  </div>
                  <button className="btn-buy">Mua ngay</button>
                </div>
              </div>
            ))}

            {/* Render ô trống (Add More) nếu chưa đủ 3 sản phẩm */}
            {/* Math.max(0, ...) để tránh lỗi nếu lỡ danh sách > 3 */}
            {[...Array(Math.max(0, 3 - products.length))].map((_, index) => (
               <div key={`empty-${index}`} className="add-more-item">
                  <div className="add-more">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="add-more-text">Thêm sản phẩm</p>
               </div>
            ))}
          </div>
        ) : (
           <div className="empty-state">Chưa có sản phẩm để so sánh</div>
        )}
        
        {/* --- PHẦN CONTROLS (TABS & FILTER) --- */}
        <div className="compare-controls">
            {/* Tabs điều hướng */}
            <ul className="compare-tabs">
                <li 
                    className={`tab-item ${activeTab === 'highlight' ? 'active' : ''}`}
                    onClick={() => scrollToSection('highlight-specs', 'highlight')} // Giả sử ID bên kia là highlight-specs
                >
                    Thông số nổi bật
                </li>
                <li 
                    className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
                    onClick={() => scrollToSection('all-specifics', 'detail')} // Giả sử ID bên kia là all-specifics
                >
                    Thông tin chi tiết
                </li>
            </ul>

            {/* Checkbox ẩn hiện điểm khác biệt */}
            <div className="diff-toggle">
                <input 
                    id="diff-check" 
                    type="checkbox" 
                    checked={showDiff}
                    onChange={(e) => {
                        setShowDiff(e.target.checked);
                        // Nếu muốn truyền ra ngoài: props.onDiffChange?.(e.target.checked);
                    }}
                />
                <label htmlFor="diff-check">Chỉ xem điểm khác biệt</label>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CompareProductInfor;