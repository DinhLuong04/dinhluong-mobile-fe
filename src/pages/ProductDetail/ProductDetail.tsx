import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css"
import PromotionCombo from "../../components/ProductDetail/ProductDetailSection/PromotionCombo/PromotionCombo";
import Section1 from "../../components/ProductDetail/ProductDetailSection/Section1/Section1";
import ProductDescription from "../../components/ProductDetail/ProductDetailSection/ProductDescription/ProductDescription";
import ProductReviews from "../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews";
import ProductComparison from "../../components/ProductDetail/ProductDetailSection/ProductComparison/ProductComparison";
import ViewedProducts from "../../components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts";
import PolicySection from "../../components/PolicySection/PolicySection"

// Nhớ import productService của bạn vào để gọi API
import { productService } from "../../service/productService"; 

const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>(); 
    
    // Thêm State để lưu thông tin sản phẩm
    const [product, setProduct] = useState<any>(null); // Bạn có thể thay 'any' bằng Type Product của bạn
    const [loading, setLoading] = useState(true);

    // Gọi API lấy thông tin sản phẩm khi component load
    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!slug) return;
            try {
                // Giả sử bạn có hàm getProductBySlug trong productService
                const data = await productService.getProductBySlug(slug); 
                setProduct(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [slug]);

    if (!slug) return null;
    if (loading) return <div style={{textAlign: "center", padding: "50px"}}>Đang tải thông tin sản phẩm...</div>;
    if (!product) return <div style={{textAlign: "center", padding: "50px"}}>Không tìm thấy sản phẩm!</div>;

    return (
        <div className="productdetail-container">
            {/* Có thể bạn cũng cần truyền product xuống Section1 để hiển thị tên, giá, ảnh... */}
            <Section1 /> 
            
            <PromotionCombo 
                slug={product.slug}  />
            
            <ProductDescription />
            <ProductReviews  slug={product.slug}/>
            {/* <ProductComparison/> */}
            <ViewedProducts currentSlug={slug} />
            <PolicySection />
        </div>
    );
};

export default ProductDetail;