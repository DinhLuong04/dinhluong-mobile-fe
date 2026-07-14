import React from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BrandSlider.css";
import { brandData } from "./brand.config";
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