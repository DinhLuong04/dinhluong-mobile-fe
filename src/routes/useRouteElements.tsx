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
                    path: ':Product/:slug', 
                    element: <ProductDetail />
                },
                {
                    path:"compare",
                    element:<CompareProduct/>
                },
                {
                    path:"Cart",
                    element:<CartPage/>
                },
                {
                    path:"Checkout",
                    element:<Checkout/>
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
                            element: <OrderHistory/>
                        },
                        {
                            path: "promotion", // Link: /member/promotion
                            element: <div>Trang ưu đãi</div> 
                        },
                        {
                            path:"profile",
                            element:<Profile/>
                        },
                        {
                            path:"voucher",
                            element:<VoucherCenter/>
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
            path:'/forgot-password',
            element:<ForgotPasswordPage/>
        }
    ]);

    return routeElements;
}