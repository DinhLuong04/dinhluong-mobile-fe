import React from "react";
import ProducList from "../ProductList/ProductList";
import AdvanceFilter from "../../Fillter/Fillter";
import "./ProductSection.css";
const ProductSection = () => {
    return (
        <div className="product-section">
            <div className="container">
                <div className="inner-container">
                    <AdvanceFilter />
                    <ProducList />
                </div>
            </div>
        </div>
    );
};

export default ProductSection;