import React from "react";
import "./PaymentMethod.css";

const PAYMENT_METHODS = [
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

export const PaymentMethod = ({ selectedMethod, onChange }: any) => {
  return (
    <div className="payment-section">
      <span className="payment-title">Phương thức thanh toán</span>

      <div className="payment-list">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            className="payment-option"
            type="button"
            onClick={() => onChange(method.id)}
          >
            <input
              type="radio"
              name="payment_method"
              checked={selectedMethod === method.id}
              onChange={() => onChange(method.id)}
              className="payment-radio"
            />

            <img
              src={method.img}
              alt={method.label}
              className="payment-icon"
            />

            <div className="payment-info">
              <span className="payment-label">{method.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};