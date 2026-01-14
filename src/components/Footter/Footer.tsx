import React from 'react';
import './Footer.css';

// SVG Icons (Facebook, Zalo, Youtube, Tiktok)
const FacebookIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#3A5897"/><path d="M16.5 14.5H14.5V22H11.5V14.5H10V12H11.5V10.5C11.5 8.5 12.5 7.5 14.5 7.5H16.5V10H15C14 10 14.5 10.5 14.5 11V12H16.5L16.5 14.5Z" fill="white"/></svg>;
const ZaloIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#0068FF"/><path d="M19 19H17V17H19V19ZM19 15H17V9H19V15ZM9 19H7V17H9V19ZM9 15H7V9H9V15Z" fill="white"/></svg>; // Demo icon đơn giản
const YoutubeIcon = () => <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#FF0000"/><path d="M19 14L11 18V10L19 14Z" fill="white"/></svg>;

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            
            {/* 1. Footer Top: Hệ thống cửa hàng */}
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-top-text">
                        <h4>Hệ thống DinhLuong Mobile</h4>
                        <p>Bao gồm Cửa hàng DinhLuong Mobile, Phụ kiện chính hãng</p>
                    </div>
                    <div>
                        <a href="/cua-hang" className="btn-store-list">
                            Xem danh sách cửa hàng
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Footer Main: 4 Cột nội dung */}
            <div className="footer-container">
                <div className="footer-main">
                    
                    {/* Cột 1: Kết nối & Tổng đài */}
                    <div className="footer-col">
                        <p className="footer-col-title">KẾT NỐI VỚI DINHLUONG MOBILE</p>
                        <div className="social-list">
                            <a href="#" className="social-icon"><FacebookIcon /></a>
                            <a href="#" className="social-icon"><ZaloIcon /></a>
                            <a href="#" className="social-icon"><YoutubeIcon /></a>
                        </div>
                        
                        <p className="footer-col-title" style={{ marginTop: '20px' }}>TỔNG ĐÀI MIỄN PHÍ</p>
                        <div className="hotline-group">
                            <div className="hotline-item">
                                <span>Tư vấn mua hàng: </span>
                                <a href="tel:18006601"><strong>1800.6601</strong> (Nhánh 1)</a>
                            </div>
                            <div className="hotline-item">
                                <span>Hỗ trợ kỹ thuật: </span>
                                <a href="tel:18006601"><strong>1800.6601</strong> (Nhánh 2)</a>
                            </div>
                            <div className="hotline-item">
                                <span>Góp ý, khiếu nại: </span>
                                <a href="tel:18006616"><strong>1800.6616</strong></a>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Về chúng tôi */}
                    <div className="footer-col">
                        <p className="footer-col-title">VỀ CHÚNG TÔI</p>
                        <ul className="footer-list">
                            <li><a href="#">Giới thiệu công ty</a></li>
                            <li><a href="#">Quy chế hoạt động</a></li>
                            <li><a href="#">Tin tức khuyến mại</a></li>
                            <li><a href="#">Giới thiệu máy đổi trả</a></li>
                            <li><a href="#">Tra cứu bảo hành</a></li>
                            <li><a href="#">Tuyển dụng</a></li>
                        </ul>
                    </div>

                    {/* Cột 3: Chính sách */}
                    <div className="footer-col">
                        <p className="footer-col-title">CHÍNH SÁCH</p>
                        <ul className="footer-list">
                            <li><a href="#">Chính sách bảo hành</a></li>
                            <li><a href="#">Chính sách đổi trả</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Chính sách trả góp</a></li>
                            <li><a href="#">Giao hàng & Lắp đặt</a></li>
                            <li><a href="#">Bảo mật dữ liệu cá nhân</a></li>
                        </ul>
                    </div>

                    {/* Cột 4: Hỗ trợ thanh toán & Chứng nhận */}
                    <div className="footer-col">
                        <p className="footer-col-title">HỖ TRỢ THANH TOÁN</p>
                        <div className="payment-grid">
                            <img src="https://cdn2.fptshop.com.vn/svg/visa_icon_44fe6e15ed.svg" alt="Visa" className="payment-icon" />
                            <img src="https://cdn2.fptshop.com.vn/svg/mastercard_icon_c75f94f6a5.svg" alt="MasterCard" className="payment-icon" />
                            <img src="https://cdn2.fptshop.com.vn/svg/jcb_icon_214783937c.svg" alt="JCB" className="payment-icon" />
                            <img src="https://cdn2.fptshop.com.vn/svg/vnpay_icon_f42045057d.svg" alt="VNPAY" className="payment-icon" />
                            <img src="https://cdn2.fptshop.com.vn/svg/momo_icon_baef21b5f7.svg" alt="MoMo" className="payment-icon" />
                            <img src="https://cdn2.fptshop.com.vn/svg/zalopay_icon_26d64ea93f.svg" alt="ZaloPay" className="payment-icon" />
                        </div>

                        <p className="footer-col-title" style={{ marginTop: '20px' }}>CHỨNG NHẬN</p>
                        <div className="cert-icons">
                            <img src="https://cdn2.fptshop.com.vn/svg/da_thong_bao_bo_cong_thuong_icon_64785fb3f7.svg" alt="Đã thông báo bộ công thương" className="cert-img" />
                            <img src="https://cdn2.fptshop.com.vn/svg/dmca_icon_8fc6622bd5.svg" alt="DMCA" className="cert-img" />
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. Footer Bottom: Copyright */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="copyright-info">
                        © 2024 - 2026 Công Ty Cổ Phần Thương Mại Dịch Vụ DinhLuong Mobile <br />
                        Địa chỉ: Số 123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh / GPĐKKD số 0123456789 do Sở KHĐT TP.HCM cấp.
                    </p>
                    <p>
                        Chịu trách nhiệm nội dung: Bàn Đình Lương • Email: cskh@dinhluongmobile.com • Điện thoại: 0987.654.321
                    </p>
                </div>
            </div>
        </footer>
    );
}