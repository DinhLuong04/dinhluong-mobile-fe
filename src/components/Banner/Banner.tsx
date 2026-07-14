import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";

import { bannerData } from "./banner.config";
import { useBanner } from "./useBanner";

const Banner: React.FC = () => {
  const {
    nav1, setNav1,
    nav2, setNav2,
    settingsMain,
    settingsThumbs
  } = useBanner();

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