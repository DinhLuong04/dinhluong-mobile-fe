// src/components/Header/Search/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SearchBar.css';
import SearchContent from '../SearchContent/SearchContent';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import useDebounce from '../../../hooks/useDebounce'; // Import hook
import { productService } from '../../../service/productService';
import type { Product } from '../../../types/Product.types';

const SearchBar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // State cho dữ liệu gợi ý
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Áp dụng Debounce (Delay 500ms sau khi ngừng gõ)
    const debouncedQuery = useDebounce(searchQuery, 500);

    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // 2. Gọi API khi debouncedQuery thay đổi
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestedProducts([]);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                // Gọi service lấy sản phẩm
                const products = await productService.getSuggestions(debouncedQuery);
                setSuggestedProducts(products);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (!isSearchOpen) setIsSearchOpen(true);
    };

    // 3. Xử lý khi Submit (Enter hoặc click icon search)
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        // A. Lưu vào lịch sử
        const currentHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
        if (!currentHistory.includes(searchQuery)) {
            const newHistory = [searchQuery, ...currentHistory].slice(0, 5); // Lưu tối đa 5 item
            localStorage.setItem('search_history', JSON.stringify(newHistory));
        }

        // B. Đóng dropdown
        setIsSearchOpen(false);

        // C. Chuyển hướng (Vì chưa có trang search nên tạm thời log ra hoặc alert)
        navigate(`/search?keyword=${searchQuery}`); // <-- Khi nào có trang search thì mở dòng này
    };

    // Hàm khi click vào từ khóa lịch sử/trending
    const handleKeywordSelect = (keyword: string) => {
        setSearchQuery(keyword);
        setIsSearchOpen(true);
        // Tùy chọn: Có thể submit luôn hoặc chỉ điền vào ô input
    };

    return (
        <div id='search' className='inner-search' ref={searchRef}>
            <form className='search-form' onSubmit={handleSearchSubmit}>
                <input 
                    type='text'
                    className='search-input'
                    placeholder='Tìm kiếm sản phẩm...'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setIsSearchOpen(true)}
                />
                <button type='submit' className='search-submit'>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {/* Dropdown Logic */}
            {isSearchOpen && (
                <>
                    {searchQuery.length > 0 ? (
                        // Component hiển thị kết quả API
                        <SearchSuggestions 
                            query={searchQuery} 
                            products={suggestedProducts}
                            isLoading={isLoading}
                        />
                    ) : (
                        // Component hiển thị lịch sử & xu hướng
                        <SearchContent onKeywordClick={handleKeywordSelect} />
                    )}
                </>
            )}
        </div>
    );
}

export default SearchBar;