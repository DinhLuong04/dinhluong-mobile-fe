import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./OrderHistory.css";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const tabs = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã giao hàng",
    "Đã huỷ"
  ];

  return (
    <div className="order-history">
      {/* 1. Header Mobile (Ẩn trên Desktop) */}
      <div className="oh-mobile-header">
        Lịch sử mua hàng
      </div>

      <div className="oh-container">
        {/* 2. Tabs Navigation (Sticky) */}
        <div className="oh-tabs-wrapper">
          <div className="oh-tabs">
            {tabs.map((tab) => (
              <div 
                key={tab}
                className={`oh-tab-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Filter Bar (Date Picker) */}
        <div className="oh-filter-bar">
          <span className="oh-title-desktop">Lịch sử mua hàng</span>
          
          <div className="oh-date-picker">
            <input 
              type="text" 
              className="oh-date-input" 
              placeholder="Từ ngày" 
              defaultValue="01/12/2020" 
            />
            {/* Icon mũi tên phải */}
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="oh-date-icon" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l14 0"></path><path d="M13 18l6 -6"></path><path d="M13 6l6 6"></path></svg>
            
            <input 
              type="text" 
              className="oh-date-input" 
              placeholder="Đến ngày" 
              defaultValue="24/01/2026" 
            />
            
            {/* Icon Calendar */}
            <div className="oh-calendar-btn">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            </div>
          </div>
        </div>

        {/* 4. Content Area (Empty State) */}
        <div className="oh-content">
          <div className="oh-empty-box">
            <img 
              src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" 
              alt="No Orders" 
              className="oh-empty-img" 
            />
            <div className="oh-empty-text">
              Bạn chưa có đơn hàng nào.
              <Link to="/" className="oh-empty-link">Trang chủ</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderHistory;