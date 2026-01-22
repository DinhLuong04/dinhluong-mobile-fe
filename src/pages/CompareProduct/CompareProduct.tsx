import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../service/productService";
import type { ProductDetail } from "../../types/Product.types";
import "./CompareProduct.css";
import CompareProductInfor from "../../components/CompareProduct/CompareProductInfor/CompareProductInfor";
import HighlightSpecs from "../../components/CompareProduct/HighlightSpecs/HighlightSpecs";
import AllSpecifics from "../../components/CompareProduct/AllSpecifics/AllSpecifics";
import PolicySection from "../../components/PolicySection/PolicySection";
import Breadcrumb from "../../components/CompareProduct/Breadcrumb";

const CompareProduct = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState<ProductDetail[]>([]);
    
    // 1. State quản lý việc chỉ xem điểm khác biệt
    const [showDiff, setShowDiff] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            const slugsParam = searchParams.get('slugs');
            if (slugsParam) {
                try {
                    const slugs = slugsParam.split(',');
                    const data = await productService.getProductsBySlugs(slugs);
                    setProducts(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [searchParams]);

    const handleRemoveProduct = (id: number | string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="compare-product-container">
            <div className="bc"><Breadcrumb/></div>
            
            {/* 2. Truyền state xuống CompareProductInfor để điều khiển checkbox */}
            <CompareProductInfor 
                products={products} 
                onRemove={handleRemoveProduct}
                showDiff={showDiff}
                onShowDiffChange={setShowDiff}
            />
            
            {/* 3. Truyền state xuống các bảng thông số để lọc dữ liệu */}
            <HighlightSpecs 
                products={products} 
                showDiff={showDiff} 
            />
            
            <div className="container all-specifics-wrapper">
                <AllSpecifics 
                    products={products} 
                    showDiff={showDiff} 
                />
            </div>
            
            <PolicySection />
        </div>
    );
};
export default CompareProduct;