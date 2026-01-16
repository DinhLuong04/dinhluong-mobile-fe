// src/components/Header/Search/SearchSuggestions.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchSuggestions.css';

// Mock data for demonstration purposes
// In a real app, these would come from an API based on the search query
const suggestedKeywords = [
    { id: 1, text: "11 f" },
    { id: 2, text: "reno11 f" },
    { id: 3, text: "reno 11 f" },
    { id: 4, text: "oppo reno11 f" },
    { id: 5, text: "oppo reno 11 f" },
];

const suggestedProducts = [
    {
        id: 101,
        name: "OPPO Reno13 F 8GB",
        price: "7.990.000đ",
        oldPrice: "8.830.000đ",
        discount: "-10%",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/oppo_reno_13f_den_7da96b2c87.png",
        link: "/dien-thoai/oppo-reno13-f"
    },
    {
        id: 102,
        name: "OPPO Reno13 F 5G 12GB",
        price: "9.990.000đ",
        oldPrice: "10.800.000đ",
        discount: "-8%",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/oppo_reno13_f_5g_tim_5_858ba5c2ad.png",
        link: "/dien-thoai/oppo-reno13-f-5g"
    },
    {
        id: 103,
        name: "OPPO Reno15 F 5G 8GB",
        price: "11.990.000đ",
        oldPrice: null,
        discount: null,
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/oppo_reno15_f_xanh_5_a866ea3714.png",
        link: "/dien-thoai/oppo-reno15-f"
    }
];

interface SearchSuggestionsProps {
    query: string;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ query }) => {
    return (
        <div className="search-suggestions-container">
            {/* Keyword Suggestions List */}
            <ul className="keyword-list">
                {/* Special highlight item (e.g. searching inside a specific category) */}
                <li className="keyword-item highlight">
                    <span className="query-text">{query}</span>
                    <span className="context-text">trong <Link to="/phan-mem/goi-cuoc-fpt-play" className="category-link">Gói cước FPT play</Link></span>
                </li>

                {suggestedKeywords.map(item => (
                    <li key={item.id} className="keyword-item">
                        <span className="keyword-text">{item.text}</span>
                        <span className="keyword-icon">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.00501 3.32193C9.00501 2.91222 8.67287 2.58008 8.26316 2.58008H2.82291C2.41319 2.58008 2.08105 2.91222 2.08105 3.32193V8.76218C2.08105 9.17189 2.41319 9.50403 2.82291 9.50403C3.23262 9.50403 3.56476 9.17189 3.56476 8.76218V5.11296L12.6839 14.2324C12.9736 14.5221 13.4434 14.5221 13.7331 14.2324C14.0228 13.9427 14.0228 13.473 13.7331 13.1833L4.61386 4.06378H8.26316C8.67287 4.06378 9.00501 3.73164 9.00501 3.32193Z" fill="#6B7280"></path>
                            </svg>
                        </span>
                    </li>
                ))}
            </ul>

            {/* Product Suggestions Section */}
            <div className="product-suggestions">
                <h5 className="product-suggestions-title">Sản phẩm đề xuất</h5>
                <ul className="product-list-suggestions">
                    {suggestedProducts.map(product => (
                        <li key={product.id} className="product-suggestions-item">
                            <Link to={product.link} className="product-suggestions-link">
                                <div className="product-suggestions-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-suggestions-info">
                                    <h6 className="product-suggestions-name">{product.name}</h6>
                                    <div className="product-suggestions-price-box">
                                        <p className="current-price">
                                            {product.price}
                                            {product.discount && <span className="discount-tag">{product.discount}</span>}
                                        </p>
                                        {product.oldPrice && (
                                            <span className="old-price">{product.oldPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchSuggestions;