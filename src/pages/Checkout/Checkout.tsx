import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Checkout.css";
import { OrderItem } from "../../components/Checkout/OrderItem/OrderItem";

import { PaymentMethod } from "../../components/Checkout/PaymentMethod/PaymentMethod";
import { CheckoutSummary } from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import { DeliveryForm } from '../../components/Checkout/DeliveryForm/DeliveryForm';
import { OrdererForm } from '../../components/Checkout/CheckoutForms/CheckoutForms';
const Checkout = () => {
    const navigate = useNavigate();

    const [checkoutItems, setCheckoutItems] = useState<any[]>(() => {
        const payloadStr = localStorage.getItem('CHECKOUT_PAYLOAD');
        return payloadStr ? JSON.parse(payloadStr).uiData.items : [];
    });

    const [orderSummary, setOrderSummary] = useState(() => {
        const payloadStr = localStorage.getItem('CHECKOUT_PAYLOAD');
        return payloadStr 
            ? { ...JSON.parse(payloadStr).uiData.summary, appliedVoucher: null } 
            : { totalPrice: 0, totalDiscount: 0, finalPrice: 0, appliedVoucher: null };
    });

    const [idsForBackend, setIdsForBackend] = useState<any[]>(() => {
        const payloadStr = localStorage.getItem('CHECKOUT_PAYLOAD');
        return payloadStr ? JSON.parse(payloadStr).idsForBackend : [];
    });

    const [formData, setFormData] = useState(() => {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : {};
        
        return {
            receiverName: user.name || '',
            receiverPhone: user.phone || '',
            receiverEmail: user.email || '',
            deliveryType: 'shipping',
            receiverAddress: '',
            note: '',
            paymentMethod: 'cod' // Mặc định là thanh toán khi nhận hàng
        };
    });

    useEffect(() => {
        const payloadStr = localStorage.getItem('CHECKOUT_PAYLOAD');
        if (!payloadStr) {
            navigate('/cart');
        }
    }, [navigate]);

    const handleFormChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleVoucherApply = (voucher: any) => {
        setOrderSummary((prev: any) => ({
            ...prev,
            appliedVoucher: voucher 
        }));
    };

    const handlePlaceOrder = async () => {
        if (!formData.receiverName || !formData.receiverPhone || !formData.receiverAddress) {
            alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!");
            return;
        }

        const userStr = localStorage.getItem('user');
        if (!userStr) { alert("Vui lòng đăng nhập!"); return; }
        const user = JSON.parse(userStr);

        try {
            const requestBody = {
                userId: user.id,
                receiverName: formData.receiverName,
                receiverPhone: formData.receiverPhone,
                receiverAddress: formData.receiverAddress,
                note: formData.note,
                paymentMethod: formData.paymentMethod,
                items: idsForBackend,
                voucherCode: orderSummary.appliedVoucher ? orderSummary.appliedVoucher.code : null
            };

            const token = user.token;
            
            const res = await fetch('http://localhost:8080/api/orders/place', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.removeItem('CHECKOUT_PAYLOAD');
                
                if (data.paymentUrl) {
                    // VNPay -> Chuyển hướng tới cổng thanh toán
                    window.location.href = data.paymentUrl;
                } else {
                    // COD -> Chuyển sang trang kết quả với type=cod
                    navigate('/payment/result?type=cod&status=success'); 
                }
            } else {
                alert(`Lỗi: ${data.message || 'Có lỗi xảy ra khi tạo đơn'}`);
            }

        } catch (error) {
            console.error("Lỗi đặt hàng", error);
            alert("Không thể kết nối tới server. Vui lòng thử lại sau!");
        }
    };

    return (
        <div className="container">
            <div className="check-out-main">
                <div className="checkout-left">
                    <OrderItem items={checkoutItems} />
                    <OrdererForm formData={formData} onChange={handleFormChange} />
                    <DeliveryForm formData={formData} onChange={handleFormChange} />
                    <PaymentMethod 
                        selectedMethod={formData.paymentMethod} 
                        onChange={(val: string) => handleFormChange('paymentMethod', val)} 
                    />
                </div>

                <div className="checkout-right">
                    <CheckoutSummary 
                        summary={orderSummary} 
                        onVoucherApply={handleVoucherApply} 
                        onPlaceOrder={handlePlaceOrder} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;