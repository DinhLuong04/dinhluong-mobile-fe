import React from 'react';
import './AccountNav.css';

const AccountNav = () => {
  // Danh sách các mục menu (lấy link ảnh từ code gốc của bạn)
  const navItems = [
    
    {
      label: "Mã giảm giá",
      href: "/member/voucher",
      icon: "https://cdn-static.smember.com.vn/_next/static/media/promotion-icon.99af272d.svg"
    },
    {
      label: "Lịch sử mua hàng",
      href: "/member/order",
      icon: "https://cdn-static.smember.com.vn/_next/static/media/history-icon.2ebe1813.svg"
    },
    {
      label: "Sổ địa chỉ",
      href: "/member/profile",
      icon: "https://cdn-static.smember.com.vn/_next/static/media/address-icon.169a4d95.svg"
    },
    
  ];

  return (
    <div className="account-nav">
      <div className="account-nav__card">
        <div className="account-nav__list">
          {navItems.map((item, index) => (
            <a key={index} href={item.href} className="account-nav__item">
              <div className="account-nav__icon-box">
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="account-nav__icon-img" 
                  loading="lazy"
                />
              </div>
              <span className="account-nav__label">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountNav;