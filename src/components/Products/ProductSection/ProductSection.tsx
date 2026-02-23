// src/components/ProductSection/ProductSection.tsx
import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom"; // <-- 1. Import useLocation để đọc URL
import ProductList from "../ProductList/ProductList";
import AdvanceFilter from "../../Fillter/Fillter"; 
import "./ProductSection.css";

import type { ProductFilterParams } from "../../../types/Product.types";

const ProductSection = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // 2. State này chỉ dùng để lưu các bộ lọc do user chọn (Giá, Hãng, RAM...)
    const [userFilters, setUserFilters] = useState<ProductFilterParams>({});

    const location = useLocation(); 
    
    // 3. Đọc URL để quyết định danh mục
    // Lấy chuỗi sau dấu "/" (Ví dụ: "/phu-kien" -> "phu-kien", "/" -> "")
    const pathSlug = location.pathname.replace("/", ""); 

    // CHÌA KHÓA NẰM Ở ĐÂY:
    // Nếu URL đúng là "phu-kien" thì gán category = "phu-kien".
    // Mọi trường hợp còn lại (bao gồm trang chủ "" hoặc "/dien-thoai") đều mặc định là "dien-thoai".
    const activeCategory = pathSlug === "phu-kien" ? "phu-kien" : "dien-thoai";

    // 4. Xử lý khi bấm "Áp dụng" từ bộ lọc
    const handleApplyFilter = useCallback((newFilters: ProductFilterParams) => {
        setUserFilters(newFilters);
    }, []);

    // 5. Gộp danh mục (tự động theo URL) và bộ lọc (do user chọn)
    const combinedFilters: ProductFilterParams = {
        ...userFilters,
        category: activeCategory
    };

    return (
        <div className="product-section">
            <div className="container">
                <div className="inner-container">
                    <AdvanceFilter 
                        isOpen={isFilterOpen} 
                        onClose={() => setIsFilterOpen(false)} 
                        onApply={handleApplyFilter}
                    />
                    
                    {/* Truyền bộ lọc đã gộp hoàn chỉnh xuống ProductList */}
                    <ProductList 
                        onOpenFilter={() => setIsFilterOpen(true)} 
                        filters={combinedFilters} 
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