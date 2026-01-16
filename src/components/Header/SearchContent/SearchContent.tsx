// src/components/Header/Search/SearchContent.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchContent.css';

// Mock data for demonstration
const trendingKeywords = [
    "iPhone 17", "Laptop", "Điện thoại Samsung", 
    "iPhone 16", "Sưởi gốm", "Ghế ô tô trẻ em"
];

const suggestedProducts = [
    {
        id: 1,
        title: "MediaTek Dimensity 9500s ra mắt, sức mạnh cận flagship",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/small/mediatek_dimensity_9500s_ra_mat_198579_1_33243f3dcf.jpg",
        link: "/"
    },
    {
        id: 2,
        title: "iQOO Z11 Turbo ra mắt: Chip Snapdragon 8 Gen 5",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/small/iqoo_z11_turbo_ra_mat_198549_3_65b694a0cf.jpg",
        link: "/"
    },
    {
        id: 3,
        title: "Privacy Display có thể là “vũ khí mới” của Galaxy S26 Ultra",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/small/galaxy_s26_ultra_lo_cong_nghe_privacy_display_chong_nhin_trom_198553_2_ce6ffd2889.jpg",
        link: "/"
    },
    {
        id: 4,
        title: "HONOR Magic8 Pro Air teaser khoe thiết kế siêu mỏng",
        image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/honor_magic8_pro_air_teaser_198387_4_48d646bdd2.jpg",
        link: "/"
    }
];

const bannerImages = [
    "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:format(webp):quality(75)/640x57_c13ea67f0f.png",
    "https://cdn2.fptshop.com.vn/unsafe/640x0/filters:format(webp):quality(75)/D_Search_L10_84afc16d74.png"
];

