import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const PaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. Lấy param từ URL
    const type = searchParams.get('type');
    const codStatus = searchParams.get('status');
    const responseCode = searchParams.get('vnp_ResponseCode');
    const orderRef = searchParams.get('vnp_TxnRef');
    const amount = searchParams.get('vnp_Amount');

    // 2. KHỞI TẠO STATE TRỰC TIẾP (Fix lỗi Calling setState synchronously)
    // Tính toán trạng thái ban đầu dựa vào URL ngay lúc render chứ không dùng useEffect
    const getInitialStatus = (): 'processing' | 'success' | 'failed' => {
        if (type === 'cod') {
            return codStatus === 'success' ? 'success' : 'failed';
        }
        if (responseCode) {
            return 'processing'; // Nếu là VNPay thì để processing để chờ gọi API
        }
        return 'failed';
    };

    const getInitialMessage = () => {
        if (type === 'cod') {
            return codStatus === 'success' ? 'Đặt hàng thành công!' : 'Đặt hàng thất bại.';
        }
        if (responseCode) {
            return 'Đang xử lý kết quả giao dịch...';
        }
        return 'Đường dẫn không hợp lệ';
    };

    const [status, setStatus] = useState<'processing' | 'success' | 'failed'>(getInitialStatus);
    const [message, setMessage] = useState<string>(getInitialMessage);

    useEffect(() => {
        let isMounted = true;

        // 3. CHỈ DÙNG useEffect CHO VIỆC GỌI API BẤT ĐỒNG BỘ (VNPay)
        if (type !== 'cod' && responseCode) {
            const verifyPayment = async () => {
                try {
                    // Lấy token từ localStorage (Giống hệt bên Checkout.tsx)
                    const userStr = localStorage.getItem('user');
                    let token = '';
                    if (userStr) {
                        const user = JSON.parse(userStr);
                        token = user.token || '';
                    }

                    const queryString = window.location.search;
                    const res = await fetch(`http://localhost:8080/api/orders/vnpay-return${queryString}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // THÊM BEARER TOKEN Ở ĐÂY
                        }
                    });

                    const data = await res.json();

                    if (!isMounted) return;

                    if (res.ok && data.status === 'success') {
                        setStatus('success');
                        setMessage('Thanh toán thành công!');
                    } else {
                        setStatus('failed');
                        setMessage(data.message || 'Giao dịch thất bại hoặc đã bị hủy!');
                    }
                } catch (error) {
                    if (!isMounted) return;
                    console.error("Lỗi xác thực thanh toán", error);
                    setStatus('failed');
                    setMessage('Lỗi kết nối máy chủ khi xác thực thanh toán');
                }
            };

            verifyPayment();
        }

        return () => {
            isMounted = false;
        };
    }, [type, responseCode]); // Dependency sạch sẽ, không còn warning

    const displayAmount = amount ? (parseInt(amount) / 100).toLocaleString('vi-VN') : null;

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
                            onClick={() => navigate('/Cart')}
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