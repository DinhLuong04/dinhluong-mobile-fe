import React, { useState, useEffect } from 'react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        fullName: string;
        phone: string;
        avatar: string;
    };
    onSaveSuccess: () => void; // Hàm gọi để báo cho Profile load lại data
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, initialData, onSaveSuccess }) => {
    // Local state cho form
    const [editForm, setEditForm] = useState({
        fullName: "",
        phone: "",
        avatarPreview: "",
        avatarFile: null as File | null
    });

    const [isLoading, setIsLoading] = useState(false);

    // Lấy token
    const getToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    // Đồng bộ dữ liệu ban đầu khi modal mở lên
    useEffect(() => {
        if (isOpen) {
            setEditForm({
                fullName: initialData.fullName || "",
                phone: initialData.phone || "",
                avatarPreview: initialData.avatar || "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg",
                avatarFile: null
            });
        }
    }, [isOpen, initialData]);

    // Không render gì nếu modal đang đóng
    if (!isOpen) return null;

    // Xử lý chọn ảnh
    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setEditForm(prev => ({
                ...prev,
                avatarPreview: imageUrl,
                avatarFile: file
            }));
        }
    };

    // Xử lý lưu form
    const handleSaveProfile = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("fullName", editForm.fullName);
            formData.append("phone", editForm.phone);
            if (editForm.avatarFile) {
                formData.append("avatar", editForm.avatarFile);
            }

            const res = await fetch('http://localhost:8080/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                    // Không set Content-Type để trình duyệt tự lo boundary cho form-data
                },
                body: formData
            });

            const data = await res.json();
            if (data.code === 200) {
                const oldUserStr = localStorage.getItem('user');
                if (oldUserStr) {
                    const oldUser = JSON.parse(oldUserStr);
                    const updatedUser = {
                        ...oldUser,
                        fullName: data.data.fullName,
                        avatar: data.data.avatarUrl // Lưu ý trường avatarUrl trả về từ DB
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }

                // 2. BẮN TÍN HIỆU ĐỂ ACCOUNT HEADER TỰ ĐỘNG ĐỔI ẢNH
                window.dispatchEvent(new Event('userUpdated'));


                alert("Cập nhật thông tin thành công!");
                onSaveSuccess(); // Báo cho Profile.tsx fetch lại dữ liệu mới
                onClose();       // Đóng modal
            } else {
                alert(data.message || "Lỗi cập nhật");
            }
        } catch (error) {
            console.error("Lỗi cập nhật profile:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{
                background: '#fff', padding: '25px', borderRadius: '8px',
                width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>Cập nhật thông tin</h3>
                    <button onClick={onClose} disabled={isLoading} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                </div>

                {/* Chỗ đổi Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <img src={editForm.avatarPreview} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }} />
                    <input type="file" id="modal-avatar-upload" accept="image/*" onChange={handleEditImageChange} style={{ display: 'none' }} disabled={isLoading} />
                    <label htmlFor="modal-avatar-upload" style={{ color: '#cb1c22', cursor: isLoading ? 'wait' : 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                        Thay đổi ảnh
                    </label>
                </div>

                {/* Input Họ tên */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Họ và tên</label>
                    <input
                        type="text"
                        value={editForm.fullName}
                        onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
                        disabled={isLoading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                    />
                </div>

                {/* Input SĐT */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Số điện thoại</label>
                    <input
                        type="text"
                        value={editForm.phone}
                        onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                        disabled={isLoading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button onClick={onClose} disabled={isLoading} style={{ padding: '8px 15px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Hủy</button>
                    <button onClick={handleSaveProfile} disabled={isLoading} style={{ padding: '8px 15px', border: 'none', background: isLoading ? '#ccc' : '#cb1c22', color: '#fff', borderRadius: '4px', cursor: isLoading ? 'wait' : 'pointer', fontWeight: 'bold' }}>
                        {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
};