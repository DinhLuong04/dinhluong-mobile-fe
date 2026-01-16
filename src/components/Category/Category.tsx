import React, { useState } from "react";
import "./Category.css";
import { mainCategories, phoneMegaData, type TrendIcon, type SubMenuColumn } from "../../types/menuData";

const Category: React.FC = () => {
  // Lấy activeId mặc định là item đầu tiên
  const [activeId, setActiveId] = useState<number | null>(
    mainCategories && mainCategories.length > 0 ? mainCategories[0].id : null
  );

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
            >
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {cat.label}
              </span>
              {cat.hasMegaMenu && <span className="arrow-right">›</span>}

              {/* Render Mega Menu (Nội dung bên phải khi hover) */}
              {cat.hasMegaMenu && (
                <div className="mega-menu">
                  
                  {/* Section 1: Gợi ý */}
                  <div className="trend-section">
                    <div className="section-title">🔥 Gợi ý cho bạn</div>
                    <div className="trend-grid">
                      {phoneMegaData.trendIcons.map((icon: TrendIcon) => (
                        <div key={icon.id} className="trend-item">
                          <img src={icon.img} alt={icon.name} className="trend-img" />
                          <span className="trend-text">{icon.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 2: Thương hiệu */}
                  <div className="brand-grid">
                    {phoneMegaData.brands.map((brandUrl: string, index: number) => (
                      <div key={index} className="brand-badge">
                        <img src={brandUrl} alt={`brand-${index}`} />
                      </div>
                    ))}
                  </div>

                  {/* Section 3: Cột danh sách */}
                  <div className="menu-columns">
                    {phoneMegaData.columns.map((col: SubMenuColumn, index: number) => (
                      <div key={index} className="menu-col">
                        <div className="col-title">{col.title}</div>
                        <ul className="sub-list">
                          {col.items.map((item: string, idx: number) => (
                            <li key={idx} className="sub-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                </div>
              )}
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