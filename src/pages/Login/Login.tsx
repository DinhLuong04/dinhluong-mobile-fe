import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService';
import './Login.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State quản lý lỗi riêng biệt
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'login-username' ? 'email' : 'password']: value
    }));

    // UX: Người dùng gõ lại thì xóa lỗi đi nhìn cho sạch
    if (fieldErrors.email || fieldErrors.password || fieldErrors.general) {
       setFieldErrors(prev => ({
         ...prev,
         general: '',
         [id === 'login-username' ? 'email' : 'password']: ''
       }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({ email: '', password: '', general: '' });

    try {
      const user = await authService.login({
        email: formData.email,
        password: formData.password
      });
      console.log('Login success:', user);
      navigate('/');
    } catch (error: unknown) {
      let msg = 'Đăng nhập thất bại';
      if (error instanceof Error) msg = error.message;

      const newErrors = { email: '', password: '', general: '' };
      const lowerMsg = msg.toLowerCase();

      // --- BẮT LỖI TẠI ĐÂY ---
      if (lowerMsg.includes('email không tồn tại')) {
        newErrors.email = 'Email không tồn tại trên hệ thống';
      } else if (lowerMsg.includes('sai mật khẩu')) {
        newErrors.password = 'Sai mật khẩu. Vui lòng thử lại';
      } else {
        newErrors.general = msg;
      }
      setFieldErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3 className="auth-title">Đăng nhập</h3>
            <div className="social-group">
              <a href="#" className="social-icon">F</a>
              <a href="#" className="social-icon">T</a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Lỗi chung */}
            {fieldErrors.general && (
              <div style={{ color: '#d9503f', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>
                ⚠️ {fieldErrors.general}
              </div>
            )}

            <div className="input-group">
              <label className="input-label" htmlFor="login-username">Email</label>
              <input 
                type="text" 
                id="login-username" 
                className={`input-field ${fieldErrors.email ? 'error' : ''}`} 
                placeholder="Email" 
                required 
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {/* Lỗi Email */}
              {fieldErrors.email && <div className="field-error-msg">{fieldErrors.email}</div>}
            </div>
            
            <div className="input-group">
              <label className="input-label" htmlFor="login-password">Mật khẩu</label>
              <input 
                type="password" 
                id="login-password" 
                className={`input-field ${fieldErrors.password ? 'error' : ''}`}
                placeholder="Password" 
                required 
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {/* Lỗi Password */}
              {fieldErrors.password && <div className="field-error-msg">{fieldErrors.password}</div>}
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Đăng nhập"}
            </button>

            <div className="form-footer">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <a href="#" className="link-forgot">Quên mật khẩu</a>
            </div>
          </form>
        </div>

        <div className="auth-banner-side">
          <h2 className="auth-banner-heading">Chào mừng đến với DinhLuongMobile</h2>
          <p className="auth-banner-text">Bạn chưa có tài khoản?</p>
          <Link to="/register" className="btn-switch-page">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;