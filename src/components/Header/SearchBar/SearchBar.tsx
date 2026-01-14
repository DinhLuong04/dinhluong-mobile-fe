import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';
const SearchBar=()=>{
    return (
        <div id='search' className='inner-search'>
                <form className=''>
                    <input 
                    type='text'
                    className='search-input'
                    placeholder='Tìm kiếm sản phẩm...'
                    />
                    <button 
                    type='submit'
                    className='search-submit'
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </form>
          

            <div className='hot-keys '>
                <ul className='hot-keys-list'>
                    <li><Link to="/">iPhone 17</Link></li>
                    <li><Link to="/">Samsung S25</Link></li>
                    <li><Link to="/">Macbook Air</Link></li>
                    <li><Link to="/">iPhone 17</Link></li>
                    <li><Link to="/">Samsung S25</Link></li>
                    <li><Link to="/">Macbook Air</Link></li>
                    <li><Link to="/">Macbook</Link></li>
               
                </ul>
        </div>
        </div>
    );
}
export default SearchBar;
