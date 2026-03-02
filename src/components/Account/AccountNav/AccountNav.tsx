import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ConfirmModal } from '../../Common/ConfirmModal/ConfirmModal';
import './AccountNav.css';

const AccountNav = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleConfirmLogout = () => {
        logout();
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/');
        setShowLogoutModal(false);
    };

    // Hàm render Icon SVG (cho các mục lấy từ Sidebar)
    const renderIcon = (path: React.ReactNode) => (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="account-nav__icon-svg" xmlns="http://www.w3.org/2000/svg">
            {path}
        </svg>
    );

    // Mở rộng mảng navItems
    const navItems = [
       // --- Các mục bổ sung từ Sidebar (Chỉ hiện ở Mobile) ---
        {
            label: "Tổng quan",
            href: "/member",
            svgIcon: <><path d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105"></path><path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0"></path></>,
            isMobileOnly: true
        },
        {
            label: "Thông tin tài khoản",
            href: "/member/profile",
            svgIcon: <><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path></>,
            isMobileOnly: true
        },
        // --- 3 Mục gốc (Hiện ở cả PC và Mobile) ---
        {
            label: "Mã giảm giá",
            href: "/member/voucher",
            icon: "https://cdn-static.smember.com.vn/_next/static/media/promotion-icon.99af272d.svg",
            isMobileOnly: false
        },
        {
            label: "Lịch sử mua hàng",
            href: "/member/order",
            icon: "https://cdn-static.smember.com.vn/_next/static/media/history-icon.2ebe1813.svg",
            isMobileOnly: false
        },
        {
            label: "Sổ địa chỉ",
            href: "/member/profile", // Giả sử profile chứa Sổ địa chỉ
            icon: "https://cdn-static.smember.com.vn/_next/static/media/address-icon.169a4d95.svg",
            isMobileOnly: false
        },

       
        {
            label: "Chính sách bảo hành",
            href: "#", // Sửa thành link thực tế nếu có
            svgIcon: <><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path><path d="M9 9l1 0"></path><path d="M9 13l6 0"></path><path d="M9 17l6 0"></path></>,
            isMobileOnly: true,
            external: true
        },
        {
            label: "Góp ý - Hỗ trợ",
            href: "/member/suport",
            svgIcon: <><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path><path d="M3 7l9 6l9 -6"></path></>,
            isMobileOnly: true
        },
        {
            label: "Điều khoản sử dụng",
            href: "#", // Sửa thành link thực tế nếu có
            svgIcon: <><path d="M13 15v-6a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v4"></path><path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9"></path><path d="M16 22l5 -5"></path><path d="M21 21.5v-4.5h-4.5"></path><path d="M16 9h2"></path></>,
            isMobileOnly: true,
            external: true
        },
        // Nút đăng xuất sẽ được xử lý riêng ở dưới
    ];

    return (
        <div className="account-nav">
            <ConfirmModal
                isOpen={showLogoutModal}
                title="Đăng xuất"
                message="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?"
                type="confirm"
                confirmText="Đăng xuất"
                cancelText="Hủy bỏ"
                onConfirm={handleConfirmLogout}
                onClose={() => setShowLogoutModal(false)}
            />

            <div className="account-nav__card">
                <div className="account-nav__list">
                    {navItems.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href} 
                            // Thêm class mobile-only-item để ẩn/hiện bằng CSS
                            className={`account-nav__item ${item.isMobileOnly ? 'mobile-only-item' : ''}`}
                            target={item.external ? "_blank" : "_self"}
                            rel={item.external ? "noreferrer" : ""}
                        >
                            <div className="account-nav__icon-box">
                                {/* Ưu tiên hiển thị SVG nếu có, không thì hiển thị Image */}
                                {item.svgIcon ? (
                                    renderIcon(item.svgIcon)
                                ) : (
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className="account-nav__icon-img"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <span className="account-nav__label">{item.label}</span>
                        </a>
                    ))}

                    {/* Nút Đăng Xuất (Chỉ hiện trên Mobile) */}
                    <button 
                        onClick={() => setShowLogoutModal(true)} 
                        className="account-nav__item mobile-only-item logout-btn-mobile"
                    >
                        <div className="account-nav__icon-box">
                            {renderIcon(<><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path><path d="M9 12h12l-3 -3"></path><path d="M18 15l3 -3"></path></>)}
                        </div>
                        <span className="account-nav__label">Đăng xuất</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AccountNav;