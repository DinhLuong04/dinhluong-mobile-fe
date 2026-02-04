// src/components/Header/Search/SearchContent.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchContent.css';

// Mock trends (Giữ nguyên hoặc lấy API sau này)
const trendingKeywords = ["iPhone 15", "Samsung S24", "Macbook Air", "Tai nghe"];

interface SearchContentProps {
    onKeywordClick: (keyword: string) => void; // Hàm để khi bấm vào lịch sử thì điền vào ô input
}

const SearchContent: React.FC<SearchContentProps> = ({ onKeywordClick }) => {
   

    // Load lịch sử từ LocalStorage khi mount
    const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('search_history');
    return saved ? JSON.parse(saved) : [];
});

    // Xóa 1 item
    const removeHistory = (e: React.MouseEvent, item: string) => {
        e.stopPropagation(); // Chặn sự kiện click vào li
        const newHistory = history.filter(i => i !== item);
        setHistory(newHistory);
        localStorage.setItem('search_history', JSON.stringify(newHistory));
    };

    // Xóa tất cả
    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('search_history');
    };

    return (
        <div className="search-content-dropdown">
            {/* History Section */}
            {history.length > 0 && (
                <div className="search-history">
                    <div className="history-header" style={{display:'flex', justifyContent:'space-between', padding:'10px 15px 5px'}}>
                        <span style={{fontSize:'13px', fontWeight:600, color:'#666'}}>Lịch sử tìm kiếm</span>
                        <span onClick={clearHistory} style={{fontSize:'13px', color:'#0071e3', cursor:'pointer'}}>Xóa tất cả</span>
                    </div>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index} className="history-item" onClick={() => onKeywordClick(item)}>
                                <span className="history-icon">🕒</span>
                                <span className="history-text">{item}</span>
                                <span className="history-remove" onClick={(e) => removeHistory(e, item)}>✕</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Trending Section */}
            <div className="search-trending">
                <p className="trending-title">Xu hướng tìm kiếm</p>
                <div className="trending-list">
                    {trendingKeywords.map((keyword, index) => (
                        <button key={index} className="trending-item" onClick={() => onKeywordClick(keyword)}>
                            🔥 {keyword}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchContent;