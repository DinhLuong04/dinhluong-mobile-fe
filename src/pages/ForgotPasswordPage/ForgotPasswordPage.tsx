import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService';
import '../Login/Login.css'; // Tái sử dụng CSS của Login

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  // --- STATE QUẢN LÝ ---
  const [step, setStep] = useState(1); // 1: Nhập Email, 2: Nhập OTP & Pass mới
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' }); // type: 'success' | 'error'
  const [countdown, setCountdown] = useState(0); // Đếm ngược gửi lại OTP

  // --- XỬ LÝ ĐẾM NGƯỢC ---
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // --- BƯỚC 1: GỬI EMAIL LẤY OTP ---
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await authService.forgotPassword(email);
      setStep(2); // Chuyển sang bước 2
      setCountdown(60); // Bắt đầu đếm ngược 60s
      setMessage({ type: 'success', content: '✅ Mã OTP đã được gửi tới email của bạn!' });
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message || 'Lỗi gửi OTP' });
    } finally {
      setIsLoading(false);
    }
  };

  // --- BƯỚC 2: ĐỔI MẬT KHẨU ---
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', content: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await authService.resetPassword({
        email,
        otp,
        newPassword
      });
      
      // Thành công -> Thông báo và chuyển về Login sau 2s
      setMessage({ type: 'success', content: '🎉 Đổi mật khẩu thành công! Đang chuyển hướng...' });
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message || 'Đổi mật khẩu thất bại' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        <div style={{ padding: '40px', width: '100%' }}>
          <div className="auth-form-header">
            <h3 className="auth-title">Quên mật khẩu</h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '10px' }}>
              {step === 1 
                ? "Nhập email của bạn để nhận mã xác thực" 
                : `Đã gửi mã OTP tới: ${email}`}
            </p>
          </div>

          {/* Hiển thị thông báo */}
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
            // --- FORM BƯỚC 1 ---
            <form onSubmit={handleSendOtp}>
              <div className="input-group">
                <label className="input-label">Email đăng ký</label>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Đang gửi..." : "Lấy mã OTP"}
              </button>
            </form>
          ) : (
            // --- FORM BƯỚC 2 ---
            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <label className="input-label">Mã OTP (6 số)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Nhập mã OTP trong email" 
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Mật khẩu mới</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="Nhập mật khẩu mới" 
                  required 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Xác nhận mật khẩu</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="Nhập lại mật khẩu mới" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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