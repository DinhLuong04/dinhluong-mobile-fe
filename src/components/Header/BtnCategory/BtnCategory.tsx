import React, { useState } from "react";
import "./BtnCategory.css";
import Category from "../../Category/Category";

const BtnCategory: React.FC = () => {
    // Nên để mặc định là false để menu đóng khi mới vào web
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Hàm xử lý hover: Chuột vào thì mở, chuột ra thì đóng
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div 
            className="inner-btn-category" 
            // Thêm 2 sự kiện này vào wrapper cha
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="btn-category"
                onClick={toggleMenu} // Giữ click cho mobile hoặc tablet
            >
                <span style={{ fontSize: "20px" }}>☰</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000, paddingTop: "10px"}}>
                    <Category />
                </div>
            )}
        </div>
    );
};

export default BtnCategory;