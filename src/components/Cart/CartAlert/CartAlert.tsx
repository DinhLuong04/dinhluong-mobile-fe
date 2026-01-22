import React from "react";

interface CartAlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  type?: "alert" | "confirm"; // 'alert': chỉ có nút đóng, 'confirm': có đồng ý/hủy
}

export const CartAlert: React.FC<CartAlertProps> = ({
  isOpen,
  title = "Thông báo",
  message,
  onClose,
  onConfirm,
  type = "confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay: Lớp phủ mờ đen */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Popup Container */}
      <div className="relative z-10 w-[90%] max-w-[400px] animate-fade-in rounded-xl bg-white shadow-xl overflow-hidden">
        
        {/* Header: Nút đóng */}
        <div className="flex justify-end p-3">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center px-8 pb-4 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">{title}</p>
          <p className="text-sm text-gray-600 mb-6">{message}</p>
        </div>

        {/* Footer: Action Buttons */}
        <div className="p-4 pt-0 flex gap-3">
            {/* Nút Hủy (Chỉ hiện khi type là confirm) */}
            {type === "confirm" && (
                <button 
                    onClick={onClose}
                    className="w-1/2 rounded border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Hủy bỏ
                </button>
            )}
            
            {/* Nút Xác nhận */}
            <button 
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                className={`rounded bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors ${type === 'alert' ? 'w-full' : 'w-1/2'}`}
            >
                Đồng ý
            </button>
        </div>
      </div>
    </div>
  );
};