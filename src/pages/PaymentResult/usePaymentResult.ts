import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { orderService } from '../../service/orderService';

export const usePaymentResult = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const type = searchParams.get('type');
    const codStatus = searchParams.get('status');
    const responseCode = searchParams.get('vnp_ResponseCode');
    const orderRef = searchParams.get('vnp_TxnRef');
    const amount = searchParams.get('vnp_Amount');

    const getInitialStatus = (): 'processing' | 'success' | 'failed' => {
        if (type === 'cod') {
            return codStatus === 'success' ? 'success' : 'failed';
        }
        if (responseCode) {
            return 'processing'; 
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

        if (type !== 'cod' && responseCode) {
            const verifyPayment = async () => {
                try {
                    const queryString = window.location.search;
                    await orderService.verifyVnpay(queryString);

                    if (!isMounted) return;
                    setStatus('success');
                    setMessage('Thanh toán thành công!');

                } catch (error: any) {
                    if (!isMounted) return;
                    console.error("Lỗi xác thực thanh toán", error);
                    setStatus('failed');
                    setMessage(error?.message || 'Giao dịch thất bại hoặc đã bị hủy!');
                }
            };

            verifyPayment();
        }

        return () => {
            isMounted = false;
        };
    }, [type, responseCode]);

    const displayAmount = amount ? (parseInt(amount) / 100).toLocaleString('vi-VN') : null;

    return {
        status, message, orderRef, displayAmount, responseCode, navigate
    };
};