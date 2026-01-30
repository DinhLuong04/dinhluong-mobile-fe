import React from 'react';
import { Link } from 'react-router-dom'; // Dùng Link thay thẻ a để không reload trang
import "./Overview.css";

const Overview = () => {
  // Dữ liệu banner giả lập
  const banners = [
    { id: 1, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/banner-warm-up-home.png" },
    { id: 2, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/edu-uu-dai-sinh-vien.jpg" },
    { id: 3, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/dac-quyen-online-home.jpg" },
  ];

  return (
    <div className="dashboard-grid">
      
      {/* HÀNG 1: Đơn hàng & Ưu đãi */}
      <div className="dashboard-row">
        {/* Đơn hàng gần đây */}
        <div className="dashboard-card col-2">
          <div className="card-header">
            <div className="card-title">Đơn hàng gần đây</div>
            <Link to="/order" className="card-link">Xem tất cả &gt;</Link>
          </div>
          <div className="empty-state">
            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
            <div className="empty-text">
              Bạn chưa có đơn hàng nào gần đây? <a href="/" className="empty-action">Mua sắm ngay</a>
            </div>
          </div>
        </div>

        {/* Ưu đãi của bạn */}
        <div className="dashboard-card col-1">
          <div className="card-header">
            <div className="card-title">Ưu đãi của bạn</div>
            <Link to="/promotion" className="card-link">Xem tất cả &gt;</Link>
          </div>
          <div className="empty-state">
            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
            <div className="empty-text">
              Bạn chưa có ưu đãi nào. <a href="/" className="empty-action">Xem sản phẩm</a>
            </div>
          </div>
        </div>
      </div>

      {/* HÀNG 2: Sản phẩm yêu thích */}
      <div className="dashboard-row">
        <div className="dashboard-card col-2">
          <div className="card-header">
            <div className="card-title">Sản phẩm yêu thích</div>
          </div>
          <div className="empty-state">
            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
            <div className="empty-text">
              Bạn chưa có sản phẩm nào yêu thích? <a href="/" className="empty-action">Mua sắm ngay</a>
            </div>
          </div>
        </div>
      </div>

      {/* HÀNG 3: Chương trình nổi bật */}
      <div className="dashboard-card">
        <div className="card-header">
          <div className="card-title">Chương trình nổi bật</div>
        </div>
        <div className="banner-list">
          {banners.map((b) => (
            <div key={b.id} className="banner-item">
              <img src={b.src} alt="Banner" className="banner-img" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Overview;