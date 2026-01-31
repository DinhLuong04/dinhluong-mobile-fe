import React from 'react';
import "./Checkout.css";


import { OrderItem } from "../../components/Checkout/OrderItem/OrderItem";


import { OrdererForm, DeliveryForm, InvoiceToggle } from "../../components/Checkout/CheckoutForms/CheckoutForms";

import { PaymentMethod } from "../../components/Checkout/PaymentMethod/PaymentMethod";


import { CheckoutSummary } from "../../components/Checkout/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
    return (
        <div className="container">
            <div className="check-out-main">
                
                {/* --- CỘT TRÁI --- */}
                <div className="checkout-left">
                    {/* Danh sách sản phẩm */}
                    <OrderItem />
                    
                    {/* Thông tin người mua */}
                    <OrdererForm />
                    
                    {/* Hình thức nhận hàng */}
                    <DeliveryForm />
                    
                    {/* Xuất hóa đơn */}
                    <InvoiceToggle />
                    
                    {/* Phương thức thanh toán */}
                    <PaymentMethod />
                </div>

                {/* --- CỘT PHẢI --- */}
                <div className="checkout-right">
                    <CheckoutSummary />
                </div>

            </div>
        </div>
    );
};

export default Checkout;