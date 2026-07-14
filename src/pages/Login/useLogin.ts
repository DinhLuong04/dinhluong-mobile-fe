import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { message, Modal } from 'antd';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import { authService } from '../../service/authService';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginResponse } from '../../types/auth.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const isVerified = searchParams.get('verified');
    const errorParam = searchParams.get('error');

    if (isVerified === 'true') {
        setSuccessMsg("✅ Kích hoạt tài khoản thành công! Bạn có thể đăng nhập.");
        window.history.replaceState({}, document.title, window.location.pathname);
    } 
    if (isVerified === 'false' && errorParam) {
        setFieldErrors(prev => ({ ...prev, general: decodeURIComponent(errorParam) }));
    }
  }, [searchParams]);

  // Ép kiểu chuẩn xác LoginResponse thay vì any
  const handleLoginSuccess = (payloadData: LoginResponse) => { 
    if (!payloadData || !payloadData.token) {
        message.error("Lỗi: Không nhận được Access Token từ máy chủ.");
        return; 
    }

    const userData: LoginResponse = {
        id: payloadData.id,
        name: payloadData.name,                          
        email: payloadData.email,
        avatar: payloadData.avatar,                      
        typeAccount: payloadData.typeAccount, // Đã fix camelCase từ Backend map xuống
        token: payloadData.token,                        
        refreshToken: payloadData.refreshToken,          
    };
    
    login(userData); 
    window.dispatchEvent(new Event('cartUpdated')); 
    navigate('/'); 
  };

  const loginGoogleAction = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        setIsLoading(true);
        const authData = await authService.loginGoogle(tokenResponse.access_token);
        handleLoginSuccess(authData); 
      } catch{
        setFieldErrors(prev => ({ ...prev, general: 'Đăng nhập Google thất bại' }));
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setFieldErrors(prev => ({ ...prev, general: 'Kết nối Google thất bại' }))
  });

  const handleFacebookResponse = async (response: any) => {
      if (!response.accessToken) return;
      try {
          setIsLoading(true);
          const authData = await authService.loginFacebook(response.accessToken);
          handleLoginSuccess(authData); 
      } catch{
          setFieldErrors(prev => ({ ...prev, general: 'Đăng nhập Facebook thất bại' }));
      } finally {
          setIsLoading(false);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'login-username' ? 'email' : 'password']: value
    }));
    if (fieldErrors.email || fieldErrors.password || fieldErrors.general) {
       setFieldErrors({ email: '', password: '', general: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({ email: '', password: '', general: '' });
    setSuccessMsg('');

    try {
      const authData = await authService.login(formData);
      handleLoginSuccess(authData); 
    } catch (error: any) { // Vẫn để any ở Catch block vì error của Axios/Fetch khó đoán
      const msg = error.message || 'Đăng nhập thất bại';
      const lowerMsg = msg.toLowerCase();
      const newErrors = { email: '', password: '', general: '' };

      if (lowerMsg.includes('không tồn tại')) {
        newErrors.email = 'Email không tồn tại trên hệ thống';
      } else if (lowerMsg.includes('sai mật khẩu')) {
        newErrors.password = 'Sai mật khẩu. Vui lòng thử lại';
      } else if (lowerMsg.includes('kích hoạt') || lowerMsg.includes('xác thực')) {
         newErrors.general = msg;
         Modal.confirm({
            title: 'Tài khoản chưa kích hoạt',
            content: 'Tài khoản chưa được kích hoạt. Bạn có muốn hệ thống gửi lại email xác thực không?',
            okText: 'Gửi lại',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await authService.resendVerification(formData.email);
                    message.success("Đã gửi lại email xác thực! Vui lòng kiểm tra hộp thư.");
                } catch (err: any) {
                    message.error("Gửi lại thất bại: " + (err.message || 'Lỗi không xác định'));
                }
            }
         });
      } else {
        newErrors.general = msg;
      }
      setFieldErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    fieldErrors,
    isLoading,
    successMsg,
    handleChange,
    handleSubmit,
    loginGoogleAction,
    handleFacebookResponse
  };
};