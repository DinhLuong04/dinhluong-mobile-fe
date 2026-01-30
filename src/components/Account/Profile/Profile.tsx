import React, { useState } from 'react';
import "./Profile.css";

// --- KHAI BÁO COMPONENT ICON BÊN NGOÀI (Tránh lỗi render) ---
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
  // Dữ liệu User (Thêm trường avatar)
  const [userInfo, setUserInfo] = useState({
    avatar: "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg", // Ảnh mặc định
    name: "End new bie Back",
    gender: "-",
    dob: "22/02/2004",
    phone: "0945368613",
    email: "backendnewbie2004@gmail.com",
    address: "-"
  });

  const addressList = [
    { id: 1, name: "End new bie Back", phone: "0945368613", fullAddress: "dâdad, Xã Liên Bão, Huyện Tiên Du, Bắc Ninh", isDefault: true },
    { id: 2, name: "End new bie Back", phone: "0945368613", fullAddress: "a, Xã Bằng Thành, Huyện Pác Nặm, Bắc Kạn", isDefault: false },
    { id: 3, name: "End new bie Back", phone: "0945368613", fullAddress: "âf, Thị trấn Núi Sập, Huyện Thoại Sơn, An Giang", isDefault: false },
  ];

  // Xử lý khi chọn ảnh mới (Preview ảnh)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUserInfo({ ...userInfo, avatar: imageUrl });
    }
  };

  return (
    <div className="profile-container">
      
      {/* KHỐI 1: THÔNG TIN CÁ NHÂN */}
      <div className="profile-card">
        <div className="card-header">
          <div className="card-title">Thông tin cá nhân</div>
          <button className="card-action">
            <EditIcon /> Cập nhật
          </button>
        </div>
        
        <div className="info-grid">
          {/* Cột Trái */}
          <div className="info-col">
            
            {/* --- THÊM PHẦN AVATAR VÀO ĐÂY --- */}
            <div className="avatar-row">
              <span className="info-label">Ảnh đại diện:</span>
              <div className="avatar-wrapper">
                <img src={userInfo.avatar} alt="Avatar" className="current-avatar" />
                
                {/* Input file ẩn, dùng label để kích hoạt */}
                <input 
                  type="file" 
                  id="avatar-upload" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                <label htmlFor="avatar-upload" className="upload-label">
                  Thay đổi
                </label>
              </div>
            </div>
            {/* ------------------------------- */}

            <div className="info-row">
              <span className="info-label">Họ và tên:</span>
              <span className="info-value">{userInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Giới tính:</span>
              <span className="info-value">{userInfo.gender}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ngày sinh:</span>
              <span className="info-value">{userInfo.dob}</span>
            </div>
          </div>

          {/* Cột Phải */}
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

      {/* KHỐI 2: SỔ ĐỊA CHỈ */}
      <div className="profile-card">
        <div className="card-header">
          <div className="card-title">Sổ địa chỉ</div>
          <button className="card-action">
            <PlusIcon /> Thêm địa chỉ
          </button>
        </div>

        <div className="address-grid">
          {addressList.map((addr) => (
            <div key={addr.id} className="address-item">
              <div className="address-content">
                <div className="address-header">
                   <span className="addr-name">{addr.name}</span>
                   <div className="addr-divider"></div>
                   <span className="addr-phone">{addr.phone}</span>
                </div>
                <div className="addr-text">{addr.fullAddress}</div>
              </div>
              <div className="address-actions">
                <button className="btn-addr">Xóa</button>
                <button className="btn-addr btn-update">Cập nhật</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KHỐI 3: MẬT KHẨU & LIÊN KẾT */}
      <div className="bottom-grid">
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title">Mật khẩu</div>
            <button className="card-action">
              <EditIcon /> Thay đổi mật khẩu
            </button>
          </div>
          <div className="info-row">
            <span className="info-label">Cập nhật lần cuối lúc:</span>
            <span className="info-value">12/01/2026 09:35</span>
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