import React from "react";
import "./QuantityInput..css"; // Import file CSS

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export const QuantityInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="quantity-input-wrapper">
      <button
        onClick={() => value > 1 && onChange(value - 1)}
        className="qty-btn"
        disabled={value <= 1}
        type="button" // Thêm type button để tránh submit form ngoài ý muốn
      >
        -
      </button>
      
      <input
        type="text"
        value={value}
        readOnly
        className="qty-input"
      />
      
      <button
        onClick={() => onChange(value + 1)}
        className="qty-btn"
        type="button"
      >
        +
      </button>
    </div>
  );
};