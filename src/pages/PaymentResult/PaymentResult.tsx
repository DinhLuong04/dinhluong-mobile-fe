import React from 'react';
import { usePaymentResult } from './usePaymentResult';

export const PaymentResult: React.FC = () => {
    const {
        status, message, orderRef, displayAmount, responseCode, navigate
    } = usePaymentResult();

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', padding: '30px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
            {status === 'processing' && <h2>{message}</h2>}

            {status === 'success' && (
                <>
                    <div style={{ color: '#4CAF50', fontSize: '60px', marginBottom: '20px' }}>✓</div>
                    <h2 style={{ color: '#4CAF50' }}>{message}</h2>
                    <p>Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đang được chuẩn bị.</p>
                    
                    {orderRef && <p><strong>Mã đơn hàng:</strong> #{orderRef}</p>}
                    {displayAmount && <p><strong>Số tiền đã thanh toán:</strong> {displayAmount}đ</p>}
                    
                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button 
                            onClick={() => navigate('/member/order')}
                            style={{ padding: '10px 20px', background: '#cb1c22', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Xem lịch sử đơn hàng
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            style={{ padding: '10px 20px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Về trang chủ
                        </button>
                    </div>
                </>
            )}

            {status === 'failed' && (
                <>
                    <div style={{ color: '#f44336', fontSize: '60px', marginBottom: '20px' }}>✕</div>
                    <h2 style={{ color: '#f44336' }}>{message}</h2>
                    <p>Đơn hàng chưa được thanh toán hoặc có lỗi xảy ra. Vui lòng thử lại.</p>
                    
                    {responseCode && <p>Mã lỗi hệ thống: <strong>{responseCode}</strong></p>}

                    <div style={{ marginTop: '30px' }}>
                        <button 
                            onClick={() => navigate('/cart')}
                            style={{ padding: '10px 20px', background: '#cb1c22', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Quay lại Giỏ hàng
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentResult;