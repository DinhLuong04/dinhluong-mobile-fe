import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
    productName?: string;
    categoryName?: string;
    brandName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
    productName, 
    categoryName, 
    brandName 
}) => {
    return (
        <ul className="breadcrumb">
            {/* Click về Home */}
            <li>
                <Link to="/">Trang chủ</Link>
            </li>
            
            {/* Hiển thị Tên danh mục (Chỉ là text bình thường) */}
            {categoryName && (
                <>
                    <li>/</li>
                    <li>{categoryName}</li>
                </>
            )}

            {/* Hiển thị Tên Hãng (Chỉ là text bình thường) */}
            {brandName && (
                <>
                    <li>/</li>
                    <li>{brandName}</li>
                </>
            )}

            {/* Tên sản phẩm hiện tại */}
            {productName && (
                <>
                    <li>/</li>
                    <li>{productName}</li>
                </>
            )}
        </ul>
    );
};

export default Breadcrumb;