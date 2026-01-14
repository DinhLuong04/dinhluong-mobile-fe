import React from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BrandSlider.css";

interface BrandItem {
    id: number;
    name: string;
    image: string;
    link: string;
}

// Data trích xuất từ HTML của bạn
const brandData: BrandItem[] = [
    { id: 1, name: "iPhone", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_iphone_ngang_eac93ff477.png", link: "#" },
    { id: 2, name: "Samsung", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_samsung_ngang_1624d75bd8.png", link: "#" },
    { id: 3, name: "Honor", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_honor_ngang_814fca59e4.png", link: "#" },
    { id: 4, name: "Tecno", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_tecno_ngang_c587e5f1fa.png", link: "#" },
    { id: 5, name: "Nokia", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_nokia_ngang_15416db151.png", link: "#" },
    { id: 6, name: "Viettel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_viettel_ngang_95c33a2faa.png", link: "#" },
    { id: 7, name: "Realme", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_realme_ngang_0185815a13.png", link: "#" },
    { id: 8, name: "Mobell", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_mobell_ngang_27f930cc0a.png", link: "#" },
    { id: 9, name: "Xiaomi", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_xiaomi_ngang_0faf267234.png", link: "#" },
    { id: 10, name: "Oppo", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_oppo_ngang_68d31fcd73.png", link: "#" },
    { id: 11, name: "RedMagic", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_redmagic_ngang_505d29c537.png", link: "#" },
    { id: 12, name: "ZTE Nubia", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_zte_ngang_2e0d8b4de1.png", link: "#" },
    { id: 13, name: "Masstel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_masstel_ngang_2a96b9898c.png", link: "#" },
    { id: 14, name: "TCL", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_tcl_ngang_0ed4175607.png", link: "#" },
    { id: 15, name: "Benco", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_benco_ngang_d31d9c3b77.png", link: "#" },
    { id: 16, name: "Inoi", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_inoi_ngang_61080bdeb9.png", link: "#" },
    { id: 17, name: "Itel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_itel_ngang_acd1031b09.png", link: "#" },
    { id: 18, name: "Vivo", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_vivo_ngang_45494ff733.png", link: "#" },
];

const BrandSlider: React.FC = () => {
    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 8, // PC hiện 8 cột
        slidesToScroll: 2,
        rows: 2,         // PC vẫn giữ 2 hàng
        slidesPerRow: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    rows: 2,
                }
            },
            {
                breakpoint: 768, // --- CẤU HÌNH MOBILE ---
                settings: {
                    slidesToShow: 4.5, // Để 4.5 để người dùng thấy mép logo sau -> biết là trượt được
                    slidesToScroll: 2,
                    rows: 1,      // <--- QUAN TRỌNG: ĐỔI VỀ 1 HÀNG
                    arrows: false,
                    dots: false   // Logo 1 hàng thì không cần dots cho đỡ rối
                }
            }
        ]
    };

    return (
        <div className="section-brand">
            <div className="container">
                <div className="brand-slider-wrapper">
                    <Slider {...settings} className="brand-slider">
                        {brandData.map((brand) => (
                            // Wrapper div để tạo khoảng cách (gutter) cho grid
                            <div key={brand.id} className="brand-item-wrapper">
                                <a href={brand.link} className="brand-item" title={brand.name}>
                                    <img src={brand.image} alt={brand.name} className="brand-img" />
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BrandSlider;