import React, { useState } from "react";
import "./CheckoutSummary.css";
// import { CoinIcon, ChevronDownIcon } from "../Icons"; // Bỏ comment nếu bạn có dùng các icon này
import { VoucherModal } from "../../VoucherModal/VoucherModal";

export const CheckoutSummary = ({ summary, onPlaceOrder, onVoucherApply }: any) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  
  // Bóc tách dữ liệu từ summary của cha
  const { 
    totalPrice = 0, 
    totalDiscount = 0, 
    finalPrice = 0, 
    appliedVoucher = null 
  } = summary || {};

  const openVoucherModal = async () => {
    try {
        const userStr = localStorage.getItem('user');
        const token = userStr ? JSON.parse(userStr).token : '';

        const res = await fetch(`http://localhost:8080/api/vouchers/my-vouchers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await res.json();
        
        if (data.code === 200) {
            // Lọc bỏ voucher đã sử dụng và bóc tách object "voucher" bên trong ra
            const usableVouchers = (data.data || [])
                .filter((item: any) => item.isUsed === false) // Chỉ lấy voucher chưa dùng
                .map((item: any) => item.voucher);            // Lấy object chi tiết voucher bên trong

            setVouchers(usableVouchers); 
        } else {
            setVouchers([]);
        }
        
        setIsVoucherModalOpen(true);
    } catch (error) {
        console.error("Lỗi lấy voucher", error);
    }
  };

  const handleSelectVoucher = (voucher: any) => {
      let calcDiscount = 0;
      
      // Tính toán số tiền được giảm
      if (voucher.discountType === 'FIXED') {
          calcDiscount = voucher.discount;
      } else if (voucher.discountType === 'PERCENT') {
          calcDiscount = (totalPrice * voucher.discount) / 100;
      }

      // Đảm bảo không giảm quá số tiền khách cần trả
      if (calcDiscount > finalPrice) {
          calcDiscount = finalPrice;
      }

      // Đóng gói lại voucher kèm theo số tiền giảm thực tế để hiển thị
      const processedVoucher = { ...voucher, discountValue: calcDiscount };
      
      onVoucherApply(processedVoucher); 
      setIsVoucherModalOpen(false);
  };

  const rewardPoints = Math.floor(finalPrice / 1000);

  return (
    <div className="summary-container">
      {/* 1. Phần chọn Voucher */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer', 
          border: '1px dashed #cb1c22', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '15px' 
        }}
      >
        <span style={{ color: '#cb1c22' }} onClick={openVoucherModal}>
            🎫 {appliedVoucher ? `Đang áp dụng: ${appliedVoucher.code}` : "Chọn mã ưu đãi"}
        </span>
        
        {appliedVoucher ? (
            <span 
              style={{ color: '#999', fontSize: '18px', padding: '0 5px' }} 
              onClick={(e) => { 
                e.stopPropagation(); // Ngăn không cho sự kiện click lan ra ngoài mở Modal lên lại
                onVoucherApply(null); 
              }}
            >
                &times;
            </span>
        ) : (
            <span style={{ color: '#cb1c22' }} onClick={openVoucherModal}>›</span>
        )}
      </div>

      {/* Hiển thị Popup Modal nếu isVoucherModalOpen = true */}
      {isVoucherModalOpen && (
        <VoucherModal 
            vouchers={vouchers} 
            currentTotal={totalPrice}
            onSelect={handleSelectVoucher}
            onClose={() => setIsVoucherModalOpen(false)}
        />
      )}

      <p className="summary-title">Thông tin đơn hàng</p>

      <div className="summary-row">
        <span>Tổng tiền</span>
        <span className="row-val">{(totalPrice || 0).toLocaleString("vi-VN")}đ</span>
      </div>

      <div className="dashed-divider"></div>

      {/* 2. Hiển thị khuyến mãi sản phẩm */}
      <div className="summary-row">
        <span>Khuyến mãi sản phẩm</span>
        <span className="row-val highlight">
            -{(totalDiscount || 0).toLocaleString("vi-VN")}đ
        </span>
      </div>

      {/* 3. Hiển thị thêm trường Voucher (Chỉ hiện khi có áp dụng) */}
      {appliedVoucher && (
        <div className="summary-row">
          <span>Mã giảm giá ({appliedVoucher.code})</span>
          <span className="row-val highlight">
              -{(appliedVoucher.discountValue || 0).toLocaleString("vi-VN")}đ
          </span>
        </div>
      )}

      <div className="summary-row">
        <span>Phí vận chuyển</span>
        <span className="row-val">Miễn phí</span>
      </div>

      <div className="dashed-divider"></div>

      <div className="total-row">
        <span className="total-label">Cần thanh toán</span>
        <span className="total-value">
            {/* Tiền cuối cùng đã trừ Voucher */}
            {Math.max(0, finalPrice - (appliedVoucher?.discountValue || 0)).toLocaleString("vi-VN")}đ
        </span>
      </div>
      
      {/* Nút đặt hàng gọi hàm của component cha */}
      <button className="btn-order" onClick={onPlaceOrder}>Đặt hàng</button>

      {/* Nếu bạn có phần điều khoản, accordion ở dưới thì thêm tiếp vào đây nhé */}
    </div>
  );
};