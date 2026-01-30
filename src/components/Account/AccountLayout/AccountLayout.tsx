import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountHeader from '../AccountHeader/AccountHeader'; // Component bạn đã làm trước đó
import AccountSidebar from '../AccountSidebar/AccountSidebar';
import './AccountLayout.css';
import AccountNav from '../AccountNav/AccountNav';

const AccountLayout = () => {
  return (
    <div className="account-container">
      {/* Phần Header tổng quan */}
      <AccountHeader />
      <AccountNav/>
      <div className="account-body">
        {/* Sidebar bên trái */}
        <div className="account-sidebar-wrapper">
          <AccountSidebar />
        </div>

        {/* Nội dung thay đổi bên phải */}
        <div className="account-content-wrapper">
           <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;