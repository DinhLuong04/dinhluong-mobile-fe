import React from 'react';
import { Link } from 'react-router-dom';
import './BtnCart.css';
import { useBtnCart } from './useBtnCart';

const BtnCart: React.FC = () => {
    const { cartQuantity } = useBtnCart();

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