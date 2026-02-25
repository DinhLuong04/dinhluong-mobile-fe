import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './BtnCart.css';

const BtnCart = () => {
    // State lưu số lượng sản phẩm trong giỏ
    const [cartQuantity, setCartQuantity] = useState(0);

    // Hàm gọi API lấy tổng số lượng trong giỏ hàng
    const fetchCartCount = useCallback(async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            // Fix lỗi cascading renders: Chỉ cập nhật nếu giá trị cũ đang khác 0
            setCartQuantity(prev => (prev !== 0 ? 0 : prev));
            return;
        }

        const user = JSON.parse(userStr);

        try {
            const response = await fetch(`http://localhost:8080/api/cart/${user.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const items = data.data?.items || [];
                setCartQuantity(items.length);
            }
        } catch (error) {
            console.error("Lỗi lấy số lượng giỏ hàng:", error);
        }
    }, []);

    useEffect(() => {
        // Trì hoãn việc gọi hàm để tránh đồng bộ setState ở lần render đầu
        const initCart = setTimeout(() => {
            fetchCartCount();
        }, 0);

        window.addEventListener('cartUpdated', fetchCartCount);

        return () => {
            clearTimeout(initCart);
            window.removeEventListener('cartUpdated', fetchCartCount);
        };
    }, [fetchCartCount]);

    return (
        <div className="inner-btn-cart">
            <Link to="/cart" className="icon-btn cart-btn">
                <i className="fa-solid fa-cart-shopping">
                    {/* Chỉ hiện cục đỏ đỏ nếu có sản phẩm */}
                    {cartQuantity > 0 && <span className="cart-quatity">{cartQuantity}</span>}
                </i>
                <span className="cart-text desktop-only">Giỏ hàng</span>
            </Link>
        </div>
    );
};

export default BtnCart;