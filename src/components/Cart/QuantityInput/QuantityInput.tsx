import React, { useState, useEffect } from "react";
import "./quantityInput.css";

interface Props {
  value: number;
  max: number;
  onChange: (val: number) => void;
}

export const QuantityInput: React.FC<Props> = ({ value, max, onChange }) => {
  // Dùng state nội bộ để giữ giá trị text khi user đang gõ
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // Đồng bộ lại UI nếu value từ component cha (server) thay đổi
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  // Xử lý khi user đang gõ phím
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Dùng Regex chặn chữ cái, chỉ cho phép gõ số (hoặc để chuỗi rỗng khi xóa hết)
    if (/^\d*$/.test(val)) {
      setInputValue(val);
    }
  };

  // Xử lý chốt số khi user click ra ngoài ô input (Blur)
  const handleBlur = () => {
    let finalValue = parseInt(inputValue, 10);

    // Xử lý các case ngoại lệ (nhập linh tinh, nhỏ hơn 1, lớn hơn kho)
    if (isNaN(finalValue) || finalValue < 1) {
      finalValue = 1;
    } else if (finalValue > max) {
      finalValue = max;
    }

    setInputValue(finalValue.toString());

    // Chỉ gọi API cập nhật nếu số lượng thực sự thay đổi
    if (finalValue !== value) {
      onChange(finalValue);
    }
  };

  // Xử lý cho nút bấm (+/-)
  const handleButtonClick = (newVal: number) => {
    setInputValue(newVal.toString());
    onChange(newVal);
  };

  return (
    <div className="quantity-input-wrapper">
      <button
        onClick={() => value > 1 && handleButtonClick(value - 1)}
        className="qty-btn"
        disabled={value <= 1}
        type="button"
      >
        -
      </button>
      
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur} // 🔥 Bắt sự kiện click ra ngoài để chốt số
        className="qty-input"
        style={{ textAlign: 'center' }}
      />
      
      <button
        onClick={() => value < max && handleButtonClick(value + 1)}
        className="qty-btn"
        disabled={value >= max || max === 0}
        type="button"
      >
        +
      </button>
    </div>
  );
};