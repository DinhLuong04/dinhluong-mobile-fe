import React, { useState, useEffect } from 'react';
import type { ProductDetailResponse } from '../../../types/product.types'; 
import './CompareProductInfor.css';
import { Link } from 'react-router-dom';

interface Props {
  products: ProductDetailResponse[]; 
  onRemove: (id: number | string) => void;
  showDiff: boolean;
  onShowDiffChange: (checked: boolean) => void;
}

const MAX_COMPARE_COLUMNS = 3; 

const CompareProductInfor: React.FC<Props> = ({ products, onRemove, showDiff, onShowDiffChange }) => {
  const [isStuck, setIsStuck] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlight' | 'detail'>('highlight');

  const formatCurrency = (amount?: number) => 
    (amount !== undefined && amount !== null)
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount) 
      : 'Đang cập nhật';

  // 1. Xử lý Sticky Header
  useEffect(() => {
    const handleScroll = () => setIsStuck(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true }); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Xử lý Scroll Spy (Tự động Active Tab khi cuộn)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'highlight-specs') {
                    setActiveTab('highlight');
                } else if (entry.target.id === 'all-specifics') {
                    setActiveTab('detail');
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-150px 0px -50% 0px', 
        threshold: 0.1
    });

    const highlightSection = document.getElementById('highlight-specs');
    const detailSection = document.getElementById('all-specifics');

    if (highlightSection) observer.observe(highlightSection);
    if (detailSection) observer.observe(detailSection);

    return () => observer.disconnect();
  }, []);

  // 3. Hàm click tab -> Cuộn mượt
  const scrollToSection = (id: string, tab: 'highlight' | 'detail') => {
    setActiveTab(tab); 

    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 768; 
      const offset = isMobile ? 400 : 225;
       
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
         <div className="compare-heading"><h3>So sánh sản phẩm</h3></div>
         
         {products.length > 0 ? (
          <div className="compare-list">
            {products.map(product => {
              const productId = product.id ?? "";
              const productImage = (product.productImages && product.productImages.length > 0) 
                ? product.productImages[0] 
                : (product.thumbnail || "");

              return (
                <div key={productId} className="product-item">
                  <button 
                    type="button" 
                    className="btn-remove" 
                    onClick={() => onRemove(productId)}
                    aria-label="Xóa sản phẩm"
                  >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  
                  <div className="product-thumb">
                   <Link to={`/product/${product.slug}`}>
                      <img src={productImage} alt={product.name || 'Sản phẩm'} loading="lazy" />
                   </Link> 
                  </div>

                  <div className="product-info">
                      <div className="price-box"><span className="price-final">{formatCurrency(product.price)}</span></div>
                      <div className="price-box"><span className="price-original">{formatCurrency(product.originalPrice)}</span></div>
                      
                      {/* Đảm bảo dùng đúng route chữ thường /product/... */}
                      <Link to={`/product/${product.slug}`} className="product-name">
                        {product.name}
                      </Link>
                      
                      <Link to={`/product/${product.slug}`}>
                        <button type="button" className="btn-buy">Mua ngay</button>
                      </Link>
                  </div>
                </div>
              );
            })}

            {/* Render các ô trống thêm sản phẩm */}
            {[...Array(Math.max(0, MAX_COMPARE_COLUMNS - products.length))].map((_, index) => (
                <div key={`empty-${index}`} className="add-more-item">
                  <div className="add-more">+</div>
                  <p className="add-more-text">Thêm sản phẩm</p>
                </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">Chưa có sản phẩm nào được chọn để so sánh</div>
        )}

        {/* --- PHẦN CONTROLS --- */}
        <div className="compare-controls">
            <ul className="compare-tabs">
                <li 
                    className={`tab-item ${activeTab === 'highlight' ? 'active' : ''}`}
                    onClick={() => scrollToSection('highlight-specs', 'highlight')}
                    role="button"
                    tabIndex={0}
                >
                    Thông số nổi bật
                </li>
                <li 
                    className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
                   onClick={() => scrollToSection('all-specifics', 'detail')}
                   role="button"
                   tabIndex={0}
                >
                    Thông tin chi tiết
                </li>
            </ul>

            <div className="diff-toggle">
                <input 
                    id="diff-check" 
                    type="checkbox" 
                    checked={showDiff}
                    onChange={(e) => onShowDiffChange(e.target.checked)} 
                />
                <label htmlFor="diff-check">Chỉ xem điểm khác biệt</label>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CompareProductInfor;