import React from 'react';
import { NavLink } from 'react-router-dom';
import "./AccountSidebar.css";

const AccountSidebar = () => {
    // KHẮC PHỤC: Thêm type annotation (path: React.ReactNode)
    const renderIcon = (path: React.ReactNode) => (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
        >
            {path}
        </svg>
    );

    return (
        <div className="account-sidebar">
            <div className="sidebar-menu">
                {/* === NHÓM 1: Quản lý đơn hàng === */}
                <NavLink to="/member" end className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
                    {renderIcon(<><path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105"></path><path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0"></path></>)}
                    <span>Tổng quan</span>
                </NavLink>

                <NavLink to="/member/order" className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
                    {renderIcon(<><path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"></path><path d="M9 7l4 0"></path><path d="M9 11l4 0"></path></>)}
                    <span>Lịch sử mua hàng</span>
                </NavLink>

                {/* === NHÓM 3: Thông tin & Hỗ trợ === */}
                <NavLink to="/member/profile" className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
                    {renderIcon(<><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path></>)}
                    <span>Thông tin tài khoản</span>
                </NavLink>
                <NavLink to="/member/voucher" className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
                    {renderIcon(<>
                        {/* Hình dáng cái vé */}
                        <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9z"></path>
                        {/* 2 cái khuyết tròn ở giữa vé */}
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        {/* Đường kẻ đứt đoạn ở giữa (tùy chọn) */}
                        <path d="M9 12h6"></path>
                    </>)}
                    <span>Trung tâm voucher</span>
                </NavLink>

                <a href="#" target="_blank" rel="noreferrer" className="sidebar-item">
                    {renderIcon(<><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M9 9l1 0"></path><path d="M9 13l6 0"></path><path d="M9 17l6 0"></path></>)}
                    <span>Chính sách bảo hành</span>
                </a>

                <NavLink to="/member/suport" className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}>
                    {renderIcon(<><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path><path d="M3 7l9 6l9 -6"></path></>)}
                    <span>Góp ý - Phản hồi - Hỗ trợ</span>
                </NavLink>

                <a href="#" target="_blank" rel="noreferrer" className="sidebar-item">
                    {renderIcon(<><path d="M13 15v-6a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v4"></path><path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9"></path><path d="M16 22l5 -5"></path><path d="M21 21.5v-4.5h-4.5"></path><path d="M16 9h2"></path></>)}
                    <span>Điều khoản sử dụng</span>
                </a>

                <div className="sidebar-divider"></div>

                <button className="sidebar-item" onClick={() => alert("Đăng xuất thành công!")}>
                    {renderIcon(<><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path></>)}
                    <span>Đăng xuất</span>
                </button>
            </div>


        </div>
    );
};

export default AccountSidebar;