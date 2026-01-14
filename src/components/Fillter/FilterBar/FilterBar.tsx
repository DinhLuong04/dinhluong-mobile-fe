import React from 'react';
import './FiterBar.css';

interface MobileFilterBarProps {
  onOpenFilter: () => void;
}

const MobileFilterBar: React.FC<MobileFilterBarProps> = ({ onOpenFilter }) => {
  return (
    <div className="mobile-filter-bar">
      {/* Bên trái: List các nút sort ngang */}
      <div className="mobile-sort-scroll">
        <button className="mobile-sort-btn active">
           Nổi bật
           {/* Icon tam giác góc nếu cần */}
        </button>
        <button className="mobile-sort-btn">Giá tăng dần</button>
        <button className="mobile-sort-btn">Giá giảm dần</button>
        <button className="mobile-sort-btn">Trả góp 0%</button>
      </div>

      {/* Vách ngăn mờ */}
      <div className="mobile-filter-divider"></div>

      {/* Bên phải: Nút LỌC */}
      <button className="mobile-filter-trigger-btn" onClick={onOpenFilter}>
        <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 16H14.5C15.0523 16 15.5 16.4477 15.5 17C15.5 17.5128 15.114 17.9355 14.6166 17.9933L14.5 18H10.5C9.94772 18 9.5 17.5523 9.5 17C9.5 16.4872 9.88604 16.0645 10.3834 16.0067L10.5 16H14.5H10.5ZM8.5 11H16.5C17.0523 11 17.5 11.4477 17.5 12C17.5 12.5128 17.114 12.9355 16.6166 12.9933L16.5 13H8.5C7.94772 13 7.5 12.5523 7.5 12C7.5 11.4872 7.88604 11.0645 8.38338 11.0067L8.5 11H16.5H8.5ZM5.5 6H19.5C20.0523 6 20.5 6.44772 20.5 7C20.5 7.51284 20.114 7.93551 19.6166 7.99327L19.5 8H5.5C4.94772 8 4.5 7.55228 4.5 7C4.5 6.48716 4.88604 6.06449 5.38338 6.00673L5.5 6H19.5H5.5Z" fill="#090D14"/>
        </svg>
        <span>Lọc</span>
      </button>
    </div>
  );
};

export default MobileFilterBar;