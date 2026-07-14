import React from 'react';
import { useEditProfile } from './useEditProfile';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: {
        fullName: string;
        phone: string;
        avatar: string;
    };
    onSaveSuccess: () => void; 
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ 
    isOpen, 
    onClose, 
    initialData, 
    onSaveSuccess 
}) => {
    const {
        editForm,
        isLoading,
        handleEditImageChange,
        handlePhoneChange,
        handleFullNameChange,
        handleSaveProfile
    } = useEditProfile({ isOpen, initialData, onSaveSuccess, onClose });

    if (!isOpen) return null;

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

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <img src={editForm.avatarPreview} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }} />
                    <input type="file" id="modal-avatar-upload" accept="image/*" onChange={handleEditImageChange} style={{ display: 'none' }} disabled={isLoading} />
                    <label htmlFor="modal-avatar-upload" style={{ color: '#cb1c22', cursor: isLoading ? 'wait' : 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                        Thay đổi ảnh
                    </label>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Họ và tên</label>
                    <input
                        type="text"
                        value={editForm.fullName}
                        onChange={e => handleFullNameChange(e.target.value)}
                        disabled={isLoading}
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Số điện thoại</label>
                    <input
                        type="tel"
                        value={editForm.phone}
                        maxLength={10}
                        onChange={e => handlePhoneChange(e.target.value)}
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