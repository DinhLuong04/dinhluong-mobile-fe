import { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import { userService } from '../../../../service/userService';

interface UseEditProfileProps {
    isOpen: boolean;
    initialData: {
        fullName: string;
        phone: string;
        avatar: string;
    };
    onSaveSuccess: () => void;
    onClose: () => void;
}

export const useEditProfile = ({ isOpen, initialData, onSaveSuccess, onClose }: UseEditProfileProps) => {
    const [editForm, setEditForm] = useState({
        fullName: "",
        phone: "",
        avatarPreview: "",
        avatarFile: null as File | null
    });

    const [isLoading, setIsLoading] = useState(false);

    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setEditForm({
                fullName: initialData.fullName || "",
                phone: initialData.phone || "",
                avatarPreview: initialData.avatar || "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg",
                avatarFile: null
            });
        }
        
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
                objectUrlRef.current = null;
            }
        };
    }, [isOpen, initialData]);

    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }

            const imageUrl = URL.createObjectURL(file);
            objectUrlRef.current = imageUrl;

            setEditForm(prev => ({
                ...prev,
                avatarPreview: imageUrl,
                avatarFile: file
            }));
        }
    };

    const handlePhoneChange = (value: string) => {
        const onlyNumbers = value.replace(/\D/g, '');
        setEditForm(prev => ({ ...prev, phone: onlyNumbers }));
    };

    const handleFullNameChange = (value: string) => {
        setEditForm(prev => ({ ...prev, fullName: value }));
    };

    const handleSaveProfile = async () => {
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (editForm.phone && !phoneRegex.test(editForm.phone)) {
            message.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng số điện thoại 10 số.");
            return;
        }

        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("fullName", editForm.fullName);
            formData.append("phone", editForm.phone);
            if (editForm.avatarFile) {
                formData.append("avatar", editForm.avatarFile);
            }
            const response = await userService.updateProfile(formData);

            if (response.code === 200 && response.data) {
                const profileData = response.data;
                const oldUserStr = localStorage.getItem('user');
                
                if (oldUserStr) {
                    const oldUser = JSON.parse(oldUserStr);
                    const updatedUser = {
                        ...oldUser,
                        name: profileData.name || oldUser.name,
                        avatar: profileData.avatarUrl || oldUser.avatar
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }

                window.dispatchEvent(new Event('userUpdated'));
                message.success("Cập nhật thông tin thành công!");
                onSaveSuccess(); 
                onClose();      
            } else {
                message.error(response.message || "Lỗi cập nhật");
            }
        } catch (error) {
            console.error("Lỗi cập nhật profile:", error);
            message.error("Có lỗi xảy ra, vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        editForm,
        isLoading,
        handleEditImageChange,
        handlePhoneChange,
        handleFullNameChange,
        handleSaveProfile
    };
};