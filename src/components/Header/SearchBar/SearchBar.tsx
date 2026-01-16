// src/components/Header/Search/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';
import SearchContent from '../SearchContent/SearchContent';       // The component from step 1 (Default view)
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'; // The NEW component (Typing view)

const SearchBar: React.FC = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to track input
    const searchRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
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
        if (!isSearchOpen) setIsSearchOpen(true); // Open dropdown if typing starts
    };

    return (
        <div id='search' className='inner-search' ref={searchRef}>
            <form className='search-form'>
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

            {/* Default Hot Keys (Visible ONLY when dropdown is CLOSED) */}
            {!isSearchOpen && (
                <div className='hot-keys'>
                    <ul className='hot-keys-list'>
                        <li><Link to="/">iPhone 17</Link></li>
                        <li><Link to="/">Samsung S25</Link></li>
                        {/* ... */}
                    </ul>
                </div>
            )}

            {/* Dropdown Logic */}
            {isSearchOpen && (
                <>
                    {/* Case 1: Has input text -> Show Suggestions (Keywords + Products) */}
                    {searchQuery.length > 0 ? (
                        <SearchSuggestions query={searchQuery} />
                    ) : (
                    /* Case 2: No input text -> Show Default Content (History + Trends) */
                        <SearchContent />
                    )}
                </>
            )}
        </div>
    );
}

export default SearchBar;