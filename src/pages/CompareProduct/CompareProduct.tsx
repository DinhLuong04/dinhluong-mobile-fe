import React from 'react';
import './CompareProduct.css';
import CompareProductInfor from '../../components/CompareProduct/CompareProductInfor/CompareProductInfor';
import HighlightSpecs from '../../components/CompareProduct/HighlightSpecs/HighlightSpecs';
import AllSpecifics from '../../components/CompareProduct/AllSpecifics/AllSpecifics';
import PolicySection from '../../components/PolicySection/PolicySection';
import Breadcrumb from '../../components/CompareProduct/Breadcrumb';
import { useCompareProduct } from './useCompareProduct';

const CompareProduct: React.FC = () => {
    const {
        products,
        showDiff,
        setShowDiff,
        handleRemoveProduct
    } = useCompareProduct();

    return (
        <div className="compare-product-container">
            <div className="bc"><Breadcrumb /></div>
            
            <CompareProductInfor 
                products={products} 
                onRemove={handleRemoveProduct}
                showDiff={showDiff}
                onShowDiffChange={setShowDiff}
            />
            
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