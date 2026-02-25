import React, { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getToken = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).token : '';
  };

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
      const res = await fetch('http://localhost:8080/api/users/change-password', { // Đổi lại path API theo Controller của bạn
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
      });

      const data = await res.json();
      
      if (data.code === 200) {
        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới nếu cần.");
        handleClose();
      } else {
        setErrorMsg(data.message || "Có lỗi xảy ra khi đổi mật khẩu");
      }
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      setErrorMsg("Lỗi kết nối đến máy chủ");
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