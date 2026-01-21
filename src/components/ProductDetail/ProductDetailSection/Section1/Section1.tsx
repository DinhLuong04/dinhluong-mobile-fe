import React, { useEffect, useState } from "react";
import "./Section1.css";

// 1. Import các thành phần cần thiết
import { useParams } from "react-router-dom"; 
import { productService } from "../../../../service/productService"; // Kiểm tra lại đường dẫn
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import ProductGallery from "../../ProductGallery/ProductGallery";
import ProductInfo from "../../ProductInfo/ProductInfo";
import StickyProductBar from "../../StickyProductBar/StickyProductBar";
import ProductSpecs from "../../ProductSpecs/ProductSpecs";

// 2. Import Type đã định nghĩa (Quan trọng)
import type { ProductDetail } from "../../../../types/Product.types"; 

const Section1: React.FC = () => {
   
    const { slug } = useParams<{ slug: string }>();
    
    const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
    
    // 3. Định nghĩa kiểu cho State: Có thể là ProductDetail HOẶC null
    const [product, setProduct] = useState<ProductDetail | null>(null); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                // Gọi service
                if (slug) {
                    const data = await productService.getProductBySlug(slug);
                    setProduct(data);
                }
            } catch (err) {
                console.error("Lỗi:", err);
                // 4. Xử lý lỗi trong TS (err là unknown)
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Đã có lỗi xảy ra");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [slug]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowStickyBar(true);
            } else {
                setShowStickyBar(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (loading) return <div className="loading-container">Đang tải dữ liệu...</div>;
    if (error) return <div className="error-container">Lỗi: {error}</div>;
    
    // 5. Kiểm tra null trước khi render
    if (!product) return <div className="not-found">Không tìm thấy sản phẩm</div>;

    return (
       <div className="Section-1-bg">
            <div className="container Section-1">
                <StickyProductBar 
                    isVisible={showStickyBar}
                    name={product.name}
                    // Kiểm tra mảng tồn tại trước khi truy cập index 0
                    image={product.productImages?.length > 0 ? product.productImages[0] : product.thumbnail} 
                    price={product.price} 
                    originalPrice={product.originalPrice}
                />
                
                <Breadcrumb productName={product.name} />
                
                <div className="inner-section1-product-detail">
                    {/* Gallery */}
                    <ProductGallery 
                        key={product.slug}
                       images={
        (product.productImages && product.productImages.length > 0) 
            ? product.productImages 
            : [product.thumbnail  || "https://placehold.co/600x400"]
    }
                        highlightSpecs={product.highlightSpecs}
                        specsData={product.specsData}
                    />

                    {/* Info */}
                    <ProductInfo product={product} />

                    {/* Mobile Specs */}
                    <div className="pd-specs-mobile">
                        <ProductSpecs 
                            highlightSpecs={product.highlightSpecs} 
                            specsData={product.specsData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;