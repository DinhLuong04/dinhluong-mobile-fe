import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { BackToHomeButton } from '../../components/Common/BackToHomeButton/BackToHomeButton';
import { useLogin } from './useLogin'; 
import './Login.css';

const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12.06C22 6.53 17.5 2.05 12 2.05C6.5 2.05 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.72 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06H22Z" fill="#1877F2"/>
  </svg>
);

const LoginPage: React.FC = () => {
  const {
    formData,
    fieldErrors,
    isLoading,
    successMsg,
    handleChange,
    handleSubmit,
    loginGoogleAction,
    handleFacebookResponse
  } = useLogin();

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        <div className="auth-form-side">
          <BackToHomeButton />
          
          <div className="auth-form-header">
            <h3 className="auth-title">Đăng nhập</h3>
          </div>

          {/* FORM ĐĂNG NHẬP THƯỜNG */}
          <form onSubmit={handleSubmit}>
            {successMsg && (
                <div className="alert-success-msg" style={{ color: '#155724', backgroundColor: '#d4edda', borderColor: '#c3e6cb', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
                    {successMsg}
                </div>
            )}

            {fieldErrors.general && (
              <div className="alert-error-msg" style={{ color: '#d9503f', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>
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
              {fieldErrors.password && <div className="field-error-msg">{fieldErrors.password}</div>}
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <div className="form-footer">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                Ghi nhớ đăng nhập
              </label>
              <Link to="/forgot-password" className="link-forgot">Quên mật khẩu?</Link>
            </div>
          </form>

          {/* DÒNG KẺ PHÂN CÁCH SOCIAL */}
          <div className="social-divider" style={{ display: 'flex', alignItems: 'center', margin: '25px 0 15px 0' }}>
             <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
             <span style={{ padding: '0 10px', color: '#888', fontSize: '13px' }}>Hoặc đăng nhập với</span>
             <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="social-group" style={{ marginBottom: '20px' }}>
              <button 
                type="button" 
                className="social-btn google-btn"
                onClick={() => loginGoogleAction()} 
                title="Đăng nhập bằng Google"
                disabled={isLoading}
              >
                 <GoogleIcon />
              </button>
              
              <FacebookLogin
                appId={FACEBOOK_APP_ID || ''}
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookResponse}
                render={(renderProps: any) => (
                  <button 
                    type="button" 
                    className="social-btn facebook-btn"
                    onClick={renderProps.onClick}
                    disabled={isLoading || renderProps.isProcessing}
                    title="Đăng nhập bằng Facebook"
                  >
                     <FacebookIcon />
                  </button>
                )}
              />
          </div>

        </div>

        {/* BANNER BÊN PHẢI */}
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