import "./CheckoutForms.css";
import { type CheckoutFormData } from '../../../types/order.types'
interface OrdererFormProps {
    formData: CheckoutFormData;
    onChange: (field: keyof CheckoutFormData, value: string) => void;
}
export const OrdererForm: React.FC<OrdererFormProps> = ({ formData, onChange }) => {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const isPhoneNotEmpty = formData.receiverPhone && formData.receiverPhone.length > 0;
  const isPhoneInvalid = isPhoneNotEmpty && !phoneRegex.test(formData.receiverPhone);
  return (
    <div className="checkout-section">
      <span className="section-title">Người đặt hàng</span>
      <div className="form-group">
        <div className="input-wrapper">
          <input className="form-input" placeholder="Họ và tên" type="text" 
                 value={formData.receiverName} onChange={(e) => onChange('receiverName', e.target.value)} />
        </div>
        <div className="input-wrapper" style={{ marginBottom: '15px' }}>
          <input 
            className="form-input" 
            placeholder="Số điện thoại nhận hàng" 
            maxLength={10} 
            type="text" 
            value={formData.receiverPhone || ''} 
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, '');
              onChange('receiverPhone', onlyNums);
            }} 
            style={{ 
              borderColor: formData.receiverPhone && !/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.receiverPhone) 
                ? '#cb1c22' 
                : '#ccc' 
            }}
          />
          
          {isPhoneInvalid && (
            <span style={{ color: '#cb1c22', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              Vui lòng nhập số điện thoại hợp lệ (Bắt đầu bằng 03, 05, 07, 08, 09 và đủ 10 số).
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input className="form-input" placeholder="Email (Không bắt buộc)" type="email" 
                 value={formData.receiverEmail} onChange={(e) => onChange('receiverEmail', e.target.value)} />
        </div>
      </div>
    </div>
  );
};



