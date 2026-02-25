import React, { useState } from "react";
import "./CheckoutForms.css";
import { InfoIcon, LocationArrowIcon } from "../Icons";

export const OrdererForm = ({ formData, onChange }: any) => {
  return (
    <div className="checkout-section">
      <span className="section-title">Người đặt hàng</span>
      <div className="form-group">
        <div className="input-wrapper">
          <input className="form-input" placeholder="Họ và tên" type="text" 
                 value={formData.receiverName} onChange={(e) => onChange('receiverName', e.target.value)} />
        </div>
        <div className="input-wrapper" style={{ marginBottom: '15px' }}>
          <input 
            className="form-input" 
            placeholder="Số điện thoại nhận hàng" 
            maxLength={10} 
            type="text" // Vẫn dùng type="text" nhưng kiểm soát bằng JS để tránh mũi tên tăng giảm số của HTML
            value={formData.receiverPhone || ''} 
            onChange={(e) => {
              // 1. Chỉ lấy các ký tự là số (Loại bỏ toàn bộ chữ cái, ký tự đặc biệt)
              const onlyNums = e.target.value.replace(/[^0-9]/g, '');
              onChange('receiverPhone', onlyNums);
            }} 
            style={{ 
              // Đổi viền sang màu đỏ nếu người dùng đã nhập nhưng sai định dạng
              borderColor: formData.receiverPhone && !/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.receiverPhone) 
                ? '#cb1c22' 
                : '#ccc' 
            }}
          />
          
          {/* 2. Hiển thị dòng cảnh báo lỗi nếu số điện thoại không hợp lệ */}
          {formData.receiverPhone && formData.receiverPhone.length > 0 && !/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.receiverPhone) && (
            <span style={{ color: '#cb1c22', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              Vui lòng nhập số điện thoại hợp lệ (Bắt đầu bằng 03, 05, 07, 08, 09 và đủ 10 số).
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input className="form-input" placeholder="Email (Không bắt buộc)" type="email" 
                 value={formData.receiverEmail} onChange={(e) => onChange('receiverEmail', e.target.value)} />
        </div>
      </div>
    </div>
  );
};



export const InvoiceToggle = () => {
    // ... Giữ nguyên nội dung cũ của bạn
    return <div></div>; 
}