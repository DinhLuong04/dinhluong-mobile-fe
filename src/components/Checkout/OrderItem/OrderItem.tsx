import React from "react";
import "./OrderItem.css";
import { TrendingIcon } from "../Icons";
import type { CartItemType, CartComboItem } from "../../../types/cart.types";

interface OrderItemProps {
  items: CartItemType[];
}

export const OrderItem: React.FC<OrderItemProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="order-order-card">
      <h3 className="order-header-title">Sản phẩm trong đơn ({items.length})</h3>

      {items.map((item, index) => {
        const combos = item.combos || [];

        return (
          <React.Fragment key={item.id}>
            {index > 0 && <hr className="divider" />}

            {/* SẢN PHẨM CHÍNH */}
            <div className="order-product-row">
              <div className="order-product-img-box">
                <img
                  src={item.image || "https://placehold.co/100x100"}
                  alt={item.name}
                  className="order-product-img"
                  loading="lazy"
                />
              </div>
              <div className="order-product-info">
                <div className="order-product-name-row">
                  <div>
                    <div className="order-product-name">{item.name}</div>
                    <span className="order-product-variant-badge">Màu: {item.colorName}</span>
                  </div>
                  <div className="order-product-meta-right">
                    <span className="order-product-qty">x{item.quantity}</span>
                    <span className="order-price-current">{item.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* COMBO MUA KÈM */}
            {combos.length > 0 && (
              <div className="order-combo-container">
                <div className="order-combo-header">
                  <TrendingIcon /> <span>Phụ kiện mua kèm</span>
                </div>
                <div className="order-combo-list">
                  {combos.map((combo: CartComboItem) => (
                    <div key={combo.id} className="order-combo-item">
                      <div className="order-combo-item-img-box">
                        <img
                          src={combo.image || "https://placehold.co/100x100"}
                          alt={combo.name}
                          className="product-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="order-combo-item-content">
                        <div className="order-combo-item-name">{combo.name}</div>
                        <div className="order-combo-price-row">
                          <span className="order-cp-curr">{combo.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};