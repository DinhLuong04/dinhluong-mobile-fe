// src/components/Header/Search/SearchSuggestions.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchSuggestions.css';
import type { Product } from '../../../types/Product.types';

interface SearchSuggestionsProps {
    query: string;
    products: Product[]; // Nhận danh sách sản phẩm từ API
    isLoading: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ query, products, isLoading }) => {
    
    // Giả lập gợi ý từ khóa dựa trên query (Thực tế nên lấy từ API nếu có)
    const suggestedKeywords = query ? [
        { id: 1, text: `${query} cũ` },
        { id: 2, text: `${query} chính hãng` },
        { id: 3, text: `phụ kiện cho ${query}` },
    ] : [];

    return (
        <div className="search-suggestions-container">
            {/* 1. Gợi ý từ khóa */}
            <ul className="keyword-list">
                <li className="keyword-item highlight">
                    <span className="keyword-icon">🔍</span>
                    <span className="query-text">Tìm: "{query}"</span>
                </li>
                {suggestedKeywords.map(item => (
                    <li key={item.id} className="keyword-item">
                        <span className="keyword-text">{item.text}</span>
                    </li>
                ))}
            </ul>

            {/* 2. Gợi ý sản phẩm từ API */}
            <div className="product-suggestions">
                <h5 className="product-suggestions-title">Sản phẩm đề xuất</h5>
                
                {isLoading ? (
                    <div style={{padding: '10px', color: '#666'}}>Đang tìm kiếm...</div>
                ) : products.length > 0 ? (
                    <ul className="product-list-suggestions">
                        {products.map(product => (
                            <li key={product.id} className="product-suggestions-item">
                                {/* Link tới trang chi tiết (do chưa có trang search) */}
                                <Link to={`/products/${product.slug}`} className="product-suggestions-link">
                                    <div className="product-suggestions-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="product-suggestions-info">
                                        <h6 className="product-suggestions-name">{product.name}</h6>
                                        <div className="product-suggestions-price-box">
                                            <p className="current-price">
                                                {product.price.toLocaleString('vi-VN')}đ
                                            </p>
                                            {product.originalPrice > product.price && (
                                                <span className="old-price">
                                                    {product.originalPrice.toLocaleString('vi-VN')}đ
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{padding: '10px', color: '#999', fontSize: '13px'}}>
                        Không tìm thấy sản phẩm nào khớp với từ khóa.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSuggestions;