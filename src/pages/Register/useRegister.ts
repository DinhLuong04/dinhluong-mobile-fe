
import { useState } from 'react';
import { authService } from '../../service/authService';

export const useRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value 
    }));
    // Chỉ xóa lỗi nếu đang có lỗi để tránh render thừa
    if (errorMsg) setErrorMsg(''); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    setErrorMsg(''); 
    
    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });

      setIsSuccess(true);
    } catch (error: any) {
      const msg = error.message || "Đăng ký thất bại, vui lòng thử lại";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    errorMsg,
    isSuccess,
    handleChange,
    handleSubmit
  };
};