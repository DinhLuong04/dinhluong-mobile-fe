// src/components/ProductSection/ProductSection.tsx
import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import AdvanceFilter from "../../Fillter/Fillter"; 
import "./ProductSection.css";

// 1. Import Type để định nghĩa State (Đảm bảo đường dẫn đúng tới file types của bạn)
import type { ProductFilterParams } from "../../../types/Product.types";

const ProductSection = () => {
    // State quản lý đóng mở Filter
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // 2. State quản lý dữ liệu bộ lọc (Lifting State Up)
    // Mặc định là object rỗng {} nghĩa là chưa lọc gì cả
    const [currentFilters, setCurrentFilters] = useState<ProductFilterParams>({});

    // 3. Hàm xử lý khi người dùng bấm "Áp dụng" trong AdvanceFilter
    const handleApplyFilter = (newFilters: ProductFilterParams) => {
        console.log("Dữ liệu lọc nhận được từ Popup:", newFilters);
        
        // Cập nhật state -> ProductList sẽ tự động re-render và gọi API mới
        setCurrentFilters(newFilters);
        
        // Đóng popup
        setIsFilterOpen(false);
    };

    return (
        <div className="product-section">
            <div className="container">
                <div className="inner-container">
                    {/* 4. Truyền hàm handleApplyFilter vào component con */}
                    <AdvanceFilter 
                        isOpen={isFilterOpen} 
                        onClose={() => setIsFilterOpen(false)} 
                        onApply={handleApplyFilter} // <--- QUAN TRỌNG
                    />
                    
                    {/* 5. Truyền dữ liệu filters xuống ProductList để gọi API */}
                    <ProductList 
                        onOpenFilter={() => setIsFilterOpen(true)} 
                        filters={currentFilters} // <--- QUAN TRỌNG
                    />
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