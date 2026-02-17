import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css"
import PromotionCombo from "../../components/ProductDetail/ProductDetailSection/PromotionCombo/PromotionCombo";
import Section1 from "../../components/ProductDetail/ProductDetailSection/Section1/Section1";
import ProductDescription from "../../components/ProductDetail/ProductDetailSection/ProductDescription/ProductDescription";
import ProductReviews from "../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews";
import ProductComparison from "../../components/ProductDetail/ProductDetailSection/ProductComparison/ProductComparison";
import ViewedProducts from "../../components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts";
import PolicySection from "../../components/PolicySection/PolicySection"
const ProductDetail = () => {
    const { slug } = useParams<{ slug: string }>(); // Lấy slug từ URL

    // Nếu không có slug (ví dụ đường dẫn sai), có thể return null hoặc Loading
    if (!slug) return null;
    return (<div className="productdetail-container" >
        <Section1 />
        <PromotionCombo slug={slug} />
        <ProductDescription/>
        <ProductReviews/>
        <ProductComparison/>
        <ViewedProducts/>
        <PolicySection />
    </div>);
};
export default ProductDetail;