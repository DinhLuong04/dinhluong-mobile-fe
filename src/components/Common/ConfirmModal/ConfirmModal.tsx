import React from "react";
import "./ConfirmModal.css"; // Nhớ đổi tên file CSS luôn nhé

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  
  // --- CÁC PROP MỚI ĐỂ TÙY BIẾN ---
  type?: "alert" | "confirm"; // alert: 1 nút, confirm: 2 nút
  confirmText?: string;       // Chữ trên nút chính (VD: Đăng nhập)
  cancelText?: string;        // Chữ trên nút phụ (VD: Đăng ký / Hủy)
  onCancel?: () => void;      // Hàm chạy khi bấm nút phụ (nếu muốn khác default close)
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Thông báo",
  message,
  onClose,
  onConfirm,
  type = "confirm",
  confirmText = "Đồng ý",   // Mặc định
  cancelText = "Hủy bỏ",    // Mặc định
  onCancel,
}) => {
  if (!isOpen) return null;

  // Xử lý click nút phụ (Cancel/Register)
  const handleCancel = () => {
    if (onCancel) {
        onCancel(); // Nếu có hàm riêng thì chạy
    } else {
        onClose();  // Mặc định là đóng modal
    }
  };

  return (
    <div className="alert-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="alert-popup">
        
        {/* Header */}
        <div className="alert-header">
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        {/* Content */}
        <div className="alert-content">
          <p className="alert-title">{title}</p>
          <p className="alert-message">{message}</p>
        </div>

        {/* Footer Buttons */}
        <div className="alert-footer">
            {type === "confirm" && (
                <button 
                    onClick={handleCancel}
                    className="btn-cancel"
                >
                    {cancelText} {/* Hiển thị text động */}
                </button>
            )}
            
            <button 
                onClick={() => {
                    onConfirm();
                    onClose(); // Thường confirm xong sẽ đóng luôn
                }}
                className={`btn-confirm-alert ${type === 'alert' ? 'w-full' : 'w-half'}`}
            >
                {confirmText} {/* Hiển thị text động */}
            </button>
        </div>
      </div>
    </div>
  );
};