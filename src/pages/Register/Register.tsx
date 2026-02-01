import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';
import { authService } from '../../service/authService'; // ⚠️ Nhớ import service của bạn

const RegisterPage: React.FC = () => {
  // 1. State lưu dữ liệu form
  const [formData, setFormData] = useState({
    fullName: '', // Thêm trường này vì Backend cần
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 2. State quản lý trạng thái UI
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Để chuyển sang màn hình thông báo check mail

  // Hàm xử lý khi người dùng gõ phím
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value // id của input phải khớp với tên key trong formData
    });
    setErrorMsg(''); // Xóa lỗi khi người dùng sửa lại
  };

  // Hàm xử lý khi bấm Đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate cơ bản
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Gọi API đăng ký
      await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });

      // Nếu thành công -> Đổi giao diện sang thông báo
      setIsSuccess(true);

    } catch (error: any) {
      // Lấy lỗi từ Backend trả về
      const msg = error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3 className="auth-title">Đăng ký</h3>
            {/* Có thể ẩn social login khi đang ở mode đăng ký mail */}
          </div>

          {/* --- LOGIC HIỂN THỊ --- */}
          {isSuccess ? (
            // GIAO DIỆN THÔNG BÁO THÀNH CÔNG (CHECK MAIL)
            <div style={{ textAlign: 'center', padding: '20px', animation: 'fadeIn 0.5s' }}>
               <div style={{ fontSize: '60px', marginBottom: '20px' }}>✉️</div>
               <h3 style={{ color: '#28a745', marginBottom: '10px' }}>Đăng ký thành công!</h3>
               <p style={{ color: '#555', lineHeight: '1.6' }}>
                 Một email xác thực đã được gửi đến: <br/>
                 <strong>{formData.email}</strong>
               </p>
               <p style={{ fontSize: '13px', color: '#888', marginTop: '15px' }}>
                 Vui lòng kiểm tra hộp thư đến (hoặc thư rác) và bấm vào liên kết để kích hoạt tài khoản.
               </p>
               <Link to="/login" className="btn-submit" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
                 Quay lại Đăng nhập
               </Link>
            </div>
          ) : (
            // GIAO DIỆN FORM ĐĂNG KÝ
            <form onSubmit={handleSubmit}>
              
              {/* Hiển thị lỗi nếu có */}
              {errorMsg && (
                <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
                  {errorMsg}
                </div>
              )}

              {/* Thêm trường Họ và Tên */}
              <div className="input-group">
                <label className="input-label" htmlFor="fullName">Họ và tên</label>
                <input 
                  type="text" 
                  id="fullName" 
                  className="input-field" 
                  placeholder="Nguyễn Văn A" 
                  required 
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="input-field" 
                  placeholder="email@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="password">Mật khẩu</label>
                <input 
                  type="password" 
                  id="password" 
                  className="input-field" 
                  placeholder="Tạo mật khẩu" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  className="input-field" 
                  placeholder="Nhập lại mật khẩu" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>

              <div className="form-footer">
                <label className="checkbox-container">
                  <input type="checkbox" required />
                  <span className="checkmark"></span>
                  Tôi đồng ý với Điều khoản & Điều kiện
                </label>
              </div>
            </form>
          )}
          {/* --- HẾT LOGIC HIỂN THỊ --- */}
        </div>

        {/* BÊN PHẢI: BANNER */}
        <div className="auth-banner-side">
          <h2 className="auth-banner-heading">Tham gia cùng chúng tôi</h2>
          <p className="auth-banner-text">Đã có tài khoản ?</p>
          <Link to="/login" className="btn-switch-page">
           Đăng nhập
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;