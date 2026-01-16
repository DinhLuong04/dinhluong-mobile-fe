// src/useRouteElements.tsx (hoặc nơi bạn để file này)
import { useRoutes } from "react-router-dom";
import ProductSection from "../components/Products/ProductSection/ProductSection";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout/MainLayout"; // 1. Import MainLayout

export default function useRouteElements() {
    const routeElements = useRoutes([
        // --- CÁC ROUTE DÙNG HEADER CHÍNH (Trang chủ, sản phẩm...) ---
        {
            path: '/',
            element: <MainLayout />, // Dùng Layout này bọc bên ngoài
            children: [
                {
                    index: true, // Khi vào '/' thì hiển thị ProductSection
                    element: <ProductSection />
                },
                // Sau này thêm các trang khác như chi tiết sản phẩm, giỏ hàng thì thêm ở đây
                // { path: 'product/:id', element: <ProductDetail /> }
            ]
        },

        // --- CÁC ROUTE DÙNG HEADER ĐĂNG KÝ (Login/Register) ---
        {
            path: '/login',
            element: (

                    <Login />
            
            )
        },
        {
            path: '/register',
            element: (    
                    <Register />
            )
        }
    ]);

    return routeElements;
}