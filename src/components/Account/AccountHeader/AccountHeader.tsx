import React from 'react';
import "./AccountHeader.css";
import { useAccountHeader } from './useAccountHeader';

const AccountHeader: React.FC = () => {
  const { user, userData, loading } = useAccountHeader();

  if (loading || !userData) {
    return <div className="account-header">Đang tải thông tin...</div>;
  }

  const avatarUrl = user?.avatar || "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg";

  return (
    <div className="account-header">
      <div className="account-header__card">

        {/* --- Phần 1: Thông tin User --- */}
        <div className="user-info">
          <div className="user-info__avatar-box">
            <img alt="avatar" className="user-info__avatar-img" src={avatarUrl} />
          </div>

          <div className="user-info__details">
            <div className="user-info__name">{userData.name}</div>
            <div className="user-info__phone">
              {userData.phone}
              {/* Icon chỉnh sửa */}
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16" style={{ cursor: 'pointer', marginLeft: '8px' }}><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>
            </div>
            <div>
              <span className="user-info__rank-badge">{userData.rank}</span>
            </div>
            <div className="user-info__date">
              Cập nhật lại sau {userData.updateDate}
            </div>
          </div>
        </div>

        {/* --- Phần 2: Thống kê --- */}
        <div className="stats-section">
          <div className="stats-row">
            {/* Cột: Số đơn hàng */}
            <div className="stat-item">
              <div className="stat-item__bar"></div>
              <div className="stat-item__icon-box">
                <img alt="cart" className="stat-item__icon-img" src="https://cdn-static.smember.com.vn/_next/static/media/cart-icon.3e4e1d83.svg" />
              </div>
              <div className="stat-item__content">
                <div className="stat-item__value">{userData.orders}</div>
                <div className="stat-item__label">Tổng số đơn hàng</div>
              </div>
            </div>

            {/* Cột: Tổng tiền */}
            <div className="stat-item">
              <div className="stat-item__bar"></div>
              <div className="stat-item__icon-box">
                <img alt="money" className="stat-item__icon-img" src="https://cdn-static.smember.com.vn/_next/static/media/money-icon.3e6b67af.svg" />
              </div>
              <div className="stat-item__content">
                <div className="stat-item__value">{Number(userData.money).toLocaleString('vi-VN')}đ</div>
                <div className="stat-item__label">
                  Tổng tiền tích lũy từ {userData.startDate}
                </div>
                <div className="stat-item__next-rank">
                  Cần chi tiêu thêm <strong>{Number(userData.nextRankMoney).toLocaleString('vi-VN')}đ</strong> để lên hạng <strong>{userData.nextRankName}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountHeader;