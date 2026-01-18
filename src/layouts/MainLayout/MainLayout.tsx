// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Import component Header chính chúng ta vừa tách
// import Footer from '../components/Footer'; // Nếu có Footer thì import vào đây
import Footer from '../../components/Footter';

export default function MainLayout() {
    return (
        <div>
            {/* Header luôn hiển thị ở trên cùng */}
            <Header />

            {/* Phần thân trang web, thay đổi tùy theo route con */}
            <main>
    
                <Outlet /> 
                
            </main>

            {/* <Footer /> */}
            <Footer />
        </div>
    );
}