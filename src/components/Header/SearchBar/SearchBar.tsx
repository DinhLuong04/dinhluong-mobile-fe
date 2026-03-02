// src/components/Header/Search/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SearchBar.css';
import SearchContent from '../SearchContent/SearchContent';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import useDebounce from '../../../hooks/useDebounce'; 
import { productService } from '../../../service/productService';
import type { Product } from '../../../types/Product.types';

const SearchBar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(searchQuery, 500);
    const searchRef = useRef<HTMLDivElement>(null);
    // Thêm ref cho input để focus lại sau khi bấm nút X
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Khóa cuộn trang khi mở search full màn hình trên Mobile
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isSearchOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isSearchOpen]);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestedProducts([]);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
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

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const currentHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
        if (!currentHistory.includes(searchQuery)) {
            const newHistory = [searchQuery, ...currentHistory].slice(0, 5);
            localStorage.setItem('search_history', JSON.stringify(newHistory));
        }

        setIsSearchOpen(false);
        navigate(`/search?keyword=${searchQuery}`); 
    };

    const handleKeywordSelect = (keyword: string) => {
        setSearchQuery(keyword);
        setIsSearchOpen(true);
    };

    // Hàm đóng search khi bấm nút Back trên mobile
    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery(''); 
    };

    // Hàm xóa chữ khi bấm nút X
    const handleClearSearch = () => {
        setSearchQuery('');
        inputRef.current?.focus(); // Tự động trỏ nháy chuột lại vào ô input
    };

    return (
        <div id='search' className={`inner-search ${isSearchOpen ? 'mobile-active' : ''}`} ref={searchRef}>
            
            {/* Nút Back (Chỉ hiển thị trên Mobile khi Search đang mở) */}
            <button type="button" className="mobile-back-btn" onClick={handleCloseSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

            <form className='search-form' onSubmit={handleSearchSubmit}>
                <input 
                    ref={inputRef}
                    type='text'
                    className='search-input'
                    placeholder='Tìm kiếm sản phẩm...'
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => setIsSearchOpen(true)}
                />

                {/* NÚT X XÓA CHỮ (Chỉ hiện khi có chữ) */}
                {searchQuery && (
                    <button type="button" className="clear-search-btn" onClick={handleClearSearch}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                <button type='submit' className='search-submit'>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {isSearchOpen && (
                <div className="search-dropdown-wrapper">
                    {searchQuery.length > 0 ? (
                        <SearchSuggestions 
                            query={searchQuery} 
                            products={suggestedProducts}
                            isLoading={isLoading}
                            onClose={() => setIsSearchOpen(false)}
                        />
                    ) : (
                        <SearchContent onKeywordClick={handleKeywordSelect} />
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;