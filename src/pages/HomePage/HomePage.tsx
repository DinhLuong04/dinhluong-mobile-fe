// src/pages/HomePage/HomePage.tsx
import React from 'react';
import Banner from '../../components/Banner/Banner';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import ProductHot from '../../components/Products/ProductHot/ProductHot';
import Conclusion from '../../components/Conclusion/Conclusion';
import ProductSection from "../../components/Products/ProductSection/ProductSection"

export default function HomePage() {
    return (
        <div className="homepage-container">
            <Banner />
            <BrandSlider />
            <ProductHot />
            <ProductSection/>
            <Conclusion />
        </div>
    );
}