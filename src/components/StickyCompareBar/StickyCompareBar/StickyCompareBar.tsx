import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './StickyCompareBar.css';
import type { Product } from '../../../types/Product.types'; 

interface StickyCompareBarProps {
    compareList: Product[]; 
    onToggle: () => void;
    onRemove: (id: number | string) => void;
    onClear: () => void;
}

const StickyCompareBar: React.FC<StickyCompareBarProps> = ({ 
    compareList = [], 
    onToggle, 
    onRemove, 
    onClear 
}) => {
    const MAX_SLOTS = 3;
    const navigate = useNavigate(); // 2. Khởi tạo hook navigate

    // --- HÀM XỬ LÝ SO SÁNH ---
    const handleCompareNow = () => {
        // Kiểm tra nếu chưa có đủ sản phẩm (tùy chọn: bắt buộc > 1 sản phẩm mới cho so sánh)
        if (!compareList || compareList.length < 2) {
            alert("Vui lòng chọn ít nhất 2 sản phẩm để so sánh!");
            return;
        }

        // 3. Lấy ra mảng slug (Lưu ý: Trong Type của bạn id chính là slug)
        const slugs = compareList.map(product => product.id).join(',');

        // 4. Chuyển hướng kèm theo query params
        // Giả sử đường dẫn trang so sánh của bạn là "/compare-product"
        navigate(`/compare?slugs=${slugs}`);
        
        // (Tùy chọn) Ẩn thanh so sánh sau khi bấm
        onToggle(); 
    };

    if (!compareList) return null;

    return (
        <div className="compare-bar expanded">
            <div className='container'>
                <div className="compare-inner">
                    <div className="product-list">
                        {compareList?.map((product) => (
                            <div key={product.id} className="product-item">
                                <img src={product.image} alt={product.name} className="product-img" />
                                <div className="product-name">{product.name}</div>
                                <button className="btn-remove" onClick={() => onRemove(product.id)}>✕</button>
                            </div>
                        ))}
                        
                        {[...Array(Math.max(0, MAX_SLOTS - (compareList?.length || 0)))].map((_, index) => (
                            <div key={`empty-${index}`} className="empty-slot">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span className="empty-text">Thêm sản phẩm</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="action-buttons">
                        <button className="btn btn-clear" onClick={onClear}>Xóa tất cả</button>
                        
                        {/* 5. Gắn sự kiện vào nút So sánh ngay */}
                        <button 
                            className="btn btn-compare-1"
                            onClick={handleCompareNow}
                            disabled={compareList.length < 2} // Disable nếu chưa đủ 2 sp
                            style={{ opacity: compareList.length < 2 ? 0.5 : 1, cursor: compareList.length < 2 ? 'not-allowed' : 'pointer' }}
                        >
                            So sánh ngay
                        </button>

                        <button 
                            className="btn-toggle" 
                            onClick={onToggle}
                        >
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon-expanded">
                                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM7.46967 9.96967C7.76256 9.67678 8.23744 9.67678 8.53033 9.96967L12 13.4393L15.4697 9.96967C15.7626 9.67678 16.2374 9.67678 16.5303 9.96967C16.8232 10.2626 16.8232 10.7374 16.5303 11.0303L12.5303 15.0303C12.2374 15.3232 11.7626 15.3232 11.4697 15.0303L7.46967 11.0303C7.17678 10.7374 7.17678 10.2626 7.46967 9.96967Z" fill="#fff"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickyCompareBar;