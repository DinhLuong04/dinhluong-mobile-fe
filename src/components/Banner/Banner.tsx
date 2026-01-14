import React, { useState } from "react";
import Slider, {type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

// Định nghĩa Interface
interface BannerItem {
  id: number;
  imageDesktop: string;
  imageMobile: string;
  title: string;
  desc: string;
  link: string;
}

// Dữ liệu mẫu
const bannerData: BannerItem[] = [
  {
    id: 1,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_648d92f2e7.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_7100c5216d.png",
    title: "Samsung Galaxy A56",
    desc: "Mở bán ưu đãi",
    link: "#"
  },
  {
    id: 2,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_89ee9818db.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_381b53d5ca.png",
    title: "Reno15 Series",
    desc: "Chuyên gia chân dung AI",
    link: "#"
  },
  {
    id: 3,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_2c3d95c752.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_0e827f8fd2.png",
    title: "Xiaomi Redmi Note 15",
    desc: "Bền vô đối",
    link: "#"
  },
  {
    id: 4,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_4eed2b4139.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_5760b01669.png",
    title: "Chào khách hàng mới",
    desc: "Giảm đến 50%",
    link: "#"
  },
  {
    id: 5,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_c67305133f.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_0528a84f9f.png",
    title: "Honor X9d",
    desc: "Siêu bền bỉ",
    link: "#"
  },
  {
    id: 6,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_0d1f38fad0.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_a314c50378.png",
    title: "Nubia V80 Design",
    desc: "Thiết kế thời thượng",
    link: "#"
  },
  {
    id: 7,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_a3bdcce50f.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_3e66987637.png",
    title: "RedMagic 11 Pro",
    desc: "Gaming Phone đỉnh cao",
    link: "#"
  },
  {
    id: 8,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_4fe55c8c4f.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_ff7b46dde2.png",
    title: "Tecno Pova 7",
    desc: "Chiến game mượt mà",
    link: "#"
  },
  {
    id: 9,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_fdf75fbaf9.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_ee710e6339.png",
    title: "Xiaomi Poco M7 Pro",
    desc: "Hiệu năng vượt trội",
    link: "#"
  },
  {
    id: 10,
    imageDesktop: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/H1_1440x242_9f7fd6da3d.png",
    imageMobile: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/MH_1_375x146_41afcf4e72.png",
    title: "Honor X7d",
    desc: "Pin trâu dùng lâu",
    link: "#"
  },
];

const Banner: React.FC = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  // Cấu hình Slider chính
  const settingsMain: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true, // Fade đẹp cho PC
    responsive: [
      {
        breakpoint: 768, // Mobile Settings
        settings: {
          arrows: false,
          dots: true,
          fade: false, // Mobile vuốt ngang mượt hơn fade
          swipe: true,
        }
      }
    ]
  };

  // Cấu hình Slider Text (Thumbnails)
  const settingsThumbs: Settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3 }
      }
    ]
  };

  return (
    <div className="section-1">
      <div className="container">
          
          {/* Slider 1: Ảnh Banner */}
          <div className="main-slider-wrapper">
            <Slider 
              asNavFor={nav2 || undefined}
              ref={(slider) => setNav1(slider)}
              {...settingsMain}
            >
              {bannerData.map((item) => (
                <div key={item.id} className="banner-item">
                  <a href={item.link}>
                    {/* Render cả 2 ảnh, CSS sẽ quyết định cái nào hiện */}
                    <img 
                        src={item.imageDesktop} 
                        alt={item.title} 
                        className="img-desktop" 
                    />
                    <img 
                        src={item.imageMobile} 
                        alt={item.title} 
                        className="img-mobile" 
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>

          {/* Slider 2: Text bên dưới (Sẽ bị ẩn trên Mobile bởi CSS) */}
          <div className="thumb-slider-wrapper">
            <Slider
              asNavFor={nav1 || undefined}
              ref={(slider) => setNav2(slider)}
              {...settingsThumbs}
            >
              {bannerData.map((item) => (
                <div key={item.id} className="thumb-item">
                  <div className="thumb-content">
                    <strong>{item.title}</strong>
                    <small>{item.desc}</small>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

      </div>
    </div>
  );
};

export default Banner;