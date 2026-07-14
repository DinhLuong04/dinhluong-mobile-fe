import React from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import { useForgotPassword } from './useForgotPassword';

const ForgotPasswordPage: React.FC = () => {
  const {
    step,
    formData,
    isLoading,
    message,
    countdown,
    handleChange,
    handleSendOtp,
    handleResetPassword
  } = useForgotPassword();

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        <div style={{ padding: '40px', width: '100%' }}>
          <div className="auth-form-header">
            <h3 className="auth-title">Quên mật khẩu</h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '10px' }}>
              {step === 1 
                ? "Nhập email của bạn để nhận mã xác thực" 
                : `Đã gửi mã OTP tới: ${formData.email}`}
            </p>
          </div>

          {/* HIỂN THỊ THÔNG BÁO */}
          {message.content && (
            <div style={{
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              backgroundColor: message.type === 'error' ? '#ffe6e6' : '#d4edda',
              color: message.type === 'error' ? 'red' : '#155724'
            }}>
              {message.content}
            </div>
          )}

          {step === 1 ? (
            // --- FORM BƯỚC 1: LẤY OTP ---
            <form onSubmit={handleSendOtp}>
              <div className="input-group">
                <label className="input-label" htmlFor="email">Email đăng ký</label>
                <input 
                  type="email" 
                  id="email"
                  className="input-field" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Đang gửi..." : "Lấy mã OTP"}
              </button>
            </form>
          ) : (
            // --- FORM BƯỚC 2: ĐỔI MẬT KHẨU ---
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <label className="input-label" htmlFor="otp">Mã OTP (6 số)</label>
                <input 
                  type="text" 
                  id="otp"
                  className="input-field" 
                  placeholder="Nhập mã OTP trong email" 
                  required 
                  value={formData.otp}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="newPassword">Mật khẩu mới</label>
                <input 
                  type="password" 
                  id="newPassword"
                  className="input-field" 
                  placeholder="Nhập mật khẩu mới" 
                  required 
                  minLength={6}
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  className="input-field" 
                  placeholder="Nhập lại mật khẩu mới" 
                  required 
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>

              {/* Nút gửi lại OTP */}
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button 
                  type="button"
                  onClick={() => handleSendOtp()}
                  disabled={countdown > 0 || isLoading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: countdown > 0 ? '#999' : '#007bff',
                    cursor: countdown > 0 ? 'default' : 'pointer',
                    textDecoration: 'underline',
                    fontSize: '14px'
                  }}
                >
                  {countdown > 0 ? `Gửi lại mã sau ${countdown}s` : "Chưa nhận được mã? Gửi lại"}
                </button>
              </div>
            </form>
          )}

          {/* QUAY LẠI */}
          <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>
              ← Quay lại Đăng nhập
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;