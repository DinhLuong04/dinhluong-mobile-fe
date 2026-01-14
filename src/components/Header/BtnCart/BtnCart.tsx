import React from 'react';
import { Link } from 'react-router-dom';
import './BtnCart.css';
const BtnCart =()=>{
    return(<div className="inner-btn-cart">
         <Link to="/cart" className="icon-btn cart-btn">
               <i className="fa-solid fa-cart-shopping"></i>
                <span className="cart-text desktop-only">Giỏ hàng</span>
            </Link>
    </div>)
}
export default BtnCart;