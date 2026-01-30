import React from 'react';
import "./VoucherCenter.css";

// --- Components Con ---

const IconVoucher = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon-voucher" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192.8 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-65.2 29 7.3-29.4 10.7-50.7 10.7-51.1 0-8.3-4.1-16.1-10.9-21-28.9-20.8-46-55.8-46-95.3C24 132 128 64 256 64s232 68 232 176-104 176-232 176z"></path><path d="M240 144h32v80h-32zm0 112h32v32h-32z"></path></svg>
);

const IconCopy = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

const VoucherCenter = () => {
  // Dữ liệu mẫu (Giả lập API)
  const availableVouchers = [
    {
      id: 1,
      image: "https://cdn.hoanghamobile.vn/Uploads/2025/12/19/to-roi-ttbh-1_639017515098730876.png",
      title: "Áp dụng khi thay pin, Màn hình iPhone, iPad, MacBook",
      code: "KTCSMKMTPHH0"
    },
    // Thêm các voucher khác vào đây nếu muốn test scroll ngang
  ];

  const myVouchers = [
    {
      id: 498432,
      title: "Áp dụng khi thay pin, Màn hình iPhone, iPad, MacBook #03102",
      expiry: "28/02/2026 00:00:00",
      code: "KTCSMKMTPHH025586315",
      status: "Chưa sử dụng", // hoặc "Đã sử dụng"
      statusClass: "status-unused"
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

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
                <img src={v.image} alt="Voucher" className="voucher-img" />
              </div>
              <div className="voucher-info-box">
                <div className="voucher-name">{v.title}</div>
                <button className="btn-collect">THU THẬP</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PHẦN 2: VOUCHER CỦA BẠN --- */}
      <div className="voucher-container">
        <div className="my-voucher-header">
          <strong className="section-title" style={{marginBottom: 0}}>Voucher của bạn</strong>
          <a href="#" className="link-policy">
             <span role="img" aria-label="heart">❤️</span> Xem chính sách điểm
          </a>
        </div>

        {/* Header bảng (Chỉ hiện desktop) */}
        <div className="voucher-table-header">
          <div>Nội dung</div>
          <div>Mã voucher</div>
          <div>Trạng thái</div>
          <div>Chức năng</div>
        </div>

        {/* Danh sách voucher */}
        <div className="my-voucher-list">
          {myVouchers.map((mv) => (
            <div key={mv.id} className="voucher-row">
              {/* Cột 1: Nội dung */}
              <div className="col-content">
                <IconVoucher />
                <div className="voucher-text-group">
                  <span className="v-title">{mv.title}</span>
                  <span className="v-date">HSD: {mv.expiry}</span>
                </div>
              </div>

              {/* Cột 2: Mã */}
              <div className="col-code">{mv.code}</div>

              {/* Cột 3: Trạng thái */}
              <div className={`col-status ${mv.statusClass}`}>
                {mv.status}
              </div>

              {/* Cột 4: Chức năng */}
              <div className="col-action">
                <button className="btn-copy" onClick={() => handleCopy(mv.code)}>
                  <IconCopy /> Sao chép
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PHẦN 3: HƯỚNG DẪN SỬ DỤNG --- */ }
      <div className="voucher-container">
        <strong className="section-title">Hướng dẫn sử dụng voucher</strong>
        
        <div className="guide-step">
          <div className="step-num">1</div>
          <div className="step-content">
            Truy cập mục Trung tâm Voucher để lựa chọn mã Voucher phù hợp với nhu cầu của bạn.
          </div>
        </div>

        <div className="guide-step">
          <div className="step-num">2</div>
          <div className="step-content">
            Copy mã Voucher và sử dụng:
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
          <br />
          Sau khi xác nhận đơn hàng, cửa hàng sẽ mời quý khách tới nhận hàng tại cửa hàng hoặc giao hàng tận nơi trong vòng 2 giờ (nội thành).
        </div>
      </div>

    </div>
  );
};

export default VoucherCenter;