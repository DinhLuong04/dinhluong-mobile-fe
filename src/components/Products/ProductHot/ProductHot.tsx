import React, { useRef } from 'react';
// import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import đúng tên interface là Product (theo file ProductCard đã sửa)
import ProductCard, { type Product } from '../ProductCard/ProductCard';
import './ProductHot.css';

// --- Dữ liệu mẫu (Đã chuẩn hóa theo Interface Product mới) ---
const mockProducts: Product[] = [
    {
        id: 1,
        name: "iPhone 17 Pro Max 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
        price: 37690000,
        originalPrice: 37990000,
        discountNote: "Giảm 300.000đ",
        installmentText: "Trả góp 0%",
        countDown: "Còn 02 ngày 09:49:11",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg", label: "6.9\"", subLabel: "cực lớn" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "A19 Pro", subLabel: "Mới" },
        ],
        colors: [{ hex: "#ededeb" }, { hex: "#fa8c4a" }, { hex: "#404555" }],
        variants: [{ label: "256GB", active: true }, { label: "512GB" }, { label: "1TB" }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png"],
        promotionText: "Thanh toán qua ví Zalopay giảm đến 500,000đ"
    },
    {
        id: 2,
        name: "Honor Magic V3 5G 12GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/honor_magic_v3_xanh_2_2e82ae0429.png",
        price: 29990000,
        originalPrice: 39270000,
        discountNote: "Giảm 9.280.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "Snapdragon", subLabel: "8 Gen 3" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg", label: "Pin", subLabel: "5150 mAh" },
        ],
        colors: [{ hex: "#a6412f" }, { hex: "#141313" }, { hex: "#1f4530" }],
        variants: [{ label: "512GB", active: true }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png"],
        promotionText: "Giảm 800.000đ khi thanh toán qua thẻ Visa SCB."
    },
    {
        id: 3,
        name: "Xiaomi Poco M7 Pro 5G 8GB 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_poco_m7_pro_xanh_5_20cec22a7c.jpg",
        price: 5490000,
        originalPrice: 6370000,
        discountNote: "Giảm 880.000đ",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/5_G_icon_f6da8067b2.svg", label: "5G", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_screen_2df654a803.svg", label: "AMOLED", subLabel: "120Hz" },
        ],
        colors: [{ hex: "#cfcee7" }, { hex: "#a19f98" }],
        variants: [{ label: "256GB", active: true }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-Homepaylater-1744348452965.png"],
        promotionText: "Giảm 5% tối đa 50,000đ cho Khách hàng thân thiết"
    },
    {
        id: 4,
        name: "OPPO Find N3 5G 16GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/2023_11_7_638349536349641250_oppo-find-n3-5g-den-7.jpg",
        price: 26990000,
        originalPrice: 44180000,
        discountNote: "Giảm 17.190.000đ",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_fold_d73c89b64d.svg", label: "Gập", subLabel: "7.82\"" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_water_resistant_f2193d2539.svg", label: "Kháng nước", subLabel: "IPX4" },
        ],
        colors: [{ hex: "#ebc488" }, { hex: "#201f1d" }],
        variants: [{ label: "512GB", active: true }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"],
        promotionText: "Chủ thẻ MB Bank MasterCard: Giảm 10%"
    },
    {
        id: 5,
        name: "Tecno Spark 40C 8GB 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/tecno_spark_40c_xanh_5_c23af5300b.png",
        price: 3290000,
        originalPrice: 3790000,
        discountNote: "Giảm 500.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_battery_9e90c55554.svg", label: "Pin", subLabel: "6000mAh" },
        ],
        colors: [{ hex: "#0a0a0a" }, { hex: "#bfc0bf" }, { hex: "#cedde6" }],
        variants: [{ label: "256GB", active: true }],
        promotions: [],
        promotionText: "Trả góp 0%"
    },
    {
        id: 6,
        name: "iPhone 17 Pro Max 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
        price: 37690000,
        originalPrice: 37990000,
        discountNote: "Giảm 300.000đ",
        installmentText: "Trả góp 0%",
        countDown: "Còn 02 ngày 09:49:11",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg", label: "6.9\"", subLabel: "cực lớn" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "A19 Pro", subLabel: "Mới" },
        ],
        colors: [{ hex: "#ededeb" }, { hex: "#fa8c4a" }, { hex: "#404555" }],
        variants: [{ label: "256GB", active: true }, { label: "512GB" }, { label: "1TB" }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png"],
        promotionText: "Thanh toán qua ví Zalopay giảm đến 500,000đ"
    },
    {
        id: 7,
        name: "iPhone 17 Pro Max 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
        price: 37690000,
        originalPrice: 37990000,
        discountNote: "Giảm 300.000đ",
        installmentText: "Trả góp 0%",
        countDown: "Còn 02 ngày 09:49:11",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg", label: "6.9\"", subLabel: "cực lớn" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "A19 Pro", subLabel: "Mới" },
        ],
        colors: [{ hex: "#ededeb" }, { hex: "#fa8c4a" }, { hex: "#404555" }],
        variants: [{ label: "256GB", active: true }, { label: "512GB" }, { label: "1TB" }],
        promotions: ["https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png"],
        promotionText: "Thanh toán qua ví Zalopay giảm đến 500,000đ"
    },
];

