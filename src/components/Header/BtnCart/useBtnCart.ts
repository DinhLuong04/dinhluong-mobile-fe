import { useState, useEffect, useCallback } from 'react';
import { cartService } from '../../../service/cartService';

export const useBtnCart = () => {
    const [cartQuantity, setCartQuantity] = useState(0);

    const fetchCartCount = useCallback(async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            setCartQuantity(prev => (prev !== 0 ? 0 : prev));
            return;
        }
        try {
            const cartData = await cartService.getCart();
            const items = cartData?.items || [];
            setCartQuantity(items.length);
        } catch (error) {
            console.error("Lỗi lấy số lượng giỏ hàng:", error);
            setCartQuantity(0);
        }
    }, []);

    useEffect(() => {
        const initCart = setTimeout(() => {
            fetchCartCount();
        }, 0);

        window.addEventListener('cartUpdated', fetchCartCount);

        return () => {
            clearTimeout(initCart);
            window.removeEventListener('cartUpdated', fetchCartCount);
        };
    }, [fetchCartCount]);

    return {
        cartQuantity
    };
};