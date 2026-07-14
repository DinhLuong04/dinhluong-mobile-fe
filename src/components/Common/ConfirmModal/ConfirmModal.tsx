import React from "react";
import "./ConfirmModal.css"; 

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  

  type?: "alert" | "confirm"; 
  confirmText?: string;      
  cancelText?: string;      
  onCancel?: () => void;      
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Thông báo",
  message,
  onClose,
  onConfirm,
  type = "confirm",
  confirmText = "Đồng ý",  
  cancelText = "Hủy bỏ",    
  onCancel,
}) => {
  if (!isOpen) return null;

 
  const handleCancel = () => {
    if (onCancel) {
        onCancel(); 
    } else {
        onClose();  
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
                    {cancelText}
                </button>
            )}
            
            <button 
                onClick={() => onConfirm()} 
                className={`btn-confirm-alert ${type === 'alert' ? 'w-full' : 'w-half'}`}
            >
                {confirmText}
            </button>
        </div>
      </div>
    </div>
  );
};