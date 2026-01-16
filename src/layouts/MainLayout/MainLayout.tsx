// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Import component Header chính chúng ta vừa tách
// import Footer from '../components/Footer'; // Nếu có Footer thì import vào đây
import Banner from '../../components/Banner/Banner';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import ProductHot from '../../components/Products/ProductHot/ProductHot';
import Conclusion from '../../components/Conclusion/Conclusion';
import Footer from '../../components/Footter';
import StickyCompareBar from '../../components/StickyCompareBar/StickyCompareBar';
export default function MainLayout() {
    return (
        <div>
            {/* Header luôn hiển thị ở trên cùng */}
            <Header />

            {/* Phần thân trang web, thay đổi tùy theo route con */}
            <main>
                <Banner />
                <BrandSlider />
                <ProductHot />
                <Outlet /> 
                <Conclusion />
            </main>

            {/* <Footer /> */}
            <Footer />
            <StickyCompareBar />
        </div>
    );
}