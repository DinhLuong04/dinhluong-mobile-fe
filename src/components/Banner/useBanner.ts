import { useState } from 'react';
import Slider, { type Settings } from "react-slick";

export const useBanner = () => {
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);

    const settingsMain: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                    fade: false,
                    swipe: true,
                }
            }
        ]
    };

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

    return {
        nav1, setNav1,
        nav2, setNav2,
        settingsMain,
        settingsThumbs
    };
};