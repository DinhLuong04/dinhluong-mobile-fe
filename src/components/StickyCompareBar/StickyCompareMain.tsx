// src/components/StickyCompareMain/StickyCompareMain.tsx
import React from "react";
import StickyCompareBar from "./StickyCompareBar/StickyCompareBar";
import Minicompare from "./Minicompare/Minicompare";
import { useCompare } from "../../contexts/CompareContext";

const StickyCompareMain = () => {
    const { compareList, isVisible, toggleCompareVisibility, removeFromCompare, clearCompare } = useCompare();

    // 1. Không có sản phẩm -> Ẩn hết
    if (!compareList || compareList.length === 0) return null;

    return (
        <>
            {/* 2. Nếu ĐANG ẨN (isVisible = false) -> Hiện nút nhỏ Minicompare */}
            {!isVisible && (
                <Minicompare 
                    count={compareList.length} 
                    onToggle={toggleCompareVisibility} 
                />
            )}

            {/* 3. Nếu ĐANG HIỆN (isVisible = true) -> Hiện thanh to StickyCompareBar */}
            {isVisible && (
                <StickyCompareBar 
                    compareList={compareList}
                    onToggle={toggleCompareVisibility} // Quan trọng: Truyền hàm toggle vào đây
                    onRemove={removeFromCompare}
                    onClear={clearCompare}
                />
            )}
        </>
    );
}

export default StickyCompareMain;