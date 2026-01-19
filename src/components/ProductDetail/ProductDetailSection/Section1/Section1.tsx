import React, { useEffect, useState } from "react";
import "./Section1.css"
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import ProductGallery from "../../ProductGallery/ProductGallery";
import ProductInfo from "../../ProductInfo/ProductInfo";
import StickyProductBar from "../../StickyProductBar/StickyProductBar";
import ProductSpecs from "../../ProductSpecs/ProductSpecs";
const Section1 = () => {
    const [showStickyBar, setShowStickyBar] = useState(false);

    // Sửa lỗi tại dòng này: thêm dấu =>
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowStickyBar(true);
            } else {
                setShowStickyBar(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        // Cleanup function
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="Section-1-bg">
<div className="container Section-1">
            <StickyProductBar isVisible={showStickyBar} />
            <Breadcrumb />
            <div className="inner-section1-product-detail">
                <ProductGallery />
                <ProductInfo />
                <div className="pd-specs-mobile">
                <ProductSpecs />
            </div>
            </div>
        </div>
        </div>
        
    );
};

export default Section1;