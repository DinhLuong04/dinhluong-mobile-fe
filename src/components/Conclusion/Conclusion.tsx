import React, { useState } from 'react';
import './Conclusion.css';

const Conclusion: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="section-Conclusion">
            <div className='container'>
            {/* 1. Banners */}
            <div className="seo-banner">
                {/* Ảnh PC */}
                <img 
                    className="banner-pc"
                    src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/smartphone_2025_4f932a1994.jpg" 
                    alt="Smartphone 2025 PC" 
                    loading="lazy"
                />
                {/* Ảnh Mobile */}
                <img 
                    className="banner-mobile"
                    src="https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/smartphone_2025_4f932a1994.jpg" 
                    alt="Smartphone 2025 Mobile" 
                    loading="lazy"
                />
            </div>

            {/* 2. Article Content */}
            <div className="article-wrapper">
                <div className={`article-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    
                    {/* Phần nội dung bài viết gốc */}
                    <p>Hãy cùng tìm hiểu về lịch sử và phát triển của điện thoại thông minh, các tính năng và thông số kỹ thuật quan trọng mà bạn cần biết khi nếu muốn mua một chiếc điện thoại phù hợp. DinhLuong Mobile cũng sẽ cung cấp cho bạn bảng thông số kỹ thuật và các thương hiệu phổ biến nhất...</p>
                    
                    <img src="https://cdn2.fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/1(1).png" alt="Điện thoại DinhLuong Mobile" />

                    <h2>Lịch sử phát triển của điện thoại thông minh</h2>
                    <h3>Ngày đầu tiên - Sự ra đời của điện thoại di động</h3>
                    <p>Vào ngày 10 tháng 3 năm 1876, nhà khoa học người Scotland - Alexander Graham Bell đã được cấp bằng sáng chế cho việc phát minh ra điện thoại...</p>
                    
                    <img src="https://cdn2.fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/3(1).png" alt="Lịch sử phát triển" />

                    <h3>Từ điện thoại di động đến điện thoại thông minh</h3>
                    <p>Thập kỷ 1990 chứng kiến sự bùng nổ thực sự của công nghệ di động với việc ra mắt các điện thoại di động thông minh (smartphone)...</p>

                    <h2>Các tính năng của điện thoại di động</h2>
                    <p>Điện thoại di động đã trải qua sự phát triển đáng kể và mang đến nhiều tính năng độc đáo...</p>
                    <ul>
                        <li><strong>Cuộc gọi và tin nhắn:</strong> Cho phép thực hiện cuộc gọi, gửi tin nhắn văn bản, hình ảnh...</li>
                        <li><strong>Ghi âm cuộc gọi:</strong> Lưu lại các cuộc trò chuyện quan trọng.</li>
                        <li><strong>Chụp ảnh và quay phim:</strong> Camera tích hợp giúp lưu giữ khoảnh khắc.</li>
                    </ul>
                    <img src="https://cdn2.fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/dien-thoai.png" alt="Tính năng điện thoại" />

                    <h2>Bảng thông số kỹ thuật của smartphone hiện nay</h2>
                    <div className="article-table-wrapper">
                        <table className="article-table">
                            <thead>
                                <tr>
                                    <th>Thông số kỹ thuật</th>
                                    <th>Ý nghĩa</th>
                                    <th>Các thông số phổ biến</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hệ điều hành</td>
                                    <td>Hệ thống quản lý vận hành</td>
                                    <td>Android, iOS</td>
                                </tr>
                                <tr>
                                    <td>Chipset</td>
                                    <td>Bộ xử lý trung tâm</td>
                                    <td>Snapdragon, Apple Bionic, MediaTek</td>
                                </tr>
                                <tr>
                                    <td>RAM</td>
                                    <td>Bộ nhớ tạm thời</td>
                                    <td>4GB, 6GB, 8GB, 12GB</td>
                                </tr>
                                <tr>
                                    <td>Bộ nhớ trong</td>
                                    <td>Lưu trữ dữ liệu</td>
                                    <td>64GB, 128GB, 256GB, 512GB, 1TB</td>
                                </tr>
                                <tr>
                                    <td>Pin</td>
                                    <td>Năng lượng hoạt động</td>
                                    <td>3.700mAh - 5.000mAh</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>3+ Tiêu chí khi chọn mua điện thoại</h2>
                    <ul>
                        <li><strong>Nhu cầu sử dụng:</strong> Chụp ảnh, chơi game hay chỉ liên lạc cơ bản.</li>
                        <li><strong>Ngân sách:</strong> Xác định mức giá phù hợp và các chương trình trả góp.</li>
                        <li><strong>Đánh giá sản phẩm:</strong> Tham khảo ý kiến chuyên gia và người dùng.</li>
                    </ul>

                    <h2>Các hãng điện thoại phổ biến tại DinhLuong Mobile</h2>
                    <p><strong>Samsung:</strong> Từ dòng Galaxy S cao cấp đến Galaxy A tầm trung...</p>
                    <p><strong>iPhone (Apple):</strong> Biểu tượng công nghệ, hiệu năng đỉnh cao, thiết kế sang trọng...</p>
                    <p><strong>Xiaomi:</strong> Cấu hình mạnh mẽ trong tầm giá phải chăng...</p>
                    <p><strong>OPPO:</strong> Thiết kế thời trang, camera selfie đẹp...</p>

                    <img src="https://cdn2.fptshop.com.vn/Uploads/images/2015/Tin-Tuc/hongtt34/15.png" alt="Mua điện thoại tại DinhLuong Mobile" />
                    
                    <p>DinhLuong Mobile là địa chỉ uy tín để mua sắm điện thoại chính hãng, trả góp 0%, bảo hành uy tín trên toàn quốc.</p>
                </div>

                {/* 3. Button Xem thêm / Thu gọn */}
                <div className="show-more-btn-container">
                    <button 
                        className={`btn-show-more ${isExpanded ? 'expanded' : ''}`} 
                        onClick={toggleExpand}
                    >
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="currentColor"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Conclusion;