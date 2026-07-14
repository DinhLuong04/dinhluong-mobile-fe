import React from 'react';
import { Link } from 'react-router-dom';
import { ConfirmModal } from '../../Common/ConfirmModal/ConfirmModal';
import { useAccountNav } from './useAccountNav';
import { navItems } from './accountNav.config'; 
import { IconLogout } from './AccountNavIcons';
import './AccountNav.css';

const AccountNav: React.FC = () => {
    const { showLogoutModal, setShowLogoutModal, handleConfirmLogout } = useAccountNav();

    const renderIconBox = (item: any) => (
        <div className="account-nav__icon-box">
            {item.elementIcon ? item.elementIcon : (
                <img
                    src={item.imgIcon}
                    alt={item.label}
                    className="account-nav__icon-img"
                    loading="lazy"
                />
            )}
        </div>
    );

    return (
        <nav className="account-nav" aria-label="Account Navigation">
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
                <ul className="account-nav__list">
                    {navItems.map((item) => {
                        const className = `account-nav__item ${item.isMobileOnly ? 'mobile-only-item' : ''}`;
                        
                        return (
                            <li key={item.label}>
                                {item.external ? (
                                    <a 
                                        href={item.href} 
                                        className={className}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {renderIconBox(item)}
                                        <span className="account-nav__label">{item.label}</span>
                                    </a>
                                ) : (
                                    <Link 
                                        to={item.href} 
                                        className={className}
                                    >
                                        {renderIconBox(item)}
                                        <span className="account-nav__label">{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        );
                    })}

                    {/* Nút Đăng Xuất */}
                    <li className="mobile-only-item logout-btn-mobile">
                        <button 
                            onClick={() => setShowLogoutModal(true)} 
                            className="account-nav__item"
                            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <div className="account-nav__icon-box">
                                <IconLogout />
                            </div>
                            <span className="account-nav__label">Đăng xuất</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AccountNav;