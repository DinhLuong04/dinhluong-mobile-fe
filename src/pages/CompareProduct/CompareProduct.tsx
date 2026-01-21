// CompareProduct.tsx
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy slugs từ URL (ví dụ: ?slugs=iphone-13,iphone-14)
                const slugsParam = searchParams.get('slugs');
                if (slugsParam) {
                    const slugs = slugsParam.split(',');
                    const data = await productService.getProductsBySlugs(slugs);
                    setProducts(data);
                }
            } catch (error) {
                console.error("Lỗi tải dữ liệu so sánh:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    const handleRemoveProduct = (id: number | string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    if (loading) return <div>Đang tải so sánh...</div>;

    return (
        <div className="compare-product-container">
            <div className="bc"><Breadcrumb/></div>
            
            {/* Truyền products vào các component con */}
            <CompareProductInfor products={products} onRemove={handleRemoveProduct} />
            
            <HighlightSpecs products={products} />
            
            <div className="container all-specifics-wrapper">
                <AllSpecifics products={products} />
            </div>
            
            <PolicySection />
        </div>
    );
};
export default CompareProduct;