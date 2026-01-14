// ProductSection.tsx
import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import AdvanceFilter from "../../Fillter/Fillter"; 
import "./ProductSection.css";

const ProductSection = () => {
    // State quản lý đóng mở Filter
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="product-section">
            <div className="container">
                <div className="inner-container">
                    {/* Component Popup Filter (Nằm ẩn, hiện khi isFilterOpen = true) */}
                    <AdvanceFilter 
                        isOpen={isFilterOpen} 
                        onClose={() => setIsFilterOpen(false)} 
                    />
                    
                    {/* TRUYỀN HÀM MỞ FILTER XUỐNG PRODUCT LIST */}
                    <ProductList onOpenFilter={() => setIsFilterOpen(true)} />
                </div>
            </div>
            
            {/* Overlay nền đen */}
            {isFilterOpen && (
                <div 
                    className="filter-overlay active" 
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default ProductSection;