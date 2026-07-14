import React from 'react';
import './ProductDetail.css';
import PromotionCombo from "../../components/ProductDetail/ProductDetailSection/PromotionCombo/PromotionCombo";
import Section1 from "../../components/ProductDetail/ProductDetailSection/Section1/Section1";
import ProductDescription from "../../components/ProductDetail/ProductDetailSection/ProductDescription/ProductDescription";
import ProductReviews from "../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews";
import ViewedProducts from "../../components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts";
import PolicySection from "../../components/PolicySection/PolicySection";
import { useProductDetail } from './useProductDetail';

const ProductDetail: React.FC = () => {
    const { slug, product, loading } = useProductDetail();

    if (!slug) return null;
    if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Đang tải thông tin sản phẩm...</div>;
    if (!product) return <div style={{ textAlign: "center", padding: "50px" }}>Không tìm thấy sản phẩm!</div>;

    return (
        <div className="productdetail-container">
            <Section1 product={product} /> 
            <PromotionCombo slug={product.slug || slug} />
            <ProductDescription description={product.description} />
            <ProductReviews slug={product.slug || slug} />
            <ViewedProducts currentSlug={slug} />
            <PolicySection />
        </div>
    );
};

export default ProductDetail;