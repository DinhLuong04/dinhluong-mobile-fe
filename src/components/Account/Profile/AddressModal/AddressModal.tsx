import React from 'react';
import { useAddressModal } from './useAddressModal';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
    initialData?: any;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSaveSuccess, initialData }) => {
    const {
        provinces, districts, wards,
        selectedProvince, selectedDistrict, selectedWard,
        streetDetail, setStreetDetail,
        isDefault, setIsDefault,
        isLoading,
        handleProvinceChange, handleDistrictChange, setSelectedWard,
        handleSubmit
    } = useAddressModal({ isOpen, onClose, onSaveSuccess, initialData });

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
                            {isLoading ? 'Đang lưu...' : (initialData ? 'Cập nhật' : 'Lưu địa chỉ')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddressModal;