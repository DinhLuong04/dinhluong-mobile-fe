import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountHeader from '../AccountHeader/AccountHeader'; 
import AccountSidebar from '../AccountSidebar/AccountSidebar';
import AccountNav from '../AccountNav/AccountNav';
import './AccountLayout.css';

const AccountLayout: React.FC = () => {
  return (
    <div className="account-container">
      {/* Phần Header tổng quan */}
      <AccountHeader />
      
      {/* Thanh điều hướng ngang (Mobile/Tablet) */}
      <AccountNav />

      <div className="account-body">
        {/* Sidebar bên trái chuyển thành <aside> để chuẩn SEO và Trình đọc màn hình */}
        <aside className="account-sidebar-wrapper">
          <AccountSidebar />
        </aside>

        {/* Nội dung thay đổi bên phải chuyển thành <main> vì đây là nội dung cốt lõi */}
        <main className="account-content-wrapper">
           <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;