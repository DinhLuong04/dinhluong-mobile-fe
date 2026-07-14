import { useState } from 'react';
import { Modal } from 'antd'; 
import "./Profile.css";
import { EditProfileModal } from './EditProfileModal/EditProfileModal';
import { AddressModal } from './AddressModal/AddressModal';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal'; 
import { useProfile } from './useProfile'; 
import { EditIcon, PlusIcon, LinkIcon } from './ProfileIcons';

const Profile = () => {
  const { 
    userInfo, 
    addressList, 
    fetchUserProfile, 
    fetchAddresses, 
    handleSetDefault, 
    handleDeleteAddress 
  } = useProfile();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const confirmDeleteAddress = (addressId: number) => {
    Modal.confirm({
      title: 'Xóa địa chỉ',
      content: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: () => handleDeleteAddress(addressId)
    });
  };

  const openEditAddressModal = (addr: any) => {
    setEditingAddress(addr); 
    setIsAddressModalOpen(true); 
  };

  const openAddAddressModal = () => {
    setEditingAddress(null); 
    setIsAddressModalOpen(true);
  };

  return (
    <div className="profile-container">
      {/* MODALS */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialData={{
          fullName: userInfo.name !== "Người dùng" ? userInfo.name : "",
          phone: userInfo.phone !== "Chưa cập nhật" ? userInfo.phone : "",
          avatar: userInfo.avatar
        }}
        onSaveSuccess={fetchUserProfile}
      />
      
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
            setIsAddressModalOpen(false);
            setEditingAddress(null);
        }}
        onSaveSuccess={fetchAddresses}
        initialData={editingAddress}
      />

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* THÔNG TIN CÁ NHÂN */}
      <div className="profile-card">
        <div className="card-header">
          <div className="card-title">Thông tin cá nhân</div>
          <button className="card-action" onClick={() => setIsEditModalOpen(true)}>
            <EditIcon /> Cập nhật
          </button>
        </div>
        
        <div className="info-grid">
          <div className="info-col">
            <div className="avatar-row">
              <span className="info-label">Ảnh đại diện:</span>
              <div className="avatar-wrapper">
                <img src={userInfo.avatar} alt="Avatar" className="current-avatar" style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div className="info-row">
              <span className="info-label">Họ và tên:</span>
              <span className="info-value">{userInfo.name}</span>
            </div>
          </div>

          <div className="info-col">
            <div className="info-row">
              <span className="info-label">Số điện thoại:</span>
              <span className="info-value">{userInfo.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{userInfo.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Địa chỉ mặc định:</span>
              <span className="info-value">{userInfo.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SỔ ĐỊA CHỈ */}
      <div className="profile-card">
        <div className="card-header">
          <div className="card-title">Sổ địa chỉ</div>
          <button className="card-action" onClick={openAddAddressModal}>
            <PlusIcon /> Thêm địa chỉ
          </button>
        </div>

        <div className="address-grid">
          {addressList.map((addr) => (
            <div key={addr.id} className="address-item" style={{ border: addr.isDefault ? '1px solid #cb1c22' : '1px solid #eaeaea' }}>
              <div className="address-content">
                <div className="address-header">
                    <span className="addr-name">{userInfo.name}</span>
                    <div className="addr-divider"></div>
                    <span className="addr-phone">{userInfo.phone}</span>
                    {addr.isDefault && (
                        <span style={{ marginLeft: '10px', color: '#cb1c22', fontSize: '12px', border: '1px solid #cb1c22', padding: '2px 6px', borderRadius: '4px' }}>
                            Mặc định
                        </span>
                    )}
                </div>
                <div className="addr-text">
                    {[addr.street, addr.city, addr.province, addr.country].filter(Boolean).join(", ")}
                </div>
              </div>
              <div className="address-actions">
                {!addr.isDefault && (
                    <button className="btn-addr" onClick={() => handleSetDefault(addr.id)} style={{ color: '#0066cc' }}>
                        Đặt mặc định
                    </button>
                )}
                {/* Đã thay đổi onClick gọi hàm confirmDeleteAddress để dùng Modal antd */}
                <button className="btn-addr" onClick={() => confirmDeleteAddress(addr.id)}>
                    Xóa
                </button>
                <button className="btn-addr btn-update" onClick={() => openEditAddressModal(addr)}>
                    Cập nhật
                </button>
              </div>
            </div>
          ))}
          
          {addressList.length === 0 && (
              <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>Bạn chưa lưu địa chỉ nào.</p>
          )}
        </div>
      </div>

      {/* MẬT KHẨU & TÀI KHOẢN LIÊN KẾT */}
      <div className="bottom-grid">
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">Mật khẩu</div>
            {userInfo.typeAccount === 'NORMAL' ? (
                <button className="card-action" onClick={() => setIsPasswordModalOpen(true)}>
                  <EditIcon /> Thay đổi mật khẩu
                </button>
              ) : (
                <span style={{ fontSize: '13px', color: '#666', fontStyle: 'italic', marginTop: '2px' }}>
                  Không áp dụng cho tài khoản {userInfo.typeAccount}
                </span>
              )}
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">Tài khoản liên kết</div>
          </div>
          <div className="linked-row">
            <div className="linked-info">
              <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-google.b6f9570f.svg" alt="Google" className="linked-logo" />
              <span>Google</span>
              <span className="badge-linked">Đã liên kết</span>
            </div>
            <div className="btn-link-action action-unlink">
              <LinkIcon /> Hủy liên kết
            </div>
          </div>
          <div className="linked-row">
            <div className="linked-info">
              <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-zalo.120d889f.svg" alt="Zalo" className="linked-logo" />
              <span>Zalo</span>
            </div>
            <div className="btn-link-action action-link">
              <LinkIcon /> Liên kết
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;