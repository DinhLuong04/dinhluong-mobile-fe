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
import  ComboManager from "../pages/Admin/ComboManager/ComboManager";
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
                // --- THÊM 2 ROUTE DANH MỤC VÀO ĐÂY ---
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
                    path: "member", // Đường dẫn gốc: /member
                    element: <Member />, // Load khung sườn Sidebar trước
                    children: [
                        {
                            index: true, // Khi vào đúng link /member
                            element: <Overview /> // -> Load nội dung Dashboard vào chỗ <Outlet/> của AccountLayout
                        },
                        // Sau này bạn thêm các trang con khác vào đây dễ dàng:
                        {
                            path: "order", // Link: /member/order
                            element: <OrderHistory />
                        },
                        {
                            path: "order/:id", // Link: /member/order/1 (Số 1 là ID)
                            element: <OrderDetail />
                        },
                        {
                            path: "promotion", // Link: /member/promotion
                            element: <div>Trang ưu đãi</div>
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
        },
        {
            path: '/forgot-password',
            element: <ForgotPasswordPage />
        },
        {
            path: '/admin',
            element: <AdminProtectedRoute />,
            children: [
                {
                    element: <AdminLayout />,
                    children: [
                        { index: true, element: <Dashboard /> },
                        // --- Sales (Quản lý Bán hàng) ---
                        { path: 'orders', element: <OrderManager /> },
                        { path: 'payments', element: <PaymentManager /> }, // BỔ SUNG ROUTE NÀY
                        { path: 'vouchers', element: <VoucherManager /> },

                        // ==========================================
                        // NHÓM 1: SẢN PHẨM CHÍNH (ĐIỆN THOẠI, LAPTOP)
                        // ==========================================
                        {
                            path: 'products',
                            element: <ProductManager defaultType="MAIN" /> // Bảng danh sách
                        },
                        {
                            path: 'products/create',
                            element: <ProductCreate />  // Form tạo ĐT (Nhiều Tab, có chọn màu, RAM/ROM)
                        },
                        {
                            path: 'products/edit/:id',
                            element: <ProductEdit />    // Form sửa ĐT
                        },

                        // ==========================================
                        // NHÓM 2: PHỤ KIỆN
                        // ==========================================
                        {
                            path: 'accessories',
                            element: <ProductManager defaultType="ACCESSORY" /> // Vẫn dùng lại cái Bảng danh sách đó
                        },
                        {
                            path: 'accessories/create',
                            element: <AccessoryCreate /> // <-- Form tạo Phụ kiện (Gọn nhẹ, ko có Tab biến thể)
                        },
                        {
                            path: 'accessories/edit/:id',
                            element: <AccessoryEdit />   // <-- Form sửa Phụ kiện (Gọn nhẹ)
                        },
                        { path: 'accessories', element: <ProductManager defaultType="ACCESSORY" /> }, // BỔ SUNG ROUTE NÀY
                        { path: 'combos', element: <ComboManager /> }, // BỔ SUNG ROUTE NÀY
                        { path: 'categories', element: <CategoryManager /> }, // BỔ SUNG ROUTE NÀY
                        { path: 'brands', element: <BrandManager /> }, // BỔ SUNG ROUTE NÀY
                        { path: 'specs', element: <SpecManager /> }, // BỔ SUNG ROUTE NÀY

                        // --- Customers (Quản lý Khách hàng) ---
                        { path: 'users', element: <UserManager /> },
                        // { path: 'roles', element: <h2>Vai trò & Phân quyền</h2> }, // Thêm nếu bạn có làm menu Phân quyền
                        { path: 'reviews', element: <ReviewManager /> },

                        // --- Support (Chăm sóc & Hỗ trợ) ---
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