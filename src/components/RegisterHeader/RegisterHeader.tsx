import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/RegisterHeader.css'; // Đảm bảo đường dẫn import đúng

export default function RegisterHeader() {
    return (
        <header id="fptshop-header" className="fpt-header-wrapper">
            {/* --- Phần Header Chính (Màu Đỏ) --- */}
            <div id="header-main" className="fpt-header-main">
                <div className="fpt-container">
                    <div className="fpt-header-grid">
                        {/* Mobile Spacer */}
                        <div className="mobile-spacer"></div>

                        {/* Logo Section */}
                        <div id="logo" className="fpt-logo-wrapper">
                            <Link className="fpt-logo-link" to="/">
                                <img
                                    alt="DLMStore"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="fpt-logo-img"
                                    src="https://res.cloudinary.com/dhujtl4cm/image/upload/v1768146676/DLMStore_soj2kz.png"
                                />
                            </Link>
                        </div>

                        {/* User & Cart Section */}
                        <div className="fpt-user-cart">
                            {/* User Button */}
                            <div className="User_userWrap__pmbyc">
                                <div className="User_btnControl__gf4qo User_active__teyMY">
                                    <div className="mobile-hidden">
                                        <button className="fpt-user-btn" title="Đăng ký / Đăng nhập">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.7545 13.9999C18.9966 13.9999 20.0034 15.0068 20.0034 16.2488V17.1673C20.0034 17.7406 19.8242 18.2997 19.4908 18.7662C17.9449 20.9294 15.4206 22.0011 12.0004 22.0011C8.5794 22.0011 6.05643 20.9289 4.51427 18.7646C4.18231 18.2987 4.00391 17.7409 4.00391 17.1688V16.2488C4.00391 15.0068 5.01076 13.9999 6.25278 13.9999H17.7545ZM12.0004 2.00464C14.7618 2.00464 17.0004 4.24321 17.0004 7.00464C17.0004 9.76606 14.7618 12.0046 12.0004 12.0046C9.23894 12.0046 7.00036 9.76606 7.00036 7.00464C7.00036 4.24321 9.23894 2.00464 12.0004 2.00464Z" fill="inherit" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Button */}
                            <Link className="fpt-cart-btn" aria-label="giỏ hàng" to="/gio-hang">
                                <span className="relative">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
                                        <path d="M2.5 4.25C2.5 3.83579 2.83579 3.5 3.25 3.5H3.80826C4.75873 3.5 5.32782 4.13899 5.65325 4.73299C5.87016 5.12894 6.02708 5.58818 6.14982 6.00395C6.18306 6.00134 6.21674 6 6.2508 6H18.7481C19.5783 6 20.1778 6.79442 19.9502 7.5928L18.1224 14.0019C17.7856 15.1832 16.7062 15.9978 15.4779 15.9978H9.52977C8.29128 15.9978 7.2056 15.1699 6.87783 13.9756L6.11734 11.2045L4.85874 6.95578L4.8567 6.94834C4.701 6.38051 4.55487 5.85005 4.33773 5.4537C4.12686 5.0688 3.95877 5 3.80826 5H3.25C2.83579 5 2.5 4.66421 2.5 4.25ZM9 21C10.1046 21 11 20.1046 11 19C11 17.8954 10.1046 17 9 17C7.89543 17 7 17.8954 7 19C7 20.1046 7.89543 21 9 21ZM16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19C14 20.1046 14.8954 21 16 21Z" fill="inherit" />
                                    </svg>
                                </span>
                                <span className="desktop-hidden fpt-cart-text">Giỏ hàng</span>
                            </Link>
                        </div>

                        {/* Search Section */}
                        <div id="search" className="fpt-search-container">
                            <div className="fpt-search-inner">
                                {/* Nút Danh Mục */}
                                <div className="menu-right mb:absolute mb:left-4 mb:top-[8px] mb:z-[3] mb:h-[40px] mb:w-[32px] pc:min-w-[140px]">
                                    <div className="fpt-menu-btn-wrapper">
                                        <button className="fpt-menu-btn" aria-label="Danh mục">
                                            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.777557 1.19531C0.777557 0.781099 1.11334 0.445312 1.52756 0.445312H19.5276C19.9418 0.445312 20.2776 0.781099 20.2776 1.19531C20.2776 1.60953 19.9418 1.94531 19.5276 1.94531H1.52756C1.11334 1.94531 0.777557 1.60953 0.777557 1.19531Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.777557 7.69531C0.777557 7.2811 1.11334 6.94531 1.52756 6.94531H15.5276C15.9418 6.94531 16.2776 7.2811 16.2776 7.69531C16.2776 8.10953 15.9418 8.44531 15.5276 8.44531H1.52756C1.11334 8.44531 0.777557 8.10953 0.777557 7.69531Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.777557 14.1953C0.777557 13.7811 1.11334 13.4453 1.52756 13.4453H19.5276C19.9418 13.4453 20.2776 13.7811 20.2776 14.1953C20.2776 14.6095 19.9418 14.9453 19.5276 14.9453H1.52756C1.11334 14.9453 0.777557 14.6095 0.777557 14.1953Z" fill="white" />
                                            </svg>
                                            <span className="desktop-hidden">Danh mục</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Form Tìm Kiếm */}
                                <div className="fpt-search-form-wrapper">
                                    <div className="fpt-search-box">
                                        <form className="fpt-search-form">
                                            <input
                                                type="text"
                                                placeholder="Bạn cần tìm gì hôm nay?..."
                                                className="fpt-search-input"
                                                autoComplete="off"
                                                name="search"
                                            />
                                            <button title="Tìm kiếm" type="submit" className="fpt-search-submit">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6682 11.6641L14.6682 14.6641" stroke="#cb1c22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M13.3362 7.33203C13.3362 4.01832 10.6499 1.33203 7.33618 1.33203C4.02247 1.33203 1.33618 4.01832 1.33618 7.33203C1.33618 10.6457 4.02247 13.332 7.33618 13.332C10.6499 13.332 13.3362 10.6457 13.3362 7.33203Z" stroke="#cb1c22" strokeWidth="1.5" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </form>
                                        {/* Hot Keys */}
                                        <div className="fpt-hot-keys">
                                            <ul className="fpt-hot-keys-list">
                                                <li><Link className="fpt-hot-link" to="/tim-kiem?s=iphone+17">iPhone 17</Link></li>
                                                <li><Link className="fpt-hot-link" to="/tim-kiem?s=laptop">Laptop</Link></li>
                                                <li><Link className="fpt-hot-link" to="/tim-kiem?s=samsung">Samsung</Link></li>
                                                <li><Link className="fpt-hot-link" to="/tim-kiem?s=macbook">Macbook</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Phần Menu Phụ (Màu Trắng) --- */}
            <div id="location-menu" className="fpt-nav-menu">
                <div className="fpt-container fpt-nav-container">
                    
                    {/* Slider Trái */}
                    <div className="fpt-nav-slider-wrapper">
                        <nav className="relative">
                            <div className="fpt-swiper-wrapper">
                                {/* Item 1: Gợi ý đón Tết */}
                                <div className="fpt-nav-item">
                                    <div className="relative mr-4 flex items-center">
                                        <img
                                            alt="Gợi ý đón Tết"
                                            loading="lazy"
                                            width={32}
                                            height={32}
                                            src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_goi_y_1_1e24bffa75.png"
                                        />
                                        <span>Gợi ý đón Tết đủ đầy</span>
                                    </div>
                                </div>

                                {/* Item 2: Voucher tặng bạn mới */}
                                <div className="fpt-nav-item">
                                    <div className="relative mr-4">
                                        <Link className="flex items-center" to="/ctkm/chao-khach-moi">
                                            <img
                                                alt="Voucher"
                                                loading="lazy"
                                                width={32}
                                                height={32}
                                                src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/icon_vong_quay_may_man_e3fac9f3ac.png"
                                            />
                                            <span>Voucher tặng bạn mới</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Item 3: Nộp rút tiền */}
                                <div className="fpt-nav-item">
                                    <div className="relative mr-4">
                                        <Link className="flex items-center" to="/tin-tuc">
                                            <img
                                                alt="Nộp rút tiền"
                                                loading="lazy"
                                                width={32}
                                                height={32}
                                                src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_new2_91db18c832.png"
                                            />
                                            <span>Nộp rút tiền, tới FPT Shop</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Item 4: Thu cũ iPhone */}
                                <div className="fpt-nav-item">
                                    <div className="relative mr-4">
                                        <Link className="flex items-center" to="/tin-tuc">
                                            <img
                                                alt="Thu cũ iPhone"
                                                loading="lazy"
                                                width={32}
                                                height={32}
                                                src="https://cdn2.fptshop.com.vn/unsafe/64x0/filters:format(webp):quality(75)/small/icon_ai_1_8fbca810f2.png"
                                            />
                                            <span>Thu cũ iPhone giá tốt</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/* Location Selector (Bên Phải) */}
                    <div className="fpt-location-selector">
                        <ul className="fpt-location-list">
                            <li className="fpt-location-item border-l">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.9497 13.955C17.6834 11.2201 17.6834 6.78601 14.9497 4.05115C12.2161 1.31628 7.78392 1.31628 5.05025 4.05115C2.31658 6.78601 2.31658 11.2201 5.05025 13.955L6.57128 15.4538L8.61408 17.4389L8.74691 17.5567C9.52168 18.1847 10.6562 18.1455 11.3861 17.4391L13.8223 15.0691L14.9497 13.955ZM10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6C11.6569 6 13 7.34315 13 9C13 10.6569 11.6569 12 10 12Z" fill="#DC2626" />
                                </svg>
                                <span>Chọn khu vực để xem ưu đãi</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </header>
    );
}