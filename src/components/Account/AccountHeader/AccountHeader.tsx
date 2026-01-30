import React from 'react';
import "./AccountHeader.css"; 

const AccountHeader = () => {
  // Dữ liệu mẫu
  const userData = {
    name: "End new bie Back",
    phone: "094*****13",
    rank: "S-NULL",
    updateDate: "01/01/2027",
    orders: 0,
    money: 0,
    nextRankMoney: "3.000.000",
    nextRankName: "S-NEW",
    startDate: "01/01/2025"
  };

  return (
    <div className="account-header">
      <div className="account-header__card">
        
        {/* --- Phần 1: Thông tin User --- */}
        <div className="user-info">
          <div className="user-info__avatar-box">
            <img 
              alt="avatar" 
              className="user-info__avatar-img" 
              src="https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg" 
            />
          </div>
          
          <div className="user-info__details">
            <div className="user-info__name">{userData.name}</div>
            
            <div className="user-info__phone">
              {userData.phone}
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16" strokeLinecap="round" strokeLinejoin="round" style={{cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg"><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path><path d="M3 3l18 18"></path></svg>
            </div>

            <div>
              <span className="user-info__rank-badge">{userData.rank}</span>
            </div>

            <div className="user-info__date">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="12" height="12" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 12h3.5"></path><path d="M12 7v5"></path></svg>
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
                <div className="stat-item__value">{userData.money}đ</div>
                <div className="stat-item__label">
                  Tổng tiền tích lũy từ {userData.startDate}
                </div>
                <div className="stat-item__next-rank">
                   Cần chi tiêu thêm <strong>{userData.nextRankMoney}đ</strong> để lên hạng <strong>{userData.nextRankName}</strong>
                </div>
              </div>
            </div>
          </div>
          
          {/* Note Footer */}
          <div className="stats-note">
             <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="14" height="14" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"></path><path d="M9 7l4 0"></path><path d="M9 11l4 0"></path></svg>
             Tổng tiền và số đơn hàng được tính chung từ CellphoneS và Điện Thoại Vui.
          </div>
        </div>

        {/* --- Phần 3: Kênh thành viên --- */}
       

      </div>
    </div>
  );
};

export default AccountHeader;