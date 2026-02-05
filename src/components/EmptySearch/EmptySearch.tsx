import React from 'react';
import './EmptySearch.css'; // Nhớ import file CSS

interface EmptySearchProps {
  keyword?: string;
}

const EmptySearch: React.FC<EmptySearchProps> = ({ keyword }) => {
  return (
    <div className="empty-search-container">
      <div className="empty-search-card">
        
        {/* Cột trái: Nội dung Text */}
        <div className="empty-search-content">
          <p className="empty-title">
            Không tìm thấy kết quả cho <span>"{keyword}"</span>
          </p>
          
          <div className="empty-suggestions">
            <div className="suggestion-item">
              <span className="dot-icon"></span>
              <span className="text">
                Kiểm tra lỗi chính tả với từ khoá đã nhập
              </span>
            </div>
            
            <div className="suggestion-item">
              <span className="dot-icon"></span>
              <span className="text">
                Trong trường hợp cần hỗ trợ, hãy liên hệ với DinhLuong MOBILE qua tổng đài miễn phí{' '}
                <span className="highlight-text">1800 6601 (Nhánh 1)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Cột phải: Hình ảnh */}
        <div className="empty-search-image">
             <img
                alt="empty search"
                loading="lazy"
                src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:format(webp):quality(75)/estore-v2/img/empty_state.png"
                srcSet="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/estore-v2/img/empty_state.png 1x, https://cdn2.fptshop.com.vn/unsafe/640x0/filters:format(webp):quality(75)/estore-v2/img/empty_state.png 2x"
            />
        </div>
       
      </div>
    </div>
  );
};

export default EmptySearch;