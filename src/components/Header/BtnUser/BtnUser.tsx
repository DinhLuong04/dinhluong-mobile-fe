import React, { useState } from 'react';
import './BtnUser.css';
import { Link } from 'react-router-dom';
import LoginToggle from './LoginToggle/LoginToggle';
// 1. Import Hook từ Context
import { useAuth } from '../../../contexts/AuthContext'; 

const BtnUser = () => {
    // 2. Thay vì biến cứng, hãy lấy dữ liệu thật từ Context
    // user: chứa thông tin (name, email...)
    // isLogin: true/false
    // logout: hàm đăng xuất
    const { isLogin, user } = useAuth(); 

    // State quản lý ẩn/hiện menu (giữ nguyên)
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // Hàm xử lý khi bấm Đăng xuất (truyền xuống LoginToggle nếu cần)
    // const handleLogoutClick = () => {
    //     logout(); // Gọi hàm logout của context
    //     setIsOpen(false); // Đóng menu
    // };

    return (
        // 3. Dùng biến isLogin của Context để kiểm tra
        !isLogin ? (
            <Link to="/login" className="inner-btn-user" title="Tài khoản">
                <i className="fa-solid fa-user"></i>
                <span className="user-text desktop-only">Đăng nhập</span>
            </Link> 
        ) : (
            <div className="inner-btn-user" onClick={handleToggle} style={{ cursor: 'pointer' }}> 
                <i className="fa-solid fa-user"></i>
                {/* 4. Hiển thị tên thật của User */}
                <span className="user-text-login desktop-only">
                    {user?.name || "Khách hàng"}
                </span>
                
                {isOpen && (
                    <LoginToggle 
                        onClose={handleClose} 
                        // Bạn nên truyền thêm hàm logout vào đây để tạo nút Đăng xuất bên trong menu
                        //onLogout={handleLogoutClick}
                    />
                )}
            </div>
        )
    );
};

export default BtnUser;