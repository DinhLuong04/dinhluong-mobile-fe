import React from "react";
import "./ProductDetail.css"
import PromotionCombo from "../../components/ProductDetail/ProductDetailSection/PromotionCombo/PromotionCombo";
import Section1 from "../../components/ProductDetail/ProductDetailSection/Section1/Section1";
import ProductDescription from "../../components/ProductDetail/ProductDetailSection/ProductDescription/ProductDescription";
import ProductReviews from "../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews";
import ProductComparison from "../../components/ProductDetail/ProductDetailSection/ProductComparison/ProductComparison";
import ViewedProducts from "../../components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts";
import PolicySection from "../../components/PolicySection/PolicySection"
const ProductDetail = () => {
    return (<div className="productdetail-container" >
        <Section1 />
        <PromotionCombo />
        <ProductDescription/>
        <ProductReviews/>
        <ProductComparison/>
        <ViewedProducts/>
        <PolicySection />
    </div>);
};
export default ProductDetail;