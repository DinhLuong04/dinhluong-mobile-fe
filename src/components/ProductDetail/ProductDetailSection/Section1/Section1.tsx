import React, { useEffect, useState, useMemo } from "react";
import "./Section1.css";

import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import ProductGallery from "../../ProductGallery/ProductGallery";
import ProductInfo from "../../ProductInfo/ProductInfo";
import StickyProductBar from "../../StickyProductBar/StickyProductBar";
import ProductSpecs from "../../ProductSpecs/ProductSpecs";

import type { ProductDetail, VariantDetail } from "../../../../types/product.types";

interface Section1Props {
    product: ProductDetail;
}

const Section1: React.FC<Section1Props> = ({ product }) => {
    const [showStickyBar, setShowStickyBar] = useState<boolean>(false);

    // 1. Khởi tạo state để lưu ID của biến thể đang được chọn
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

    // Xử lý hiện/ẩn Sticky Bar khi cuộn trang
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

    // 2. Tự động tìm thông tin chi tiết của biến thể dựa trên selectedVariantId
    const selectedVariant = useMemo(() => {
        if (!selectedVariantId || !product.variants) return null;
        return product.variants.find((v: VariantDetail) => Number(v.id) === selectedVariantId) || null;
    }, [selectedVariantId, product.variants]);

    return (
        <div className="Section-1-bg">
            <div className="container Section-1">

                {/* 3. Truyền dữ liệu ĐỘNG từ selectedVariant vào StickyProductBar */}
                <StickyProductBar
                    isVisible={showStickyBar}
                    name={product.name}
                    // Ưu tiên: 1. Ảnh của variant đang chọn -> 2. Thumbnail của sản phẩm -> 3. Nếu không có lấy null đẩy cho StickyBar tự xử lý DEFAULT
                    image={selectedVariant?.imageUrl || product.thumbnail || null}
                    price={selectedVariant?.price || product.price}
                    originalPrice={product.originalPrice}
                    sku={selectedVariant?.sku}
                    productVariantId={selectedVariant?.id}
                    stock={selectedVariant ? selectedVariant.stock : (product.totalStock || 0)}
                    colorName={selectedVariant?.colorName}
                    rom={selectedVariant?.rom}
                />

                <Breadcrumb
                    productName={product.name}
                    categoryName={product.categoryName}
                    brandName={product.brandName}
                />

                <div className="inner-section1-product-detail">
                    {/* Gallery */}
                    <ProductGallery
                        key={product.slug}
                        images={product.productImages}
                        thumbnail={product.thumbnailUrl || product.thumbnail} // Truyền thêm dòng này
                        highlightSpecs={product.highlightSpecs}
                        specsData={product.specsData}
                    />

                    {/* Info */}
                    {/* 4. Truyền hàm setSelectedVariantId vào onVariantChange để nhận data từ ProductInfo bắn lên */}
                    <ProductInfo
                        product={product}
                        onVariantChange={(variantId) => setSelectedVariantId(variantId)}
                    />

                    {/* Mobile Specs */}
                    {(product.highlightSpecs?.length > 0 || product.specsData?.length > 0) && (
                        <div className="pd-specs-mobile">
                            <ProductSpecs
                                highlightSpecs={product.highlightSpecs}
                                specsData={product.specsData}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Section1;