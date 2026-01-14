import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        {/* BÊN TRÁI: BANNER CHUYỂN HƯỚNG SANG LOGIN */}
        {/* Ở trang đăng ký, mình có thể đảo vị trí banner sang trái cho đẹp, hoặc giữ nguyên bên phải tuỳ bạn */}
        {/* Ở đây mình giữ cấu trúc giống Login: Form Trái - Banner Phải để đồng bộ */}
        
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3 className="auth-title">Đăng ký</h3>
            <div className="social-group">
              <a href="#" className="social-icon">F</a>
              <a href="#" className="social-icon">T</a>
            </div>
          </div>

          <form>
            <div className="input-group">
              <label className="input-label" htmlFor="reg-username">Email</label>
              <input 
                type="text" 
                id="reg-username" 
                className="input-field" 
                placeholder="Choose a username" 
                required 
              />
            </div>
            
            <div className="input-group">
              <label className="input-label" htmlFor="reg-password">Mật khẩu</label>
              <input 
                type="password" 
                id="reg-password" 
                className="input-field" 
                placeholder="Create a password" 
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="reg-confirm">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                id="reg-confirm" 
                className="input-field" 
                placeholder="Retype password" 
                required 
              />
            </div>

            <button type="submit" className="btn-submit">Đăng ký</button>

            <div className="form-footer">
               {/* Trang đăng ký thường có điều khoản sử dụng thay vì Remember Me */}
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>
               Tôi đồng ý với Điều khoản & Điều kiện
              </label>
            </div>
          </form>
        </div>

        {/* BÊN PHẢI: BANNER */}
        <div className="auth-banner-side">
          <h2 className="auth-banner-heading">Tham gia cùng chúng tôi</h2>
          <p className="auth-banner-text">Đã có tài khoản ?</p>
          {/* Link quay lại trang đăng nhập */}
          <Link to="/login" className="btn-switch-page">
           Đăng nhập
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;