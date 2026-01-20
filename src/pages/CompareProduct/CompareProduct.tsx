import React from "react";

import CompareProductInfor from "../../components/CompareProduct/CompareProductInfor/CompareProductInfor";
import HighlightSpecs from "../..//components/CompareProduct/HighlightSpecs/HighlightSpecs";
import AllSpecifics from "../../components/CompareProduct/AllSpecifics/AllSpecifics";
import PolicySection from "../../components/PolicySection/PolicySection";

const CompareProduct =()=>{
    return (<div className="compare-product-container">
        <CompareProductInfor/>
        <HighlightSpecs/>
        <div className="container all-specifics-wrapper">
            <AllSpecifics/>
        </div>
        <PolicySection />
    </div>);
};
export default CompareProduct;