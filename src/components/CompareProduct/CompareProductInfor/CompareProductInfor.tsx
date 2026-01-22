import React, { useState, useEffect } from 'react';
import type { ProductDetail } from '../../../types/Product.types';
import './CompareProductInfor.css';
import { Link } from 'react-router-dom';
interface Props {
  products: ProductDetail[];
  onRemove: (id: number | string) => void;
  // Nhận props từ cha
  showDiff: boolean;
  onShowDiffChange: (checked: boolean) => void;
}

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Xử lý Scroll Spy (Tự động Active Tab khi cuộn tới phần tương ứng)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Mapping ID với Tab name
                if (entry.target.id === 'highlight-specs') {
                    setActiveTab('highlight');
                } else if (entry.target.id === 'all-specifics') {
                    setActiveTab('detail');
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-150px 0px -50% 0px', // Điều chỉnh vùng nhận diện (Offset header)
        threshold: 0.1
    });

    const highlightSection = document.getElementById('highlight-specs');
    const detailSection = document.getElementById('all-specifics');

    if (highlightSection) observer.observe(highlightSection);
    if (detailSection) observer.observe(detailSection);

    return () => observer.disconnect();
  }, []); // Chạy 1 lần khi mount

  // 3. Hàm click tab -> Cuộn mượt
  const scrollToSection = (id: string, tab: 'highlight' | 'detail') => {
    // A. Active ngay lập tức để giao diện phản hồi nhanh
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
        {/* ... (Phần hiển thị sản phẩm giữ nguyên) ... */}
         <div className="compare-heading"><h3>So sánh sản phẩm</h3></div>
         {products.length > 0 ? (
          <div className="compare-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <button className="btn-remove" onClick={() => onRemove(product.id)}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
                <div className="product-thumb">
                 <Link to={`/Product/${product.slug}`}><img src={(product.productImages?.length > 0) ? product.productImages[0] : (product.thumbnail || "")} alt={product.name} /></Link> 
                </div>
                <div className="product-info">
                   <div className="price-box"><span className="price-final">{formatCurrency(product.price)}</span></div>
                   <div className="price-box"><span className="price-original">{formatCurrency(product.originalPrice)}</span></div>
                   <Link to={`/Product/${product.slug}`}><div className="product-name">{product.name}</div></Link>
                   <Link to={`/Product/${product.slug}`}><button className="btn-buy">Mua ngay</button></Link>
                </div>
              </div>
            ))}
            {[...Array(Math.max(0, 3 - products.length))].map((_, index) => (
               <div key={`empty-${index}`} className="add-more-item"><div className="add-more">+</div><p className="add-more-text">Thêm sản phẩm</p></div>
            ))}
          </div>
        ) : <div className="empty-state">Chưa có sản phẩm</div>}

        {/* --- PHẦN CONTROLS --- */}
        <div className="compare-controls">
            <ul className="compare-tabs">
                <li 
                    className={`tab-item ${activeTab === 'highlight' ? 'active' : ''}`}
                    onClick={() => scrollToSection('highlight-specs', 'highlight')}
                >
                    Thông số nổi bật
                </li>
                <li 
                    className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
                   onClick={() => scrollToSection('all-specifics', 'detail')}
                >
                    Thông tin chi tiết
                </li>
            </ul>

            <div className="diff-toggle">
                <input 
                    id="diff-check" 
                    type="checkbox" 
                    checked={showDiff}
                    onChange={(e) => onShowDiffChange(e.target.checked)} // Gọi hàm từ props
                />
                <label htmlFor="diff-check">Chỉ xem điểm khác biệt</label>
            </div>
        </div>

      </div>
    </div>
  );
};
export default CompareProductInfor;