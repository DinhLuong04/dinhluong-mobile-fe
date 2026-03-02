import React, { useState, useEffect } from "react";
import "./BtnCategory.css";
import Category from "../../Category/Category";

const BtnCategory: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

    // Bắt sự kiện thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Khóa cuộn trang (body) khi mở menu full màn hình trên mobile
    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isMobile, isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    // Hover chỉ hoạt động nếu KHÔNG phải mobile
    const handleMouseEnter = () => {
        if (!isMobile) setIsOpen(true);
    };
    
    const handleMouseLeave = () => {
        if (!isMobile) setIsOpen(false);
    };

    return (
        <div 
            className="inner-btn-category" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="btn-category"
                onClick={toggleMenu} // Click cho cả PC và Mobile
            >
                <span className="btn-category-icon">☰</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`dropdown-wrapper ${isMobile ? "mobile-fullscreen" : ""}`}>
                    <Category onClose={closeMenu} />
                </div>
            )}
        </div>
    );
};

export default BtnCategory;