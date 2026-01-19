// src/components/ProductDetail/ProductDescription/ProductDescriptionData.ts

// 1. Dữ liệu Bảng giá (Giữ nguyên)
export const priceTable = [
    { version: "iPhone 17 Pro Max 256GB", globalPrice: "1.199 USD", vnPrice: "37.990.000 VNĐ" },
    { version: "iPhone 17 Pro Max 512GB", globalPrice: "1.399 USD", vnPrice: "44.490.000 VNĐ" },
    { version: "iPhone 17 Pro Max 1TB", globalPrice: "1.599 USD", vnPrice: "50.990.000 VNĐ" },
    { version: "iPhone 17 Pro Max 2TB", globalPrice: "1.999 USD", vnPrice: "63.990.000 VNĐ" }
];

// 2. Dữ liệu Bảng thông số kỹ thuật (Giữ nguyên)
export const techSpecsComparison = [
    { criteria: "Kích thước", ip17: "149.6 × 71.5 × 8 mm", ipAir: "156.2 × 74.7 × 5.6 mm", ipPro: "150 × 71.9 × 8.8 mm", ipProMax: "163.4 × 78 × 8.8 mm" },
    { criteria: "Trọng lượng", ip17: "177 g", ipAir: "165 g", ipPro: "206 g", ipProMax: "233 g" },
    { criteria: "Chuẩn kháng nước/bụi", ip17: "IP68 (6m/30 phút)", ipAir: "IP68", ipPro: "IP68", ipProMax: "IP68" },
    { criteria: "Chất liệu", ip17: "Nhôm, lưng kính", ipAir: "Titanium", ipPro: "Hợp kim nhôm", ipProMax: "Hợp kim nhôm" },
    { criteria: "Chip xử lý", ip17: "Apple A19 (3nm)", ipAir: "Apple A19 Pro", ipPro: "Apple A19 Pro", ipProMax: "Apple A19 Pro" },
    { criteria: "Màn hình", ip17: "6.3 inch", ipAir: "6.5 inch", ipPro: "6.3 inch", ipProMax: "6.9 inch" },
    { criteria: "Công nghệ màn hình", ip17: "LTPO OLED, 120Hz", ipAir: "LTPO OLED, 120Hz", ipPro: "LTPO OLED, 120Hz", ipProMax: "LTPO OLED, 120Hz" },
    { criteria: "Camera sau", ip17: "2 camera", ipAir: "1 camera", ipPro: "3 camera + LiDAR", ipProMax: "3 camera + LiDAR" },
    { criteria: "Camera Tele", ip17: "-", ipAir: "-", ipPro: "48MP 4x zoom", ipProMax: "48MP 4x zoom" },
    { criteria: "Pin/Sạc", ip17: "USB-C 2.0", ipAir: "USB-C 2.0", ipPro: "USB-C 3.2 Gen 2", ipProMax: "USB-C 3.2 Gen 2" }
];

