import { useState } from 'react';
import { message } from 'antd';
import { userService } from '../../../../service/userService';

interface UseChangePasswordProps {
    onClose: () => void;
}

export const useChangePassword = ({ onClose }: UseChangePasswordProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (newPassword.length < 6) {
            setErrorMsg("Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMsg("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            setIsLoading(true);
            const response = await userService.changePassword({
                oldPassword,
                newPassword,
                confirmPassword
            });

            if (response.code === 200) {
                message.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới nếu cần.");
                handleClose();
            } else {
                setErrorMsg(response.message || "Có lỗi xảy ra khi đổi mật khẩu");
            }
        } catch (error: any) {
            console.error("Lỗi đổi mật khẩu:", error);
            setErrorMsg(error.message || "Lỗi kết nối đến máy chủ");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMsg('');
        onClose();
    };

    return {
        oldPassword, setOldPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        isLoading,
        errorMsg,
        handleSubmit,
        handleClose
    };
};