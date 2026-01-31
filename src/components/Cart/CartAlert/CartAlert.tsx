import React from "react";
import "./CartAlert.css"; // Import file CSS

interface CartAlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  type?: "alert" | "confirm";
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

  // Xử lý click ra ngoài overlay để đóng popup
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="alert-overlay" onClick={handleOverlayClick}>
      {/* Popup Container */}
      <div className="alert-popup">
        
        {/* Header: Nút đóng */}
        <div className="alert-header">
          <button 
            onClick={onClose} 
            className="btn-close"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="alert-content">
          <p className="alert-title">{title}</p>
          <p className="alert-message">{message}</p>
        </div>

        {/* Footer: Action Buttons */}
        <div className="alert-footer">
            {/* Nút Hủy (Chỉ hiện khi type là confirm) */}
            {type === "confirm" && (
                <button 
                    onClick={onClose}
                    className="btn-cancel"
                    type="button"
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
                className={`btn-confirm-alert ${type === 'alert' ? 'w-full' : 'w-half'}`}
                type="button"
            >
                Đồng ý
            </button>
        </div>
      </div>
    </div>
  );
};