// 3. Nội dung bài viết chi tiết (CẬP NHẬT ĐẦY ĐỦ)
export const articleSections = [
    {
        type: "intro",
        content: "Đánh dấu cuộc cách tân mạnh mẽ về thiết kế, iPhone 17 Pro Max ra mắt với khung nhôm nguyên khối rèn nhiệt bền chắc. Bên cạnh đó, iPhone 17 Pro Max còn sở hữu chip A19 Pro cực mạnh và hệ thống 3 camera Fusion 48MP ấn tượng. Thời lượng pin cao nhất từ trước đến nay trên dòng iPhone cùng loạt tính năng Apple Intelligence đem lại sự hỗ trợ hữu ích cho cả nhu cầu công việc, giải trí và sáng tạo nội dung.",
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/iphone_17_pro_relay_1_69c79a1eec.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/iphone_17_pro_relay_2_efe69c8c70.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_1_a9a1069a42.jpg"
        ]
    },
    {
        type: "section",
        title: "Tổng quan về iPhone 17 Pro Max",
        content: `
            <p>iPhone 17 Pro Max đánh dấu bước chuyển mình rõ rệt với khung nhôm nguyên khối rèn nhiệt bền chắc, màn hình Super Retina XDR 6.9 inch cùng chip A19 Pro mạnh mẽ.</p>
            <h3>Điểm nhấn lớn nhất:</h3>
            <p>Đây là mẫu máy được Apple đầu tư nhiều công nghệ tiên tiến nhất, từ cụm 3 camera Fusion 48MP zoom quang 8x cho đến loạt tính năng Apple Intelligence. Với thời lượng pin cao nhất trong toàn bộ dòng iPhone năm 2025.</p>
            <h3>Vì sao luôn là lựa chọn được quan tâm nhất?</h3>
            <p>Nhờ sự kết hợp của màn hình lớn nhất, pin bền bỉ nhất và hệ thống camera chuyên nghiệp nhất. Bản chính hãng bổ sung tản nhiệt buồng hơi, đảm bảo hiệu năng ổn định.</p>
            <h3>Đối tượng phù hợp:</h3>
            <p>Phù hợp cho những ai thường xuyên quay video, chỉnh sửa hình ảnh, chơi game đồ họa cao hoặc muốn trải nghiệm pin lâu nhất. Nếu iPhone 17 Pro thiên về cân bằng, thì Pro Max hướng đến sự toàn diện.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_9_51bb914e96.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_5_d0f3c2c510.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_m_17e4f04a06.jpg"
        ]
    },
    {
        type: "section",
        title: "Thiết kế: Sang trọng với màn hình lớn nhất",
        content: `
            <h3>Khung nhôm rèn nhiệt bền bỉ</h3>
            <p>Chất liệu này có ưu điểm dẫn nhiệt tốt, giúp máy giữ hiệu năng ổn định. Mặt trước và sau phủ Ceramic Shield 2, bền gấp 3 lần thế hệ trước.</p>
            <h3>Kích thước & Cảm giác cầm nắm</h3>
            <p>Kích thước 163.4 x 78 x 8.8 mm, trọng lượng 233g. To và nặng hơn bản tiêu chuẩn nhưng cân đối nhờ viền mỏng.</p>
            <h3>Màn hình Super Retina XDR 6.9 inch</h3>
            <p>Độ phân giải 2868 x 1320 pixel, độ sáng tối đa 3000 nits. Tần số quét ProMotion 120Hz giúp mọi chuyển động mượt mà, tự hạ xuống 1Hz để tiết kiệm pin.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_k_1b6367c8d8.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_n_459494b66c.jpg"
        ]
    },
    {
        type: "section",
        title: "Hiệu năng cực đỉnh với chip A19 Pro",
        content: `
            <p><strong>Chip A19 Pro:</strong> 6 nhân CPU (2 hiệu năng cao, 4 tiết kiệm điện) và GPU 6 nhân hỗ trợ ray tracing phần cứng.</p>
            <p><strong>GPU đồ họa:</strong> Tối ưu cho gaming AAA và AR/VR với hiệu ứng ánh sáng chi tiết.</p>
            <p><strong>Xử lý đa nhiệm & AI:</strong> Neural Engine 16 nhân giúp xử lý nhanh video 4K/8K và các tác vụ AI mà không lag.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_3_99397dc349.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_f_2fd3385863.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_h_0b042f493a.jpg"
        ]
    },
    {
        type: "section",
        title: "Trải nghiệm Apple Intelligence thông minh",
        content: `
            <p>Tích hợp sâu với phần cứng để hỗ trợ: Công cụ Viết, Genmoji tạo emoji, tính năng Dọn Dẹp ảnh. Tất cả xử lý trên thiết bị để bảo mật.</p>
            <p>Hỗ trợ công việc: Dịch thuật tức thì, tóm tắt tài liệu, viết email. Hỗ trợ sáng tạo: Đề xuất góc quay, chỉnh sửa ảnh.</p>
            <p>Cá nhân hóa: Theo dõi thói quen để gợi ý ứng dụng và nhắc việc thông minh.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_i_7c07c73aa1.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_6_c0f3883b29.jpg"
        ]
    },
    {
        type: "section",
        title: "Camera quay dựng chuyên nghiệp",
        content: `
            <p><strong>Camera chính 48MP:</strong> Khẩu độ f/1.78, chụp thiếu sáng tốt hơn, chi tiết rõ ràng.</p>
            <p><strong>Ultra Wide & Telephoto:</strong> Góc siêu rộng 48MP f/2.2 hỗ trợ macro. Telephoto 48MP f/2.8 zoom quang 5x (hoặc 8x tùy phiên bản cập nhật).</p>
            <p><strong>Nút Điều Khiển Camera:</strong> Chuyển đổi nhanh chế độ chụp/quay, bắt khoảnh khắc tức thì.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_q_c67ba3fa6d.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_c_4de79dbe7b.jpg"
        ]
    },
    {
        type: "section",
        title: "Thời lượng pin và sạc nhanh",
        content: `
            <p>Pin lớn nhất dòng iPhone 17, xem video đến 37 giờ.</p>
            <p>Sạc nhanh qua USB-C (50% trong 20 phút), MagSafe cải tiến ổn định hơn.</p>
            <p>Thực tế: 10 giờ chơi game, 15 giờ gọi video, hơn 20 giờ xem phim liên tục.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_g_9846080752.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_e_d60a3f88e8.jpg"
        ]
    },
    // --- PHẦN BỊ THIẾU 1: KẾT NỐI & BẢO MẬT ---
    {
        type: "section",
        title: "Kết nối và bảo mật",
        content: `
            <h3>USB-C tốc độ cao</h3>
            <p>Cổng USB-C 3.2 Gen 2 hỗ trợ tốc độ truyền dữ liệu cực nhanh, thuận tiện khi copy video 8K.</p>
            <h3>iOS 26 và Nút Tác Vụ</h3>
            <p>Hệ điều hành iOS 26 bổ sung Liquid Glass, màn hình khóa 3D. Nút Tác Vụ cho phép gán nhanh nhiều chức năng như mở camera, ghi âm, im lặng.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_l_63d31fdbe8.jpg"
        ]
    },
    {
        type: "section",
        title: "Màu sắc chính thức",
        content: `
            <p>Có 3 tùy chọn: <strong>Xanh đậm, Bạc và Cam vũ trụ</strong>. Màu Cam Vũ Trụ dự đoán là hot trend 2025.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_2_4291d919a9.jpg",
            "https://cdn2.fptshop.com.vn/unsafe/800x0/i_Phone_17_pro_a_35f57d3920.jpg"
        ]
    },
    // --- PHẦN BỊ THIẾU 2: ĐOẠN VĂN SO SÁNH SAU BẢNG ---
    {
        type: "section",
        title: "Đánh giá chi tiết so với các phiên bản khác",
        content: `
            <p><strong>Về hiển thị:</strong> iPhone 17 Pro Max (6.9 inch) mang lại trải nghiệm rộng rãi hơn hẳn so với iPhone 17 (6.3 inch) hay iPhone Air (6.5 inch), đặc biệt khi chơi game và giải trí.</p>
            <p><strong>Về hiệu năng:</strong> Sử dụng chip A19 Pro mạnh mẽ hơn A19 thường trên bản tiêu chuẩn, lợi thế lớn khi xử lý tác vụ nặng. Tốc độ truyền tải qua USB-C 3.2 Gen 2 cũng nhanh hơn đáng kể.</p>
            <p><strong>Về Camera & Lưu trữ:</strong> Vượt trội với 3 camera + LiDAR và tele zoom 5x/8x. Hỗ trợ quay ProRes và bộ nhớ tối đa lên tới 2TB.</p>
            <p><strong>Tổng kết:</strong> Đây là lựa chọn toàn diện nhất cho người dùng chuyên nghiệp, chấp nhận kích thước lớn và trọng lượng nặng nhất (233g).</p>
        `,
        images: []
    },
    // --- PHẦN BỊ THIẾU 3: VÌ SAO CHỌN FPT SHOP ---
    {
        type: "section",
        title: "Vì sao nên mua tại FPT Shop?",
        content: `
            <p><strong>Sản phẩm chính hãng:</strong> FPT Shop là đại lý ủy quyền của Apple, cam kết hàng chính hãng VN/A, bảo hành toàn cầu.</p>
            <p><strong>Ưu đãi hấp dẫn:</strong> Nhiều chương trình khuyến mãi, trả góp 0%, thu cũ đổi mới giá tốt.</p>
            <p><strong>Dịch vụ tận tâm:</strong> Tư vấn chuyên sâu, trải nghiệm máy trực tiếp tại cửa hàng, giao hàng nhanh chóng.</p>
        `,
        images: [
            "https://cdn2.fptshop.com.vn/unsafe/mua_iphone_17_o_dau_1_dcf78824f3.png"
        ]
    },
    {
        type: "section",
        title: "Câu hỏi thường gặp",
        content: `
            <p><strong>Nên mua dung lượng nào?</strong> 256GB là đủ dùng. 512GB/1TB cho người quay phim chuyên nghiệp. 2TB để dùng lâu dài.</p>
            <p><strong>Điểm khác biệt thiết kế?</strong> Khung nhôm rèn nhiệt, Ceramic Shield 2 bền gấp 3 lần, viền siêu mỏng.</p>
            <p><strong>Chip A19 Pro mạnh không?</strong> Cực mạnh với CPU 6 nhân, GPU Ray Tracing, xử lý AI trực tiếp.</p>
            <p><strong>Camera có gì mới?</strong> Cảm biến lớn hơn, chụp đêm tốt hơn, zoom xa rõ nét hơn.</p>
            <p><strong>Pin có trâu không?</strong> Có, xem video liên tục 31-37 giờ, sạc nhanh 50% trong 20 phút.</p>
        `,
        images: []
    }
];