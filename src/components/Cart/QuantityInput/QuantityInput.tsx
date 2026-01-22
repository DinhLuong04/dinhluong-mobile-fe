import React from "react";

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export const QuantityInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center rounded border border-gray-300">
      <button
        onClick={() => value > 1 && onChange(value - 1)}
        className="px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        disabled={value <= 1}
      >
        -
      </button>
      <input
        type="text"
        value={value}
        readOnly
        className="w-8 text-center text-sm font-medium outline-none"
      />
      <button
        onClick={() => onChange(value + 1)}
        className="px-2 py-1 text-gray-500 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};