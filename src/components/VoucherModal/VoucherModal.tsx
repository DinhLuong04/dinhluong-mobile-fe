import React from 'react';
import './VoucherModal.css';

export const VoucherModal = ({ vouchers, onSelect, onClose, currentTotal }: any) => {
    return (
        <div className="modal-overlay">
            <div className="voucher-modal">
                <div className="modal-header">
                    <h3>Chọn mã giảm giá</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {vouchers.length === 0 ? (
                        <p>Hiện không có mã giảm giá nào phù hợp với đơn hàng của bạn.</p>
                    ) : (
                        vouchers.map((v: any) => {
                            const isEligible = currentTotal >= v.minOrderAmount;
                            return (
                                <div key={v.id} className={`voucher-card ${!isEligible ? 'disabled' : ''}`}>
                                    <div className="voucher-info">
                                        <p className="v-code">{v.code}</p>
                                        <p className="v-desc">
                                            Giảm {v.discountType === 'PERCENT' ? `${v.discount}%` : `${v.discount.toLocaleString()}đ`}
                                        </p>
                                        <p className="v-condition">Đơn tối thiểu {v.minOrderAmount.toLocaleString()}đ</p>
                                    </div>
                                    <button 
                                        className="btn-select" 
                                        disabled={!isEligible}
                                        onClick={() => onSelect(v)}
                                    >
                                        Sử dụng
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};