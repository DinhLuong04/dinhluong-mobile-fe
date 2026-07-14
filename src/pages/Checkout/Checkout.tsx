import React from 'react';
import "./Checkout.css";
import { OrderItem } from "../../components/Checkout/OrderItem/OrderItem";
import { PaymentMethod } from "../../components/Checkout/PaymentMethod/PaymentMethod";
import { CheckoutSummary } from "../../components/Checkout/CheckoutSummary/CheckoutSummary";
import { DeliveryForm } from '../../components/Checkout/DeliveryForm/DeliveryForm';
import { OrdererForm } from '../../components/Checkout/CheckoutForms/CheckoutForms';
import { useCheckout } from './useCheckout';

const Checkout: React.FC = () => {

    const { 
        checkoutItems, orderSummary, formData, 
        handleFormChange, handleVoucherApply, handlePlaceOrder 
    } = useCheckout();

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