import React from 'react';
import { NavLink } from 'react-router-dom';
import { ConfirmModal } from '../../Common/ConfirmModal/ConfirmModal';
import { useAccountSidebar } from './useAccountSidebar';
import { sidebarItems } from './accountSidebar.config';
import { IconLogout } from './AccountSidebarIcons';
import "./AccountSidebar.css";

const AccountSidebar: React.FC = () => {
    const {
        showLogoutModal,
        setShowLogoutModal,
        handleLogoutClick,
        handleConfirmLogout
    } = useAccountSidebar();

    return (
        <div className="account-sidebar">
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
            
            {/* Sử dụng thẻ <nav> thay cho <div> để tăng tính ngữ nghĩa */}
            <nav className="sidebar-menu" aria-label="Account Sidebar">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {sidebarItems.map((item) => (
                        <li key={item.label}>
                            {item.external ? (
                                <a 
                                    href={item.href} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="sidebar-item"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            ) : (
                                <NavLink 
                                    to={item.href} 
                                    end={item.exact} 
                                    className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="sidebar-divider"></div>

                <button onClick={handleLogoutClick} className="sidebar-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <IconLogout />
                    <span>Đăng xuất</span>
                </button>
            </nav>
        </div>
    );
};

export default AccountSidebar;