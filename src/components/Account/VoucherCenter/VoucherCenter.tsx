import React from 'react';
import { useVoucherCenter } from './useVoucherCenter';
import "./VoucherCenter.css";
import {IconVoucher} from './VoucherCenterIcons';

const IconCopy = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

const VoucherCenter: React.FC = () => {
    const {
        availableVouchers, myVouchers, loading,
        handleCollect, handleCopy
    } = useVoucherCenter();

    if (loading) {
        return <div style={{textAlign: "center", padding: "100px"}}>Đang tải trung tâm voucher...</div>;
    }

    return (
        <div className="voucher-center">
            <div className="voucher-title-main">Trung tâm Voucher</div>

            {/* --- PHẦN 1: NHẬN VOUCHER ƯU ĐÃI --- */}
            <div className="voucher-container">
                <strong className="section-title">Nhận voucher ưu đãi từ Đình Lương</strong>
                <div className="voucher-carousel">
                    {availableVouchers.map((v) => (
                        <div key={v.id} className="voucher-item-avail">
                            <div className="voucher-img-box">
                                <img src="https://res.cloudinary.com/dhujtl4cm/image/upload/v1772182601/voucher_dtyoio.jpg" alt="Voucher" className="voucher-img" />
                            </div>
                            <div className="voucher-info-box">
                                <div className="voucher-name">
                                    Giảm {v.discountType === 'PERCENT' ? `${v?.discount || 0}%` : `${(v?.discount || 0).toLocaleString()}đ`} 
                                    <br/> Đơn tối thiểu: {(v?.minOrderAmount || 0).toLocaleString()}đ
                                </div>
                                <button className="btn-collect" onClick={() => handleCollect(v.id!)}>THU THẬP</button>
                            </div>
                        </div>
                    ))}
                    {availableVouchers.length === 0 && <p>Hiện không có voucher nào khả dụng.</p>}
                </div>
            </div>

            {/* --- PHẦN 2: VOUCHER CỦA BẠN --- */}
            <div className="voucher-container">
                <div className="my-voucher-header">
                    <strong className="section-title" style={{marginBottom: 0}}>Voucher của bạn</strong>
                </div>

                <div className="voucher-table-header">
                    <div>Nội dung</div>
                    <div>Mã voucher</div>
                    <div>Trạng thái</div>
                </div>

                <div className="my-voucher-list">
                    {myVouchers.map((mv) => {
                        const vData = mv.voucher; 
                        const isUsed = mv.isUsed;
                        const statusText = isUsed ? "Đã sử dụng" : "Chưa sử dụng";
                        const statusClass = isUsed ? "status-used" : "status-unused"; 

                        return (
                            <div key={mv.id} className="voucher-row">
                                <div className="col-content">
                                    <IconVoucher />
                                    <div className="voucher-text-group">
                                        <span className="v-title">
                                            Giảm {vData?.discountType === 'PERCENT' ? `${vData?.discount || 0}%` : `${(vData?.discount || 0).toLocaleString()}đ`}
                                        </span>
                                        <span className="v-date">
                                            HSD: {vData?.expiryDate ? new Date(vData.expiryDate).toLocaleString('vi-VN') : 'Không rõ'}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-code">
                                    <span style={{ cursor: 'pointer' }} onClick={() => handleCopy(vData?.code)} title="Bấm để copy mã">
                                        {vData?.code} <IconCopy />
                                    </span>
                                </div>

                                <div className={`col-status ${statusClass}`}>
                                    {statusText}
                                </div>
                            </div>
                        );
                    })}
                    {myVouchers.length === 0 && <p>Bạn chưa có voucher nào trong ví.</p>}
                </div>
            </div>

            {/* --- PHẦN 3: HƯỚNG DẪN SỬ DỤNG --- */}
            <div className="voucher-container">
                <strong className="section-title">Hướng dẫn sử dụng voucher</strong>
                <div className="guide-step">
                    <div className="step-content">
                        Truy cập mục Trung tâm Voucher để lựa chọn mã Voucher phù hợp với nhu cầu của bạn.
                    </div>
                </div>

                <div className="guide-detail">
                    <strong>Đặt hàng online:</strong>
                    <br />
                    Tiến hành đặt hàng trên website, dán mã Voucher vào ô "Mã giảm giá" để được áp dụng ưu đãi.
                    <br /><br />
                    <strong>Mua trực tiếp tại cửa hàng:</strong>
                    <br />
                    Đưa mã giảm giá cho nhân viên bán hàng để nhập trực tiếp vào phiếu bán (không cần đặt đơn hàng trên website).
                </div>
            </div>
        </div>
    );
};

export default VoucherCenter;