import React, { useState } from "react";
import "./CheckoutSummary.css";
import { CoinIcon, ChevronDownIcon } from "../Icons";

export const CheckoutSummary = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  // Dữ liệu mẫu
  const totalPrice = 39577000;
  const totalDiscount = -889000;
  const productDiscount = 889000;
  const voucherDiscount = 0;
  const finalPrice = 38688000;
  const rewardPoints = 9672;

  return (
    <div className="summary-container">
      <p className="summary-title">Thông tin đơn hàng</p>

      {/* Tổng tiền */}
      <div className="summary-row">
        <span>Tổng tiền</span>
        <span className="row-val">{totalPrice.toLocaleString("vi-VN")}đ</span>
      </div>

      <div className="dashed-divider"></div>

      {/* Khuyến mãi */}
      <div className="summary-row">
        <span>Tổng khuyến mãi</span>
        <span className="row-val highlight">{totalDiscount.toLocaleString("vi-VN")}đ</span>
      </div>

      {/* Chi tiết khuyến mãi */}
      <div className="promo-detail">
        <div className="promo-item">
          <div className="flex items-center">
            <span className="dot-separator"></span>
            Giảm giá sản phẩm
          </div>
          <span className="row-val">{productDiscount.toLocaleString("vi-VN")}đ</span>
        </div>
        <div className="promo-item">
          <div className="flex items-center">
            <span className="dot-separator"></span>
            Voucher
          </div>
          <span className="row-val">{voucherDiscount.toLocaleString("vi-VN")}đ</span>
        </div>
      </div>

      {/* Phí vận chuyển */}
      <div className="summary-row">
        <span>Phí vận chuyển</span>
        <span className="row-val">Miễn phí</span>
      </div>

      <div className="dashed-divider"></div>

      {/* Cần thanh toán */}
      <div className="total-row">
        <span className="total-label">Cần thanh toán</span>
        <span className="total-value">{finalPrice.toLocaleString("vi-VN")}đ</span>
      </div>

      {/* Điểm thưởng */}
      <div className="points-row">
        <span>Điểm thưởng</span>
        <div className="points-badge">
          <CoinIcon />
          <span>+{rewardPoints.toLocaleString("vi-VN")}</span>
        </div>
      </div>

      {/* Nút đặt hàng */}
      <button className="btn-order">Đặt hàng</button>

      {/* Điều khoản */}
      <div className="policy-text">
        <input type="checkbox" className="checkbox-sm" defaultChecked />
        <span>
          Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
          <span className="policy-link">Điều khoản dịch vụ</span> và{" "}
          <span className="policy-link">Chính sách xử lý dữ liệu cá nhân</span> của FPT Shop.
        </span>
      </div>

      {/* Accordion Tùy chọn */}
      <div className="options-accordion">
        <div 
            className="accordion-header" 
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <span>Tùy chọn</span>
          <div style={{ transform: isOptionsOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
             <ChevronDownIcon />
          </div>
        </div>

        {isOptionsOpen && (
          <div className="accordion-content">
            <label className="option-item">
              <input type="checkbox" className="checkbox-sm" defaultChecked />
              <span>Tích điểm chương trình thân thiết trong hệ sinh thái Tập đoàn FPT</span>
            </label>
            <label className="option-item">
              <input type="checkbox" className="checkbox-sm" defaultChecked />
              <span>Hỗ trợ CSKH, đổi trả sản phẩm</span>
            </label>
            <label className="option-item">
              <input type="checkbox" className="checkbox-sm" defaultChecked />
              <span>Thông báo sản phẩm, dịch vụ mới, quyền lợi khuyến mãi</span>
            </label>
          </div>
        )}
      </div>
      
      {/* SVG Footer Wave (Trang trí) */}
      <div style={{marginTop: '12px', width: '100%', overflow: 'hidden', color: '#e5e7eb'}}>
         <svg viewBox="0 0 403 28" fill="none" style={{width: '100%', height: 'auto', display: 'block'}}>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H403V18.8171C403 21.7846 403 23.2683 402.487 24.4282C401.883 25.7925 400.792 26.8829 399.428 27.4867C398.268 28 396.785 28 393.817 28C391.534 28 390.392 28 389.652 27.808C388.208 27.4337..." fill="currentColor"/>
         </svg>
      </div>

    </div>
  );
};