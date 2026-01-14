import React from 'react';

import './BtnUser.css';
import { Link } from 'react-router-dom';

const BtnUser = () => {
    return (
       
            <Link to="/login" className="inner-btn-user" title="Tài khoản">
                <i className="fa-solid fa-user"></i>
                <span className="user-text desktop-only">Đăng nhập</span>
            </Link> 
    );
};
export default BtnUser;