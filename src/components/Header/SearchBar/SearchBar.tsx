import React from 'react';
import './SearchBar.css';
import SearchContent from '../SearchContent/SearchContent';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { useSearchBar } from './useSearchBar';

const SearchBar: React.FC = () => {
    const {
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
    } = useSearchBar();

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
};

export default SearchBar;