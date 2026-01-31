import React from "react";
import "./OrderItem.css";
import { ArrowRightIcon, GiftIcon, TrendingIcon } from "../Icons"; // Dùng lại file icon cũ

export const OrderItem = () => {
  return (
    <div className="order-order-card">
      <div className="order-header-title">Sản phẩm trong đơn (2)</div>

      {/* === SẢN PHẨM 1: IPHONE === */}
      <div className="order-product-row">
        {/* Ảnh trái */}
        <div className="order-product-img-box">
          <img 
            src="https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/iphone_17_pro_max_cosmic_orange_1_a940b68476.png" 
            alt="iPhone" 
            className="order-product-img" 
          />
        </div>

        {/* Nội dung phải */}
        <div className="order-product-info">
          <div className="order-product-name-row">
            <div>
              <div className="order-product-name">iPhone 17 Pro Max 256GB Cam Vũ Trụ</div>
              <span className="order-product-variant-badge">Màu: Cam Vũ Trụ</span>
            </div>
            
            <div className="order-product-meta-right">
               <span className="order-product-qty">x1</span>
               <span className="order-price-current">37.690.000đ</span>
               <span className="order-price-original">37.990.000đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* === KHỐI COMBO (Nằm dưới sản phẩm 1) === */}
      <div className="order-combo-container">
        <div className="order-combo-header">
          {/* Icon lửa đỏ */}
          <TrendingIcon /> 
          <span>Gói Phụ kiện Chuẩn - iPhone 17 Pro Max</span>
        </div>

        <div className="order-combo-list">
          {/* Combo Item 1 */}
          <div className="order-combo-item">
            <div className="order-combo-item-img-box">
              <img src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/mieng_dan_man_hinh_kinh_cuong_luc_yvs_iphone_17_series_31323bdbc0.jpg" alt="Item" className="product-img" />
            </div>
            <div className="order-combo-item-content">
              <div className="order-combo-item-name">Miếng dán màn hình kính cường lực iPhone 17 Pro Max...</div>
              <div className="order-combo-price-row">
                <span className="order-cp-curr">210.000đ</span>
                <span className="order-cp-old">299.000đ</span>
              </div>
            </div>
          </div>

          {/* Combo Item 2 */}
          <div className="order-combo-item">
            <div className="order-combo-item-img-box">
              <img src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/op_lung_magsafe_iphone_17_pro_max_nhua_tpu_chong_soc_esr_2_e5be612d45.jpg" alt="Item" className="product-img" />
            </div>
            <div className="order-combo-item-content">
              <div className="order-combo-item-name">Ốp lưng magsafe iPhone 17 Pro Max nhựa TPU...</div>
              <div className="order-combo-price-row">
                <span className="order-cp-curr">299.000đ</span>
                <span className="order-cp-old">599.000đ</span>
              </div>
            </div>
          </div>

          {/* Combo Item 3 */}
          <div className="order-combo-item">
            <div className="order-combo-item-img-box">
              <img src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/belkin_25w_adapter_e8169ba68f.png" alt="Item" className="product-img" />
            </div>
            <div className="order-combo-item-content">
              <div className="order-combo-item-name">Củ sạc nhanh Belkin 25W USB-C chuẩn PD/PPS...</div>
              <div className="order-combo-price-row">
                <span className="order-cp-curr">390.000đ</span>
                <span className="order-cp-old">490.000đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tổng tiền Combo */}
        <div className="order-combo-total-row">
          <span className="order-ct-curr">+899.000đ</span>
          <span className="order-ct-old">1.388.000đ</span>
        </div>
      </div>

      <hr className="divider" />

      {/* === SẢN PHẨM 2: ỐP LƯNG === */}
      <div className="order-product-row">
        <div className="order-product-img-box">
          <img 
            src="https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/2024_1_29_638421206925367771_op-lung-xiaomi-redmi-note-13-meetu-da-nang-gia-da-co-de-dung-co-khe-the-den-1.jpg" 
            alt="Op lung" 
            className="order-product-img" 
          />
        </div>

        <div className="order-product-info">
          <div className="order-product-name-row">
            <div>
              <div className="order-product-name">Ốp lưng Xiaomi Redmi Note 13 đa năng giả da có đế dựng</div>
              <span className="order-product-variant-badge">Màu: Đen</span>
            </div>
            
            <div className="order-product-meta-right">
               <span className="order-product-qty">x1</span>
               <span className="order-price-current">99.000đ</span>
               <span className="order-price-original">199.000đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* === QUÀ TẶNG === */}
      <div className="order-gift-tag">
         <GiftIcon />
         <span>5 Quà tặng đơn hàng</span>
         <ArrowRightIcon />
      </div>

    </div>
  );
};