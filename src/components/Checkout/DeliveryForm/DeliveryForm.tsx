import "../CheckoutForms/CheckoutForms.css"; 
import { AddressModal } from '../../../components/Account/Profile/AddressModal/AddressModal'; 
import { useDeliveryForm } from './useDeliveryForm';

export const DeliveryForm = ({ formData, onChange }: any) => {
    const {
        addresses,
        isAddressModalOpen, setIsAddressModalOpen,
        isLoading,
        fetchAddresses,
        getFullAddressString
    } = useDeliveryForm(formData, onChange);

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
                onSaveSuccess={fetchAddresses} 
            />
        </div>
    );
};