const SearchContent: React.FC = () => {
    return (
        <div className="search-content-dropdown">
            {/* Banner Slider Section (Simplified) */}
            <div className="search-banner-slider">
                <div className="search-banner-item">
                    <img src={bannerImages[0]} alt="Banner 1" />
                </div>
                {/* Add slider logic here if needed, for now displaying one */}
            </div>

            {/* Recent/History Section (Mock) */}
            <div className="search-history">
                <ul>
                    <li className="history-item">
                        <span className="history-icon">
                             <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3418 12.4277C20.3418 8.2856 16.9839 4.92773 12.8418 4.92773C10.8727 4.92773 9.08087 5.68656 7.74273 6.92773H9.0918C9.50601 6.92773 9.8418 7.26352 9.8418 7.67773C9.8418 8.09195 9.50601 8.42773 9.0918 8.42773H6.0918C5.67758 8.42773 5.3418 8.09195 5.3418 7.67773V4.67773C5.3418 4.26352 5.67758 3.92773 6.0918 3.92773C6.50601 3.92773 6.8418 4.26352 6.8418 4.67773V5.71941C8.43407 4.29429 10.5367 3.42773 12.8418 3.42773C17.8124 3.42773 21.8418 7.45717 21.8418 12.4277C21.8418 17.3983 17.8124 21.4277 12.8418 21.4277C7.87123 21.4277 3.8418 17.3983 3.8418 12.4277C3.8418 11.9594 3.87756 11.4995 3.94651 11.0505C4.0028 10.684 4.32803 10.4277 4.69888 10.4277C5.15788 10.4277 5.49025 10.866 5.42303 11.32C5.36952 11.6815 5.3418 12.0514 5.3418 12.4277C5.3418 16.5699 8.69966 19.9277 12.8418 19.9277C16.9839 19.9277 20.3418 16.5699 20.3418 12.4277ZM13.3418 8.17773C13.3418 7.76352 13.006 7.42773 12.5918 7.42773C12.1776 7.42773 11.8418 7.76352 11.8418 8.17773V12.6777C11.8418 13.0919 12.1776 13.4277 12.5918 13.4277H15.0918C15.506 13.4277 15.8418 13.0919 15.8418 12.6777C15.8418 12.2635 15.506 11.9277 15.0918 11.9277H13.3418V8.17773Z" fill="#6B7280"></path></svg>
                        </span>
                        <span className="history-text">iPhone 15</span>
                        <span className="history-remove">
                            <svg width="14" height="14" viewBox="0 0 28 28" fill="#090d14" xmlns="http://www.w3.org/2000/svg"><path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.93241 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path></svg>
                        </span>
                    </li>
                     <li className="history-item">
                        <span className="history-icon">
                             <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3418 12.4277C20.3418 8.2856 16.9839 4.92773 12.8418 4.92773C10.8727 4.92773 9.08087 5.68656 7.74273 6.92773H9.0918C9.50601 6.92773 9.8418 7.26352 9.8418 7.67773C9.8418 8.09195 9.50601 8.42773 9.0918 8.42773H6.0918C5.67758 8.42773 5.3418 8.09195 5.3418 7.67773V4.67773C5.3418 4.26352 5.67758 3.92773 6.0918 3.92773C6.50601 3.92773 6.8418 4.26352 6.8418 4.67773V5.71941C8.43407 4.29429 10.5367 3.42773 12.8418 3.42773C17.8124 3.42773 21.8418 7.45717 21.8418 12.4277C21.8418 17.3983 17.8124 21.4277 12.8418 21.4277C7.87123 21.4277 3.8418 17.3983 3.8418 12.4277C3.8418 11.9594 3.87756 11.4995 3.94651 11.0505C4.0028 10.684 4.32803 10.4277 4.69888 10.4277C5.15788 10.4277 5.49025 10.866 5.42303 11.32C5.36952 11.6815 5.3418 12.0514 5.3418 12.4277C5.3418 16.5699 8.69966 19.9277 12.8418 19.9277C16.9839 19.9277 20.3418 16.5699 20.3418 12.4277ZM13.3418 8.17773C13.3418 7.76352 13.006 7.42773 12.5918 7.42773C12.1776 7.42773 11.8418 7.76352 11.8418 8.17773V12.6777C11.8418 13.0919 12.1776 13.4277 12.5918 13.4277H15.0918C15.506 13.4277 15.8418 13.0919 15.8418 12.6777C15.8418 12.2635 15.506 11.9277 15.0918 11.9277H13.3418V8.17773Z" fill="#6B7280"></path></svg>
                        </span>
                        <span className="history-text">iPhone 17</span>
                        <span className="history-remove">
                            <svg width="14" height="14" viewBox="0 0 28 28" fill="#090d14" xmlns="http://www.w3.org/2000/svg"><path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.93241 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path></svg>
                        </span>
                    </li>
                    <li className="history-clear">
                        <span>Xoá tất cả</span>
                    </li>
                </ul>
            </div>

            {/* Trending Keywords Section */}
            <div className="search-trending">
                <p className="trending-title">Xu hướng tìm kiếm</p>
                <div className="trending-list">
                    {trendingKeywords.map((keyword, index) => (
                        <button key={index} className="trending-item">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.6682 11.6641L14.6682 14.6641" stroke="#CB1C22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.3362 7.33203C13.3362 4.01832 10.6499 1.33203 7.33618 1.33203C4.02247 1.33203 1.33618 4.01832 1.33618 7.33203C1.33618 10.6457 4.02247 13.332 7.33618 13.332C10.6499 13.332 13.3362 10.6457 13.3362 7.33203Z" stroke="#CB1C22" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>

            {/* Suggestions Section */}
            <div className="search-suggestions">
                <div className="suggestions-header">
                    <h5>Gợi ý cho bạn</h5>
                    <Link to="/more-suggestions" className="suggestions-link">
                        Gợi ý khác 
                        <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.3418 10.4277C6.3418 7.94245 8.35652 5.92773 10.8418 5.92773C11.9135 5.92773 12.8973 6.30179 13.6706 6.92773H12.5918C12.1776 6.92773 11.8418 7.26352 11.8418 7.67773C11.8418 8.09195 12.1776 8.42773 12.5918 8.42773H15.0918C15.506 8.42773 15.8418 8.09195 15.8418 7.67773V5.17773C15.8418 4.76352 15.506 4.42773 15.0918 4.42773C14.6776 4.42773 14.3418 4.76352 14.3418 5.17773V5.55392C13.3569 4.84557 12.148 4.42773 10.8418 4.42773C7.52809 4.42773 4.8418 7.11403 4.8418 10.4277C4.8418 13.7414 7.52809 16.4277 10.8418 16.4277C14.1555 16.4277 16.8418 13.7414 16.8418 10.4277C16.8418 10.0135 16.506 9.67773 16.0918 9.67773C15.6776 9.67773 15.3418 10.0135 15.3418 10.4277C15.3418 12.913 13.3271 14.9277 10.8418 14.9277C8.35652 14.9277 6.3418 12.913 6.3418 10.4277Z" fill="#1250DC"></path></svg>
                    </Link>
                </div>
                <ul className="suggestions-list">
                    {suggestedProducts.map(product => (
                        <li key={product.id}>
                            <Link to={product.link} className="suggestion-item">
                                <img src={product.image} alt={product.title} />
                                <span>{product.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchContent;