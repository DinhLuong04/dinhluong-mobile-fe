import React from "react";
import type { CartItem as CartItemType, CartComboItem } from "../../../types/Product.types";
import { QuantityInput } from "../QuantityInput/QuantityInput";
import "./CartItem.css"; // Import file CSS

interface Props {
  product: CartItemType;
  onUpdateQuantity: (id: number | string, val: number) => void;
  onToggleCheck: (id: number | string) => void;
  onRemove: (id: number | string) => void;
  onToggleCombo: (productId: number | string, comboId: number | string) => void;
}

// Component con ComboItem (tách ra để code gọn hơn)
const ComboItem = ({ item, onToggle }: { item: CartComboItem, onToggle: () => void }) => (
  <div className="combo-item-wrapper">
    <input 
        type="checkbox" 
        checked={item.checked} 
        onChange={onToggle}
        className="combo-checkbox" 
    />
    <img src={item.image} alt={item.name} className="combo-img" />
    <div className="combo-info">
      <div className="combo-name-box">
        <p className="combo-name">{item.name}</p>
      </div>
      <div className="combo-price-box">
        <span className="combo-price-current">
          {item.price.toLocaleString("vi-VN")}đ
        </span>
        {item.originalPrice && item.originalPrice > item.price && (
          <span className="combo-price-original">
            {item.originalPrice.toLocaleString("vi-VN")}đ
          </span>
        )}
      </div>
    </div>
  </div>
);





export const CartItem: React.FC<Props> = ({ 
  product, 
  onUpdateQuantity, 
  onToggleCheck, 
  onRemove, 
  onToggleCombo 
}) => {
  return (
    <div className="cart-item-wrapper">
      
      {/* Container chính: Flex để chia cột trái (Info) và phải (Action) */}
      <div className="item-main-flex">
        
        {/* 1. Checkbox chọn sản phẩm */}
        <div className="checkbox-wrap">
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => onToggleCheck(product.id)}
            className="item-checkbox"
          />
        </div>
        
        {/* 2. Ảnh sản phẩm */}
        <div className="img-wrap">
          <img src={product.image} alt={product.name} className="product-img" />
        </div>

        {/* 3. Thông tin & Giá & Số lượng */}
        <div className="info-wrap">
          
          {/* Hàng 1: Tên SP + Nút Xóa (Luôn hiện) */}
          <div className="info-top-row">
            <div className="info-title-box">
              <h3 style={{margin: 0}}>
                <a href={`/product/${product.slug}`} className="product-name-link">{product.name}</a>
              </h3>
              <div style={{marginTop: '0.25rem'}}>
                 <span className="variant-badge">
                   Màu: {product.colorName} <span className="caret-icon">▼</span>
                 </span>
              </div>
            </div>

            {/* Nút Xóa (Trash Icon) */}
            <button 
                onClick={() => onRemove(product.id)} 
                className="btn-trash"
                title="Xóa sản phẩm"
                type="button"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
            </button>
          </div>

          {/* Hàng 2: Giá & Bộ đếm số lượng */}
          <div className="info-bottom-row">
            
            {/* Giá tiền */}
            <div className="price-box">
              <span className="current-price">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            {/* Bộ tăng giảm số lượng */}
            <div style={{display: 'flex', alignItems: 'center'}}>
              <QuantityInput
                value={product.quantity}
                onChange={(val) => onUpdateQuantity(product.id, val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phần Combo ưu đãi */}
      {product.checked && product.combos && product.combos.length > 0 && (
        <div className="combo-section">
          <div className="combo-header">
            <div className="combo-icon-circle">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M12.4155 5.12246C12.3089 5.01889 12.0131 4.99589 12.0131 4.99589..." fill="#FF5C00"/></svg>
            </div>
            <span className="combo-title">Combo ưu đãi</span>
          </div>
          <div className="combo-list">
            {product.combos.map((combo) => (
              <ComboItem 
                key={combo.id} 
                item={combo} 
                onToggle={() => onToggleCombo(product.id, combo.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};