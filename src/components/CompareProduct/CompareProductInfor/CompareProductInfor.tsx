import React, { useState, useEffect } from 'react';
import './CompareProductInfor.css'; // Import file CSS ở trên
import { COMPARE_PRODUCTS } from './data'; // File data giả lập
import Breadcrumb from '../../ProductDetail/Breadcrumb/Breadcrumb';

const CompareProductInfor: React.FC = () => {
  const [products, setProducts] = useState(COMPARE_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'highlight' | 'detail'>('detail');
  const [showDiff, setShowDiff] = useState(false);

  // Format tiền tệ
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  // Xử lý xóa sản phẩm
  const handleRemove = (id: string | number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // 1. Tạo biến để lưu trạng thái "đang dính"
  const [isStuck, setIsStuck] = useState(false);

  // 2. Dùng useEffect để lắng nghe việc cuộn chuột
  useEffect(() => {
    const handleScroll = () => {
      // Logic: Nếu cuộn xuống quá 60px (khoảng chiều cao của Breadcrumb/Header trên cùng)
      // thì coi như là "đã dính"
      const threshold = 60; // Bạn có thể tăng giảm số này tùy thực tế

      if (window.scrollY > threshold) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };

    // Gắn sự kiện khi vào trang
    window.addEventListener('scroll', handleScroll);

    // Dọn dẹp sự kiện khi rời trang (để tránh lỗi)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='pd-compare'>
      <div className='container'>
        <Breadcrumb/>
        <div className={`compare-section ${isStuck ? 'is-stuck' : ''}`}>
          <div className="compare-container">

            {/* Tiêu đề */}
            <div className="compare-heading">
              <h3>So sánh sản phẩm</h3>
            </div>

            {/* Lưới sản phẩm */}
            {products.length > 0 ? (
              <div className="compare-list">
                {products.map(product => (
                  <div key={product.id} className="product-item">
                    {/* Nút Xóa */}
                    <button
                      className="btn-remove"
                      onClick={() => handleRemove(product.id)}
                      title="Xóa"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.2 4.4L4.3 4.3C4.7 3.9 5.2 3.9 5.6 4.2L5.7 4.3L12 10.6L18.3 4.3C18.7 3.9 19.3 3.9 19.7 4.3C20.1 4.7 20.1 5.3 19.7 5.7L13.4 12L19.7 18.3C20.1 18.7 20.1 19.2 19.8 19.6L19.7 19.7C19.3 20.1 18.8 20.1 18.4 19.8L18.3 19.7L12 13.4L5.7 19.7C5.3 20.1 4.7 20.1 4.3 19.7C3.9 19.3 3.9 18.7 4.3 18.3L10.6 12L4.3 5.7C3.9 5.3 3.9 4.8 4.2 4.4Z" fill="currentColor"></path>
                      </svg>
                    </button>

                    {/* Ảnh */}
                    <div className="product-thumb">
                      <img src={product.image} alt={product.name} loading="lazy" />
                    </div>

                    {/* Thông tin */}
                    <div className="product-info">
                      <div className="product-details-top">
                        <div className="price-box">
                          <span className="price-final">{formatCurrency(product.price)}</span>
                          <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                        </div>
                        <a href={`/product/${product.id}`} className="product-name" title={product.name}>
                          {product.name}
                        </a>
                      </div>
                      <button className="btn-buy">Mua ngay</button>
                    </div>
                  </div>
                ))}
                {[...Array(3 - products.length)].map((_, index) => (
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

            {/* Thanh điều hướng & Filter */}
            <div className="compare-controls">
              {/* Tabs */}
              <ul className="compare-tabs">
                <li
                  className={`tab-item ${activeTab === 'highlight' ? 'active' : ''}`}
                  onClick={() => setActiveTab('highlight')}
                >
                  Thông số nổi bật
                </li>
                <li
                  className={`tab-item ${activeTab === 'detail' ? 'active' : ''}`}
                  onClick={() => setActiveTab('detail')}
                >
                  Thông tin chi tiết
                </li>
              </ul>

              {/* Checkbox */}
              <div className="diff-toggle">
                <input
                  id="diff-check"
                  type="checkbox"
                  checked={showDiff}
                  onChange={(e) => setShowDiff(e.target.checked)}
                />
                <label htmlFor="diff-check">Chỉ xem điểm khác biệt</label>
              </div>
            </div>

          </div>
        </div>
        </div>
        </div>


  );
};

export default CompareProductInfor;