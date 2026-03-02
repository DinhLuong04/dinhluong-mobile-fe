import React, { useState, useEffect, useCallback } from 'react';
import { message, Modal } from 'antd'; // 1. IMPORT MESSAGE VÀ MODAL TỪ ANTD
import "./Profile.css";
import { EditProfileModal } from './EditProfileModal/EditProfileModal';
import { AddressModal } from './AddressModal/AddressModal';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal'; 

// --- KHAI BÁO COMPONENT ICON BÊN NGOÀI ---
const EditIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>
);
const PlusIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M12 5l0 14"></path><path d="M5 12l14 0"></path></svg>
);
const LinkIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 15l6 -6"></path><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path></svg>
);
// -------------------------------------------------------------

const Profile = () => {
  const [addressList, setAddressList] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState(() => {
    const userStr = localStorage.getItem('user');
    const localUser = userStr ? JSON.parse(userStr) : null;
    
    return {
      avatar: localUser?.avatarUrl || localUser?.avatar || "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg", 
      name: localUser?.name || "Người dùng",
      phone: localUser?.phone || "Chưa cập nhật",
      email: localUser?.email || "Chưa cập nhật",
      address: "Chưa có địa chỉ mặc định",
      typeAccount: localUser?.typeAccount || "NORMAL" 
    };
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const getToken = useCallback(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).token : '';
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users/profile', {
        headers: { 
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      
      if (data.code === 200) {
        const profileData = data.data;
        setUserInfo(prev => ({
          ...prev,
          name: profileData.name || "Người dùng",
          email: profileData.email || "Chưa cập nhật",
          phone: profileData.phone || "Chưa cập nhật",
          avatar: profileData.avatarUrl || prev.avatar
        }));
        
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const localUser = JSON.parse(userStr);
          localStorage.setItem('user', JSON.stringify({ ...localUser, ...profileData }));
        }
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin cá nhân", error);
    }
  }, [getToken]);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/addresses', {
        headers: { 
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      
      if (data.code === 200) {
        setAddressList(data.data || []);
        const defaultAddr = (data.data || []).find((a: any) => a.isDefault);
        if (defaultAddr) {
          const fullAddrString = [defaultAddr.street, defaultAddr.city, defaultAddr.province, defaultAddr.country]
                                  .filter(Boolean).join(", ");
          setUserInfo(prev => ({ ...prev, address: fullAddrString }));
        }
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách địa chỉ", error);
    }
  }, [getToken]);

  useEffect(() => {
    fetchUserProfile();
    fetchAddresses();
  }, [fetchUserProfile, fetchAddresses]);

  const handleSetDefault = async (addressId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.code === 200) {
        message.success("Đã đặt làm địa chỉ mặc định"); // Thêm thông báo thành công cho mượt
        fetchAddresses(); 
      } else {
         message.error(data.message || "Có lỗi xảy ra"); // 2. THAY THẾ ALERT BẰNG MESSAGE.ERROR
      }
    } catch (error) {
      console.error("Lỗi set địa chỉ mặc định", error);
      message.error("Lỗi kết nối máy chủ");
    }
  };

  const handleDeleteAddress = (addressId: number) => {
    // 3. THAY THẾ WINDOW.CONFIRM BẰNG MODAL.CONFIRM CỦA ANTD
    Modal.confirm({
      title: 'Xóa địa chỉ',
      content: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/addresses/${addressId}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json'
            }
          });
          const data = await res.json();
          
          if (data.code === 200) {
            message.success("Đã xóa địa chỉ");
            fetchAddresses(); 
          } else {
            message.error(data.message || "Có lỗi xảy ra khi xóa"); // 4. THAY THẾ ALERT BẰNG MESSAGE.ERROR
          }
        } catch (error) {
          console.error("Lỗi xóa địa chỉ", error);
          message.error("Lỗi kết nối máy chủ");
        }
      }
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
                <button className="btn-addr" onClick={() => handleDeleteAddress(addr.id)}>
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