// const ProductHot: React.FC = () => {

//     // ProductHot.tsx

//     const settings: Settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         autoplay: false,
//         responsive: [
//             {
//                 breakpoint: 1200,
//                 settings: { slidesToShow: 4 }
//             },
//             {
//                 breakpoint: 1024,
//                 settings: { slidesToShow: 3, arrows: true }
//             },
//             {
//                 breakpoint: 768, // Tablet
//                 settings: { slidesToShow: 2, arrows: false }
//             },
//             // --- FIX CHO MOBILE (390px nằm trong khoảng này) ---
//             {
//                 breakpoint: 480, // Hoặc 768 tùy breakpoint bạn muốn
//                 settings: {
//                     slidesToShow: 1.5, // MẸO: Để 1.5 hoặc 1.2 để người dùng thấy 1 phần thẻ sau -> kích thích vuốt
//                     slidesToScroll: 1,
//                     centerMode: false,
//                     arrows: false,
//                     infinite: false, // Mobile thường không cần infinite loop nếu ít sản phẩm
//                     variableWidth: false // Bắt buộc false để Slick chia đều width
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="section-hot-sale">
//             {/* Sử dụng CSS module hoặc class container của project bạn */}
//             <div className="container">

//                 {/* 1. Top Banner Image */}
//                 <div className="hot-sale-banner">
//                     <img
//                         src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H9_1240x132_2x_2f0ab811b2.png"
//                         alt="Hot Sale Banner"
//                         className="banner-img"
//                     />
//                 </div>

//                 {/* 2. Slider Sản phẩm */}
//                 <div className="hot-sale-slider-container">
//                     <Slider {...settings}>
//                         {mockProducts.map((prod) => (
//                             // Thêm div wrap và padding để tạo khoảng cách giữa các card
//                             <div key={prod.id} className="slider-item-padding">
//                                 {/* Truyền đúng tên prop là 'product' */}
//                                 <ProductCard product={prod} />
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>

//             </div>
//         </div>
//     );
// };
const ProductHot: React.FC = () => {
    // Ref để xử lý nút bấm (nếu cần)
    const scrollRef = useRef<HTMLDivElement>(null);

    // Hàm xử lý nút bấm (Optional - nếu bạn muốn giữ nút Next/Prev trên PC)
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Khoảng cách cuộn
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="section-hot-sale">
            <div className="container">
                {/* Banner Top (Giữ nguyên) */}
                <div className="hot-sale-banner">
                    <img src="..." alt="Hot Sale Banner" />
                </div>

                {/* Container Chính */}
                <div className="hot-sale-slider-container">
                    
                    {/* Nút bấm điều hướng (Chỉ hiện ở PC bằng CSS) */}
                    <button className="nav-btn prev" onClick={() => scroll('left')}>❮</button>
                    <button className="nav-btn next" onClick={() => scroll('right')}>❯</button>

                    {/* Vùng cuộn (Scroll Area) */}
                    <div className="scroll-wrapper" ref={scrollRef}>
                        {mockProducts.map((prod) => (
                            <div key={prod.id} className="scroll-item">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHot;

