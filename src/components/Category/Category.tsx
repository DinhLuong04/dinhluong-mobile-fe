import React, { useState } from "react";
import "./Category.css";
import { mainCategories } from "../../types/menuData"; // Giữ import của bạn
import { useNavigate } from "react-router-dom";

interface CategoryProps {
    onClose?: () => void; // Thêm prop onClose
}

const Category: React.FC<CategoryProps> = ({ onClose }) => {
  const [activeId, setActiveId] = useState<number | null>(
    mainCategories && mainCategories.length > 0 ? mainCategories[0].id : null
  );
  const navigate = useNavigate();

  const handleCategoryClick = (path: string) => {
      navigate(path);
      if (onClose) onClose(); // Đóng menu sau khi click chọn danh mục
  };

  return (
    <div className="container">
      <div className="category-container">
        
        {/* --- HEADER MOBILE (Chỉ hiện trên mobile) --- */}
        <div className="mobile-category-header">
            <h3>Danh mục sản phẩm</h3>
            <button className="close-menu-btn" onClick={onClose}>✕</button>
        </div>

        <ul className="category-list">
          {mainCategories.map((cat) => (
            <li 
              key={cat.id} 
              className={`category-item ${activeId === cat.id ? "active" : ""}`}
              onMouseEnter={() => setActiveId(cat.id)}
              onClick={() => handleCategoryClick(cat.path)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {cat.label}
              </span>
              {cat.hasMegaMenu && <span className="arrow-right">›</span>}
            </li>
          ))}
        </ul>

        <div className="left-menu-banner">
            <a href="#" className="banner-link">
                <img 
                    src="https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/opt1_36152d3691.png" 
                    alt="Quảng cáo dưới menu" 
                />
            </a>
        </div>

      </div>
    </div>
  );
};

export default Category;