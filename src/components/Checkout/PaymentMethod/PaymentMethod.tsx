import React, { useState } from "react";
import "./PaymentMethod.css";

// Định nghĩa kiểu dữ liệu cho phương thức thanh toán
interface PaymentOption {
  id: string;
  label: string;
  img: string;
  badge?: string; // Ví dụ: "2 ưu đãi"
  isChild?: boolean; // Nếu là mục con (như SCB, MBBank)
  disabled?: boolean;
}

// Dữ liệu từ HTML gốc
const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "cod",
    label: "Thanh toán khi nhận hàng",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/cod.png"
  },
  {
    id: "TransferOnline",
    label: "Chuyển khoản ngân hàng (QR Code)",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/QR.png"
  },
  {
    id: "VNPay",
    label: "Thẻ ATM nội địa (qua VNPAY)",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/vnpay.png"
  },
  {
    id: "AlePay",
    label: "Thẻ Quốc tế Visa, Master, JCB, AMEX, Apple Pay, Google pay, Samsung Pay",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/alepay.png",
    badge: "2 ưu đãi"
  },
  // Các mục con của AlePay
  {
    id: "28",
    label: "Ngân hàng TMCP Sài Gòn (SCB)",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/installment/LogoBank/SCB.png",
    badge: "1 ưu đãi",
    isChild: true
  },
  {
    id: "30",
    label: "Ngân hàng thương mại cổ phần Quân đội",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/installment/LogoBank/MBBank.png",
    badge: "1 ưu đãi",
    isChild: true
  },
  {
    id: "other_bank",
    label: "Các ngân hàng khác",
    img: "https://s3-sgn10.fptcloud.com/ict-payment-icon-nonprod/payment/alepay.png",
    isChild: true
  },
  // Các mục khác
  {
    id: "ZaloPay",
    label: "Ví ZaloPay",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/zalopay.png"
  },
  {
    id: "MoMo",
    label: "Ví điện tử MoMo",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/momo.png"
  },
  {
    id: "Kredivo",
    label: "Trả góp/ trả thẳng qua Kredivo",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/kre.png",
    badge: "2 ưu đãi"
  },
  {
    id: "HomePayLater",
    label: "Home PayLater",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/installment/LogoFinance/homepaylater.png",
    badge: "3 ưu đãi"
  },
  {
    id: "InstCard",
    label: "Trả góp qua thẻ tín dụng",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/Thetindung.png",
    badge: "2 ưu đãi"
  },
  {
    id: "Finance",
    label: "Trả góp qua công ty tài chính",
    img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/NTC.png",
    disabled: true
  }
];

export const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");

  return (
    <div className="payment-section">
      <span className="payment-title">Phương thức thanh toán</span>
      
      <div className="payment-list">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method.id}
            className={`payment-option ${method.isChild ? 'is-child' : ''}`}
            onClick={() => !method.disabled && setSelectedMethod(method.id)}
            disabled={method.disabled}
            type="button"
          >
            {/* Radio Input */}
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="payment-radio"
              disabled={method.disabled}
            />

            {/* Icon */}
            <img src={method.img} alt={method.label} className="payment-icon" />

            {/* Label & Badge */}
            <div className="payment-info">
              <span className="payment-label">{method.label}</span>
              {method.badge && (
                <span className="payment-badge">{method.badge}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};