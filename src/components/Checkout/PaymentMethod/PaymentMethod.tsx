import React from "react";
import "./PaymentMethod.css";

export interface PaymentMethodItem {
    id: string;
    label: string;
    img: string;
}

const PAYMENT_METHODS: PaymentMethodItem[] = [
  {
    id: "cod",
    label: "Thanh toán khi nhận hàng",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/cod.png",
  },
  {
    id: "vnpay",
    label: "Thẻ ATM nội địa (qua VNPAY)",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/vnpay.png",
  },
];

interface PaymentMethodProps {
    selectedMethod: string;
    onChange: (methodId: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ selectedMethod, onChange }) => {
  return (
    <section className="payment-section" aria-label="Phương thức thanh toán">
      <h3 className="payment-title">Phương thức thanh toán</h3>

      <div className="payment-list">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
           
            <label 
              key={method.id}
              className={`payment-option ${isSelected ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="payment_method"
                checked={isSelected}
                onChange={() => onChange(method.id)}
                className="payment-radio"
              />

              <img
                src={method.img}
                alt={method.label}
                className="payment-icon"
                loading="lazy"
              />

              <div className="payment-info">
                <span className="payment-label">{method.label}</span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethod;