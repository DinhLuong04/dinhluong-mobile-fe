import React from "react";
import "./OrderItem.css";
import { ArrowRightIcon, GiftIcon, TrendingIcon } from "../Icons";

export const OrderItem = ({ items }: any) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="order-order-card">
      <div className="order-header-title">Sản phẩm trong đơn ({items.length})</div>

      {items.map((item: any, index: number) => {
        const combos = item.combos || [];
        const comboCurrentTotal = combos.reduce((sum: number, c: any) => sum + c.price, 0);

        return (
          <React.Fragment key={item.id}>
            {index > 0 && <hr className="divider" />}

            {/* SẢN PHẨM CHÍNH */}
            <div className="order-product-row">
              <div className="order-product-img-box">
                <img src={item.image} alt={item.name} className="order-product-img" />
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
                  {combos.map((combo: any) => (
                    <div key={combo.id} className="order-combo-item">
                      <div className="order-combo-item-img-box">
                        <img src={combo.image} className="product-img" />
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