import React from 'react';
import { useChangePassword } from './useChangePassword';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    errorMsg,
    handleSubmit,
    handleClose
  } = useChangePassword({ onClose });

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', 
        justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
          background: '#fff', padding: '25px', borderRadius: '8px', 
          width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '15px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Thay đổi mật khẩu</h3>
          <button onClick={handleClose} disabled={isLoading} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
        </div>

        {errorMsg && <div style={{ color: '#cb1c22', fontSize: '14px', backgroundColor: '#ffe6e6', padding: '8px', borderRadius: '4px' }}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Mật khẩu hiện tại</label>
            <input 
              type="password" 
              value={oldPassword} 
              onChange={e => setOldPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              required
              disabled={isLoading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Mật khẩu mới</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={handleClose} disabled={isLoading} style={{ padding: '10px 15px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Hủy</button>
            <button type="submit" disabled={isLoading} style={{ padding: '10px 15px', border: 'none', background: isLoading ? '#ccc' : '#cb1c22', color: '#fff', borderRadius: '4px', cursor: isLoading ? 'wait' : 'pointer', fontWeight: 'bold' }}>
              {isLoading ? 'Đang xử lý...' : 'Lưu mật khẩu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;