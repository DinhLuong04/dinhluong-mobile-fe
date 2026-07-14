// src/components/Header/Search/useSearchBar.ts
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { productService } from '../../../service/productService';
import type { ProductCardResponse } from '../../../types/product.types';

export const useSearchBar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedProducts, setSuggestedProducts] = useState<ProductCardResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(searchQuery, 500);
    const searchRef = useRef<HTMLDivElement>(null);
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

    // Gọi API gợi ý sản phẩm khi debounce query thay đổi
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
                console.error("Fetch Suggestions Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    // Xử lý click ra ngoài để đóng khung search
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
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;

        // Lưu lịch sử tìm kiếm vào LocalStorage
        try {
            const currentHistory = JSON.parse(localStorage.getItem('search_history') || '[]');
            if (!currentHistory.includes(trimmedQuery)) {
                const newHistory = [trimmedQuery, ...currentHistory].slice(0, 5);
                localStorage.setItem('search_history', JSON.stringify(newHistory));
            }
        } catch (error) {
            console.error("Save Search History Error:", error);
        }

        setIsSearchOpen(false);
        navigate(`/search?keyword=${encodeURIComponent(trimmedQuery)}`); 
    };

    const handleKeywordSelect = (keyword: string) => {
        setSearchQuery(keyword);
        setIsSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery(''); 
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        inputRef.current?.focus();
    };

    return {
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        suggestedProducts,
        isLoading,
        searchRef,
        inputRef,
        handleInputChange,
        handleSearchSubmit,
        handleKeywordSelect,
        handleCloseSearch,
        handleClearSearch
    };
};