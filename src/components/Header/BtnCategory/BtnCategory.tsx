import React, { useState } from "react";
import "./BtnCategory.css"; // File css này bạn có thể giữ nguyên từ cũ hoặc tạo mới đơn giản
import Category from "../../Category/Category";

const BtnCategory: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="inner-btn-category" >
            <button
                className="btn-category"
                onClick={toggleMenu}
               
            >
                <span style={{ fontSize: "20px" }}>☰</span>
               
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0 }}>
                    <Category />
                </div>
            )}
        </div>
    );
};

export default BtnCategory;