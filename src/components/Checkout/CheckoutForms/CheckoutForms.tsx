import React, { useState } from "react";
import "./CheckoutForms.css";
import { InfoIcon, LocationArrowIcon } from "../Icons";

// --- 1. FORM NGƯỜI ĐẶT HÀNG ---
export const OrdererForm = () => {
  return (
    <div className="checkout-section">
      <span className="section-title">Người đặt hàng</span>
      <div className="form-group">
        <div className="input-wrapper">
          <input className="form-input" placeholder="Họ và tên" type="text" />
        </div>
        <div className="input-wrapper">
          <input className="form-input" placeholder="Số điện thoại" maxLength={10} type="text" />
        </div>
        <div className="input-wrapper">
          <input className="form-input" placeholder="Email (Không bắt buộc)" type="email" />
        </div>
      </div>
    </div>
  );
};

// --- 2. FORM HÌNH THỨC NHẬN HÀNG ---
export const DeliveryForm = () => {
  const [deliveryType, setDeliveryType] = useState<"shipping" | "store">("shipping");
  const [isOtherReceiver, setIsOtherReceiver] = useState(false);

  return (
    <div className="checkout-section">
      <p className="section-title">Hình thức nhận hàng</p>
      
      {/* Radio chọn hình thức */}
      <div className="radio-group">
        <label className="radio-item">
          <input 
            type="radio" 
            name="delivery" 
            className="radio-input"
            checked={deliveryType === "shipping"} 
            onChange={() => setDeliveryType("shipping")}
          />
          <span className="radio-label">Giao hàng tận nơi</span>
        </label>
        
        <label className="radio-item">
          <input 
            type="radio" 
            name="delivery" 
            className="radio-input"
            checked={deliveryType === "store"} 
            onChange={() => setDeliveryType("store")}
          />
          <span className="radio-label">Nhận tại cửa hàng</span>
        </label>
      </div>

      {/* Input Địa chỉ (Giả lập Dropdown) */}
      <div className="location-select">
        <span className="location-placeholder">Tỉnh/Thành Phố, Phường Xã</span>
        <LocationArrowIcon />
      </div>

      {/* Ghi chú */}
      <div className="input-wrapper">
        <textarea 
          className="form-textarea" 
          maxLength={128} 
          placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)" 
          rows={4}
        ></textarea>
        <div className="char-count">0/128</div>
      </div>

      {/* Checkbox: Nhờ người khác nhận hàng */}
      <div className="checkbox-group">
        <div>
          <label className="checkbox-item">
            <input 
              type="checkbox" 
              className="checkbox-input" 
              checked={isOtherReceiver}
              onChange={(e) => setIsOtherReceiver(e.target.checked)}
            />
            <span className="checkbox-label">Nhờ người khác nhận hàng</span>
          </label>

          {/* Form ẩn hiện khi check */}
          <div className={`hidden-form ${isOtherReceiver ? 'show' : ''}`}>
            <input className="form-input" placeholder="Họ và tên người nhận" type="text" />
            <input className="form-input" placeholder="Số điện thoại người nhận" maxLength={10} type="text" />
          </div>
        </div>

        {/* Checkbox: Yêu cầu kỹ thuật */}
        <label className="checkbox-item">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-label">
            Yêu cầu hỗ trợ kỹ thuật
            <div title="Thông tin thêm">
                <InfoIcon />
            </div>
          </span>
        </label>
      </div>
    </div>
  );
};

// --- 3. TOGGLE HÓA ĐƠN ---
export const InvoiceToggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => setIsChecked(!isChecked);

  return (
    <div className="checkout-section">
      <div className="invoice-row">
        <div className="invoice-left">
          <p className="section-title" style={{marginBottom: 0}}>Xuất hóa đơn điện tử</p>
          <InfoIcon />
        </div>
        
        <button 
          className="switch-btn" 
          role="switch" 
          aria-checked={isChecked}
          data-state={isChecked ? "checked" : "unchecked"}
          onClick={toggle}
        >
          <span className="switch-thumb"></span>
        </button>
      </div>
      
      {/* Nếu muốn hiện form hóa đơn khi bật switch thì thêm ở đây */}
      {isChecked && (
          <div className="hidden-form show" style={{marginTop: '16px', paddingLeft: 0}}>
              <input className="form-input" placeholder="Tên công ty" type="text" />
              <input className="form-input" placeholder="Mã số thuế" type="text" />
              <input className="form-input" placeholder="Địa chỉ công ty" type="text" />
          </div>
      )}
    </div>
  );
};