import React from "react";
import "./Category.css";
import { mainCategories, phoneMegaData, type TrendIcon,type SubMenuColumn } from "../../types/menuData";

const Category: React.FC = () => {
  return (
    <div className="category-container">
      <ul className="category-list">
        {mainCategories.map((cat) => (
          <li key={cat.id} className="category-item">
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Bạn có thể thêm icon cho từng mục ở đây nếu muốn */}
              {cat.label}
            </span>
            {cat.hasMegaMenu && <span className="arrow-right">›</span>}

            {/* --- MEGA MENU AREA (Chỉ render nếu hasMegaMenu = true) --- */}
            {cat.hasMegaMenu && (
              <div className="mega-menu">
                
                {/* 1. SECTION: Gợi ý (Trend) */}
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

                {/* 2. SECTION: Thương hiệu */}
                <div className="brand-grid">
                  {phoneMegaData.brands.map((brandUrl: string, index: number) => (
                    <div key={index} className="brand-badge">
                      <img src={brandUrl} alt={`brand-${index}`} />
                    </div>
                  ))}
                </div>

                {/* 3. SECTION: Danh sách chi tiết */}
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
            {/* --- END MEGA MENU --- */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;