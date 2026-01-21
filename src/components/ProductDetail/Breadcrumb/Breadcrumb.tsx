import React from 'react';
interface BreadcrumbProps{
     productName?: string;
}
const Breadcrumb:React.FC<BreadcrumbProps> =({productName})=> {
    return (
        <ul className="breadcrumb">
            <li>Trang chủ</li>
            <li>/</li>
            <li>Điện thoại</li>
            <li>/</li>
            <li>Apple (iPhone)</li>
            <li>/</li>
            <li>{productName}</li>
        </ul>
    );
};
export default Breadcrumb;