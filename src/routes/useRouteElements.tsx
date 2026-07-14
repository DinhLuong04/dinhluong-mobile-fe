import { useRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import CompareProduct from "../pages/CompareProduct/CompareProduct";

import CartPage from "../pages/Cart/CartPage";

import Overview from "../components/Account/Overview/Overview";
import OrderHistory from "../components/Account/OrderHistory/OrderHistory";
import Profile from "../components/Account/Profile/Profile";
import Member from "../pages/Account/Member";
import VoucherCenter from "../components/Account/VoucherCenter/VoucherCenter";
import Checkout from "../pages/Checkout/Checkout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import { PaymentResult } from "../pages/PaymentResult/PaymentResult";
import OrderDetail from "../components/Account/OrderDetail/OrderDetail";


import UserProtectedRoute from "./UserProtectedRoute";

export default function useRouteElements() {
    const routeElements = useRoutes([
        // ==========================================
        // CÁC ROUTE DÙNG HEADER CHÍNH (MAIN LAYOUT)
        // ==========================================
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'dien-thoai',
                    element: <HomePage />
                },
                {
                    path: 'phu-kien',
                    element: <HomePage />
                },
                {
                    path: 'search',
                    element: <SearchPage />
                },
                {
                    path: ':Product/:slug',
                    element: <ProductDetail />
                },
                {
                    path: "compare",
                    element: <CompareProduct />
                },
                {
                    path: "Cart",
                    element: <CartPage />
                },
                {
                    path: "Checkout",
                    element: <Checkout />
                },
                {
                    path: "payment/result",
                    element: <PaymentResult />
                },
                {
                    path: "member", 
                    // Gộp 2 component lồng nhau: Protected gác cổng -> Mở cổng thì render Member (Sidebar)
                    element: (
                        <UserProtectedRoute>
                            <Member />
                        </UserProtectedRoute>
                    ), 
                    children: [
                        {
                            index: true, 
                            element: <Overview /> 
                        },
                        {
                            path: "order", 
                            element: <OrderHistory />
                        },
                        {
                            path: "order/:id", 
                            element: <OrderDetail />
                        },
                        {
                            path: "profile",
                            element: <Profile />
                        },
                        {
                            path: "voucher",
                            element: <VoucherCenter />
                        }
                    ]
                }
            ] // <-- Bạn đã vô tình xóa mất cái đóng ngoặc này ở code cũ
        },

        // ==========================================
        // CÁC ROUTE AUTH (KHÔNG DÙNG MAIN LAYOUT)
        // ==========================================
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/forgot-password',
            element: <ForgotPasswordPage />
        },
    ]);

    return routeElements;
}