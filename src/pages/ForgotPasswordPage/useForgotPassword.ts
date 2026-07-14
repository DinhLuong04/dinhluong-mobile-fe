import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService';

export const useForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Nhập Email, 2: Nhập OTP & Pass mới
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' }); 
  const [countdown, setCountdown] = useState(0);

  // Xử lý đếm ngược OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (message.content) setMessage({ type: '', content: '' }); // Xóa thông báo lỗi khi đang gõ
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await authService.forgotPassword(formData.email);
      setStep(2); 
      setCountdown(60); 
      setMessage({ type: 'success', content: '✅ Mã OTP đã được gửi tới email của bạn!' });
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message || 'Lỗi gửi OTP, vui lòng thử lại' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', content: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      await authService.resetPassword({
        token: formData.otp, 
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      
      setMessage({ type: 'success', content: '🎉 Đổi mật khẩu thành công! Đang chuyển hướng...' });
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error: any) {
      setMessage({ type: 'error', content: error.message || 'Đổi mật khẩu thất bại' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    formData,
    isLoading,
    message,
    countdown,
    handleChange,
    handleSendOtp,
    handleResetPassword
  };
};