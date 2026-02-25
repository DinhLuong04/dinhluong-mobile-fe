import React, { useState, useEffect } from 'react';
import "../CheckoutForms/CheckoutForms.css"; // Dùng chung CSS với CheckoutForms
import { AddressModal } from '../../../components/Account/Profile/AddressModal/AddressModal'; 

export const DeliveryForm = ({ formData, onChange }: any) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr).token : '';
  };

  // 1. Fetch danh sách địa chỉ khi load form
  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:8080/api/addresses', {
        headers: { 
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      
      if (data.code === 200) {
        setAddresses(data.data || []);
        
        // Nếu chưa chọn địa chỉ nào, tự động lấy địa chỉ mặc định gán vào formData
        if (!formData.receiverAddress && data.data.length > 0) {
          const defaultAddr = data.data.find((a: any) => a.isDefault) || data.data[0];
          const fullAddrString = [defaultAddr.street, defaultAddr.city, defaultAddr.province, defaultAddr.country]
                                  .filter(Boolean).join(", ");
          onChange('receiverAddress', fullAddrString);
        }
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách địa chỉ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 2. Format chuỗi địa chỉ để hiển thị và gán vào value
  const getFullAddressString = (addr: any) => {
    return [addr.street, addr.city, addr.province, addr.country].filter(Boolean).join(", ");
  };

  return (
    <div className="checkout-section">
      <p className="section-title">Hình thức nhận hàng</p>
      
      <div className="radio-group">
        <label className="radio-item">
          <input type="radio" className="radio-input" checked={formData.deliveryType === "shipping"} 
                 onChange={() => onChange('deliveryType', 'shipping')} />
          <span className="radio-label">Giao hàng tận nơi</span>
        </label>
      </div>

      {/* KHU VỰC CHỌN ĐỊA CHỈ */}
      <div className="address-selection-container" style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Địa chỉ giao hàng</span>
          <button 
            type="button" 
            onClick={() => setIsAddressModalOpen(true)}
            style={{ color: '#cb1c22', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
          >
            + Thêm địa chỉ mới
          </button>
        </div>

        {isLoading ? (
          <p style={{ fontSize: '13px', color: '#666' }}>Đang tải địa chỉ...</p>
        ) : addresses.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#cb1c22', fontStyle: 'italic' }}>Bạn chưa có địa chỉ giao hàng nào. Vui lòng thêm địa chỉ!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {addresses.map((addr) => {
              const addrStr = getFullAddressString(addr);
              const isSelected = formData.receiverAddress === addrStr;

              return (
                <label key={addr.id} style={{ 
                  display: 'flex', alignItems: 'flex-start', gap: '10px', 
                  padding: '10px', borderRadius: '4px', cursor: 'pointer',
                  border: isSelected ? '1px solid #cb1c22' : '1px solid #ddd',
                  backgroundColor: isSelected ? '#fff0f0' : '#fff'
                }}>
                  <input 
                    type="radio" 
                    name="checkoutAddress" 
                    checked={isSelected}
                    onChange={() => onChange('receiverAddress', addrStr)}
                    style={{ marginTop: '4px' }}
                  />
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    {addrStr}
                    {addr.isDefault && (
                      <span style={{ marginLeft: '8px', fontSize: '11px', color: '#cb1c22', border: '1px solid #cb1c22', padding: '1px 4px', borderRadius: '3px' }}>
                        Mặc định
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="input-wrapper" style={{marginTop: '15px'}}>
        <textarea className="form-textarea" maxLength={128} placeholder="Ghi chú đơn hàng (Tùy chọn)..." rows={3}
                  value={formData.note} onChange={(e) => onChange('note', e.target.value)}></textarea>
      </div>

      {/* Tích hợp Modal thêm địa chỉ */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSaveSuccess={fetchAddresses} // Gọi lại hàm fetch để cập nhật danh sách sau khi thêm thành công
      />
    </div>
  );
};