import { useRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import CompareProduct from "../pages/CompareProduct/CompareProduct";
export default function useRouteElements() {
    const routeElements = useRoutes([
        // --- CÁC ROUTE DÙNG HEADER CHÍNH ---
        {
            path: '/',
            element: <MainLayout />, 
            children: [
                {
                    index: true, 
                    element: <HomePage />
                },
                // 2. Thêm Route chi tiết sản phẩm vào đây
                {
                    // Cách 1: Đường dẫn cố định để test
                    // path: 'product-detail', 
                    
                    // Cách 2: Đường dẫn động (Khuyên dùng)
                    // Ví dụ: domain.com/iphone-17-pro-max
                    path: ':nameId', 
                    element: <ProductDetail />
                },
                {
                    path:"compare",
                    element:<CompareProduct/>
                }
            ]
        },

        // --- CÁC ROUTE AUTH ---
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        }
    ]);

    return routeElements;
}