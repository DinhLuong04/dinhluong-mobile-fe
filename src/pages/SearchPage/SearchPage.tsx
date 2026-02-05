import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/Products/ProductList/ProductList';
import AdvanceFilter from '../../components/Fillter/Fillter';
import type { ProductFilterParams } from '../../types/Product.types';
import './SearchPage.css';
import ViewedProducts from '../../components/ProductDetail/ProductDetailSection/ProductsViewed/ViewedProducts';
import EmptySearch from '../../components/EmptySearch/EmptySearch';

const SearchPage: React.FC = () => {
    // 1. Lấy keyword từ URL (VD: ?keyword=iphone)
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    // 2. State quản lý popup trên Mobile
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // 3. State quản lý các bộ lọc nâng cao (Hãng, Giá...)
    const [advanceFilters, setAdvanceFilters] = useState<ProductFilterParams>({});

    // 4. Gộp Keyword + Filter thành bộ lọc cuối cùng
    const finalFilters: ProductFilterParams = {
        ...advanceFilters,
        search: keyword // Luôn ưu tiên keyword từ URL
    };

    // Xử lý khi bấm Áp dụng
    const handleApplyFilter = useCallback((newFilters: ProductFilterParams) => {
        setAdvanceFilters(newFilters);
        setIsMobileFilterOpen(false);
    }, []);

    // 1. STATE MỚI: Kiểm soát xem có kết quả không
    // Mặc định là false (coi như có kết quả) để hiện khung loading ban đầu
    const [isEmpty, setIsEmpty] = useState(false);

    const [prevKeyword, setPrevKeyword] = useState(keyword);

    // Kiểm tra ngay trong lúc Render: Nếu keyword URL khác keyword cũ -> Reset luôn
    if (keyword !== prevKeyword) {
        setPrevKeyword(keyword);
        setIsEmpty(false); // React cho phép set state ở đây để reset UI ngay lập tức
    }
    // 3. HÀM CALLBACK: Nhận tín hiệu từ ProductList
    const handleDataFetched = useCallback((total: number) => {
        // Nếu tổng = 0 -> Set Empty = true -> Giao diện sẽ đổi
        setIsEmpty(total === 0);
    }, []);
    return (
        <div className="search-page-wrapper">
            <div className='container'>{isEmpty ? (
                // TRƯỜNG HỢP 1: KHÔNG CÓ KẾT QUẢ
                <div className="py-8">
                    <EmptySearch keyword={keyword} />
                </div>
            ) : (
                // TRƯỜNG HỢP 2: CÓ KẾT QUẢ (Hoặc đang tải)
                <>
                    {/* Header chỉ hiện khi có kết quả */}
                    <div className="search-header-block">
                        <h2 className="search-title">
                            Kết quả tìm kiếm cho: <span>"{keyword}"</span>
                        </h2>
                        {/* Nút lọc mobile (nếu cần thì thêm vào đây) */}
                    </div>

                    {/* Layout 2 cột */}
                    <div className="search-body-layout">
                       
                            <AdvanceFilter
                                isOpen={isMobileFilterOpen}
                                onClose={() => setIsMobileFilterOpen(false)}
                                onApply={handleApplyFilter}
                                hideBrand={true}
                            />
                       

                        {/* Product List */}
                        
                            <ProductList
                                onOpenFilter={() => setIsMobileFilterOpen(true)}
                                filters={finalFilters}
                                onDataFetched={handleDataFetched}
                            />
                    
                    </div>
                </>
            )}

                <ViewedProducts /></div>

        </div>
    );
};

export default SearchPage;