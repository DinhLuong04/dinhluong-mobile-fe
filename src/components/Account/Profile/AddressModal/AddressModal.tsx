import React, { useState, useEffect } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
  initialData?: any; // 👉 Thêm prop nhận dữ liệu cũ
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSaveSuccess, initialData }) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState({ code: '', name: '' });
  const [selectedDistrict, setSelectedDistrict] = useState({ code: '', name: '' });
  const [selectedWard, setSelectedWard] = useState({ code: '', name: '' });
  
  const [streetDetail, setStreetDetail] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Tải dữ liệu khi mở Modal (Xử lý cả trường hợp Thêm mới & Cập nhật)
  useEffect(() => {
    if (isOpen) {
      // Fetch danh sách tỉnh thành
      fetch('https://provinces.open-api.vn/api/p/')
        .then(res => res.json())
        .then(async (provs) => {
          setProvinces(provs);
          
          // NẾU LÀ CẬP NHẬT: Load nối tiếp Huyện và Xã dựa trên dữ liệu cũ
          if (initialData) {
            setIsDefault(initialData.isDefault || false);
            
            const p = provs.find((x: any) => x.name === initialData.province);
            if (p) {
              setSelectedProvince({ code: p.code, name: p.name });
              
              // Load Huyện
              const resDist = await fetch(`https://provinces.open-api.vn/api/p/${p.code}?depth=2`);
              const distData = await resDist.json();
              setDistricts(distData.districts || []);
              
              const d = (distData.districts || []).find((x: any) => x.name === initialData.city);
              if (d) {
                setSelectedDistrict({ code: d.code, name: d.name });
                
                // Load Xã
                const resWard = await fetch(`https://provinces.open-api.vn/api/d/${d.code}?depth=2`);
                const wardData = await resWard.json();
                setWards(wardData.wards || []);
                
                // Trích xuất Phường/Xã từ chuỗi street (ví dụ: "Số 12, Phường ABC")
                const w = (wardData.wards || []).find((x: any) => initialData.street?.includes(x.name));
                if (w) {
                  setSelectedWard({ code: w.code, name: w.name });
                  // Tách bỏ tên Phường/Xã để lấy Số nhà/Đường
                  const streetOnly = initialData.street.replace(`, ${w.name}`, '').trim();
                  setStreetDetail(streetOnly);
                } else {
                  setStreetDetail(initialData.street || '');
                }
              }
            }
          }
        })
        .catch(err => console.error("Lỗi tải API Tỉnh/Thành:", err));
    } else {
      // Reset form khi đóng modal
      setSelectedProvince({ code: '', name: '' });
      setSelectedDistrict({ code: '', name: '' });
      setSelectedWard({ code: '', name: '' });
      setDistricts([]);
      setWards([]);
      setStreetDetail('');
      setIsDefault(false);
    }
  }, [isOpen, initialData]);

  const getToken = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).token : '';
  };

  // 2. Xử lý khi user tự tay chọn Tỉnh/Thành
  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    
    setSelectedProvince({ code, name: code ? name : '' });
    setSelectedDistrict({ code: '', name: '' });
    setSelectedWard({ code: '', name: '' });
    setWards([]);

    if (code) {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
      const data = await res.json();
      setDistricts(data.districts || []);
    } else {
      setDistricts([]);
    }
  };

  // 3. Xử lý khi user tự tay chọn Quận/Huyện
  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    
    setSelectedDistrict({ code, name: code ? name : '' });
    setSelectedWard({ code: '', name: '' });

    if (code) {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
      const data = await res.json();
      setWards(data.wards || []);
    } else {
      setWards([]);
    }
  };

  // 4. Xử lý submit (Phân biệt POST và PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvince.name || !selectedDistrict.name || !selectedWard.name || !streetDetail) {
      alert("Vui lòng điền đầy đủ địa chỉ!");
      return;
    }

    try {
      setIsLoading(true);

      const addressPayload = {
        province: selectedProvince.name,
        city: selectedDistrict.name,
        street: `${streetDetail}, ${selectedWard.name}`, 
        country: "Việt Nam",
        zipCode: "",
        isDefault: isDefault
      };

      // 👉 KIỂM TRA: Nếu có ID thì là Cập nhật (PUT), ngược lại là Thêm mới (POST)
      const isEditing = !!initialData?.id;
      const url = isEditing 
        ? `http://localhost:8080/api/addresses/${initialData.id}` 
        : `http://localhost:8080/api/addresses`;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressPayload)
      });

      const data = await res.json();
      
      if (data.code === 200) {
        alert(isEditing ? "Cập nhật địa chỉ thành công!" : "Thêm địa chỉ thành công!");
        onSaveSuccess();
        onClose(); 
      } else {
        alert(data.message || "Lỗi khi lưu địa chỉ");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', 
        justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
          background: '#fff', padding: '25px', borderRadius: '8px', 
          width: '90%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '15px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {/* 👉 Cập nhật title tùy theo trạng thái */}
          <h3 style={{ margin: 0, fontSize: '18px' }}>
            {initialData ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
          </h3>
          <button onClick={onClose} disabled={isLoading} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Tỉnh/Thành phố</label>
            <select 
              value={selectedProvince.code} 
              onChange={handleProvinceChange}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            >
              <option value="">-- Chọn Tỉnh/Thành phố --</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Quận/Huyện</label>
            <select 
              value={selectedDistrict.code} 
              onChange={handleDistrictChange}
              disabled={!selectedProvince.code}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: !selectedProvince.code ? '#f5f5f5' : 'white' }}
              required
            >
              <option value="">-- Chọn Quận/Huyện --</option>
              {districts.map(d => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Phường/Xã</label>
            <select 
              value={selectedWard.code} 
              onChange={e => {
                const name = e.target.options[e.target.selectedIndex].text;
                setSelectedWard({ code: e.target.value, name: e.target.value ? name : '' });
              }}
              disabled={!selectedDistrict.code}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: !selectedDistrict.code ? '#f5f5f5' : 'white' }}
              required
            >
              <option value="">-- Chọn Phường/Xã --</option>
              {wards.map(w => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Địa chỉ cụ thể (Số nhà, Đường)</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Số 12, Ngõ 34, Đường ABC"
              value={streetDetail} 
              onChange={e => setStreetDetail(e.target.value)}
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
            <input 
              type="checkbox" 
              id="isDefaultAdd" 
              checked={isDefault} 
              onChange={e => setIsDefault(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="isDefaultAdd" style={{ fontSize: '14px', cursor: 'pointer' }}>
              Đặt làm địa chỉ mặc định
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} disabled={isLoading} style={{ padding: '10px 15px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Hủy</button>
            <button type="submit" disabled={isLoading} style={{ padding: '10px 15px', border: 'none', background: isLoading ? '#ccc' : '#cb1c22', color: '#fff', borderRadius: '4px', cursor: isLoading ? 'wait' : 'pointer', fontWeight: 'bold' }}>
              {/* 👉 Đổi text Button theo trạng thái */}
              {isLoading ? 'Đang lưu...' : (initialData ? 'Cập nhật' : 'Lưu địa chỉ')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};