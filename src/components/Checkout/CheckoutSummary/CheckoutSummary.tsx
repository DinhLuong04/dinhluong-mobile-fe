import "./CheckoutSummary.css";
import { VoucherModal } from "../../VoucherModal/VoucherModal";
import { useCheckoutSummary } from "./useCheckoutSummary";

export const CheckoutSummary = ({ summary, onPlaceOrder, onVoucherApply }: any) => {
    const {
        vouchers, isVoucherModalOpen, setIsVoucherModalOpen,
        totalPrice, totalDiscount, appliedVoucher,
        finalCalculatedPrice,
        openVoucherModal, handleSelectVoucher
    } = useCheckoutSummary(summary, onVoucherApply);

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
                onClick={openVoucherModal}
            >
                <span style={{ color: '#cb1c22' }}>
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
                    <span style={{ color: '#cb1c22' }}>›</span>
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
                    {finalCalculatedPrice.toLocaleString("vi-VN")}đ
                </span>
            </div>
            
            {/* Nút đặt hàng gọi hàm của component cha */}
            <button className="btn-order" onClick={onPlaceOrder}>Đặt hàng</button>
        </div>
    );
};