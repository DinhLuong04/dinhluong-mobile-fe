DinhLuong Mobile 

Frontend của DinhLuong Mobile — một nền tảng thương mại điện tử bán điện thoại và phụ kiện, cung cấp giao diện người dùng cho việc duyệt sản phẩm, mua hàng và quản lý tài khoản.
Ứng dụng được xây dựng bằng React, TypeScript và Vite, kết nối với hệ thống backend thông qua RESTful API.

🧩 Tổng quan

Ngôn ngữ: TypeScript
Framework: React 18
Build Tool: Vite
Routing: React Router
HTTP Client: Axios
State Management: React Context API
Styling: Twind (CSS-in-JS) + CSS Modules
Deployment: Vercel

Hệ thống cung cấp giao diện cho các chức năng như duyệt sản phẩm, quản lý giỏ hàng, thanh toán và quản trị hệ thống.

🚀 Tính năng chính

📱 Danh mục & sản phẩm

Xem danh sách sản phẩm theo danh mục

Xem chi tiết sản phẩm

Lọc và tìm kiếm sản phẩm

🛒 Giỏ hàng & thanh toán

Thêm / xóa sản phẩm khỏi giỏ hàng

Cập nhật số lượng

Tiến hành thanh toán

👤 Quản lý tài khoản

Đăng ký / đăng nhập

Cập nhật thông tin cá nhân

Xem lịch sử đơn hàng

Quản lý voucher

⚖️ So sánh sản phẩm

So sánh nhiều sản phẩm cùng lúc để hỗ trợ quyết định mua hàng

💬 Hỗ trợ khách hàng

Chatbot hỗ trợ

Live chat với hệ thống

🛠 Admin Dashboard

Quản lý sản phẩm

Quản lý đơn hàng

Quản lý người dùng

📱 Responsive Design

Tương thích trên mobile, tablet và desktop

🛠️ Yêu cầu hệ thống

Node.js: 16+
Package Manager: npm hoặc yarn

Kiểm tra phiên bản:

node -v
npm -v
▶️ Cài đặt & chạy dự án
Clone repository
git clone <repository-url>
cd shop-ecommerce
Cài đặt dependencies
npm install
Chạy ở môi trường development
npm run dev

Ứng dụng chạy tại:

http://localhost:5173
📦 Build production
npm run build

Preview production build:

npm run preview
📂 Cấu trúc dự án
src
│
├── api/              # Axios client và cấu hình API
├── assets/           # Hình ảnh, CSS
├── components/       # Component tái sử dụng
│
├── contexts/         # React Context (state management)
├── hooks/            # Custom hooks
│
├── layouts/          # Layout của trang
├── pages/            # Các trang chính
│
├── routes/           # Cấu hình routing
├── service/          # API services
├── types/            # TypeScript types
└── utils/            # Hàm tiện ích
🔗 API & Backend

Frontend kết nối với hệ thống Backend REST API.

Cấu hình API nằm tại:

src/config/api.config.ts
src/api/axiosClient.ts

Axios được sử dụng để xử lý:

HTTP Requests

Interceptors

Authentication token



📧 Liên hệ

Ban Dinh Luong

Email: bandinhluong220204@gmail.com

GitHub: https://github.com/DinhLuong04