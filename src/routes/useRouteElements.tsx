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
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import OrderManager from "../pages/Admin/OrderManager/OrderManager";
import ProductManager from "../pages/Admin/ProductManager/ProductManager";
import PaymentManager from "../pages/Admin/PaymentManager/PaymentManager";
import VoucherManager from "../pages/Admin/VoucherManager/VoucherManager";
import UserManager from "../pages/Admin/UserManager/UserManager";
import ReviewManager from "../pages/Admin/ReviewManager/ReviewManager";
import LiveChatAdmin from "../pages/Admin/LiveChatAdmin/LiveChatAdmin";
import ProductCreate from "../pages/Admin/ProductManager/ProductCreate/ProductCreate";
import ProductEdit from "../pages/Admin/ProductManager/ProductEdit/ProductEdit";
import AccessoryCreate from "../pages/Admin/ProductManager/AccessoryCreate/AccessoryCreate";
import AccessoryEdit from "../pages/Admin/ProductManager/AccessoryEdit/AccessoryEdit";
import CategoryManager from "../pages/Admin/CategoryManager/CategoryManager";
import BrandManager from "../pages/Admin/BrandManager/BrandManager";
import SpecManager from "../pages/Admin/SpecManager/SpecManager";
import ComboManager from "../pages/Admin/ComboManager/ComboManager";
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

        // ==========================================
        // CÁC ROUTE ADMIN
        // ==========================================
        {
            path: '/admin',
            element: <AdminProtectedRoute />,
            children: [
                {
                    element: <AdminLayout />,
                    children: [
                        { index: true, element: <Dashboard /> },
                        { path: 'orders', element: <OrderManager /> },
                        { path: 'payments', element: <PaymentManager /> }, 
                        { path: 'vouchers', element: <VoucherManager /> },
                        {
                            path: 'products',
                            element: <ProductManager defaultType="MAIN" /> 
                        },
                        {
                            path: 'products/create',
                            element: <ProductCreate /> 
                        },
                        {
                            path: 'products/edit/:id',
                            element: <ProductEdit /> 
                        },
                        {
                            path: 'accessories',
                            element: <ProductManager defaultType="ACCESSORY" /> 
                        },
                        {
                            path: 'accessories/create',
                            element: <AccessoryCreate /> 
                        },
                        {
                            path: 'accessories/edit/:id',
                            element: <AccessoryEdit /> 
                        },
                        { path: 'combos', element: <ComboManager /> }, 
                        { path: 'categories', element: <CategoryManager /> }, 
                        { path: 'brands', element: <BrandManager /> }, 
                        { path: 'specs', element: <SpecManager /> }, 
                        { path: 'users', element: <UserManager /> },
                        { path: 'reviews', element: <ReviewManager /> },
                        { path: 'chat', element: <LiveChatAdmin /> },
                        { path: 'chatbot', element: <h2>Lịch sử Chatbot</h2> },
                        { path: 'notifications', element: <h2>Quản lý Thông báo</h2> },
                        { path: 'settings', element: <h2>Cài đặt hệ thống</h2> },
                    ]
                }
            ]
        }
    ]);

    return routeElements;
}