import React, { useState } from "react";
import "./Category.css";
import { mainCategories, phoneMegaData, type TrendIcon, type SubMenuColumn } from "../../types/menuData";
import { useNavigate } from "react-router-dom";

const Category: React.FC = () => {
  // Lấy activeId mặc định là item đầu tiên
  const [activeId, setActiveId] = useState<number | null>(
    mainCategories && mainCategories.length > 0 ? mainCategories[0].id : null
  );
  const navigate = useNavigate(); // 2. Khởi tạo navigate

  // 3. Hàm xử lý khi click vào menu
  const handleCategoryClick = (path: string) => {
      navigate(path); // Chuyển hướng đến /dien-thoai, /phu-kien...
  };
  return (
    <div className="container">
      <div className="category-container">
        
        {/* --- PHẦN 1: DANH SÁCH MENU (GIỮ NGUYÊN) --- */}
        <ul className="category-list">
          {mainCategories.map((cat) => (
            <li 
              key={cat.id} 
              // Kiểm tra active
              className={`category-item ${activeId === cat.id ? "active" : ""}`}
              // Sự kiện hover để đổi activeId
              onMouseEnter={() => setActiveId(cat.id)}
              onClick={() => handleCategoryClick(cat.path)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {cat.label}
              </span>
              {cat.hasMegaMenu && <span className="arrow-right">›</span>}

              {/* Render Mega Menu (Nội dung bên phải khi hover) */}
             
            </li>
          ))}
        </ul>

        {/* --- PHẦN 2: BANNER DƯỚI CATEGORY (ĐẶT Ở ĐÂY LÀ ĐÚNG) --- */}
        {/* Nằm ngoài thẻ <ul> nhưng vẫn trong thẻ <div className="category-container"> */}
        
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