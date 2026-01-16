import React from 'react';
import './ProductList.css';
import { useCompare } from '../../../contexts/CompareContext';
// --- Import kiểu dữ liệu Product ---
import {type Product } from '../ProductCard/ProductCard';
// --- Import Component ProductCard ---
import ProductCard from '../ProductCard/ProductCard';
// --- Dữ liệu giả lập (Mock Data - lấy từ nội dung bạn gửi) ---


import { useState } from 'react';

// --- SVG Icons (Lấy từ HTML bạn gửi) ---
const NFCIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="#1250DC" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.8297 3.08681C13.9391 3.1962 14.0005 3.34455 14.0005 3.49922C14.0005 3.6539 13.9391 3.80225 13.8297 3.91164L8.28806 9.45331C8.17867 9.56267 8.03032 9.6241 7.87564 9.6241C7.72096 9.6241 7.57262 9.56267 7.46323 9.45331L4.95898 6.94906L0.996394 10.9116C0.886376 11.0179 0.739025 11.0767 0.586077 11.0754C0.433129 11.074 0.286822 11.0127 0.178667 10.9045C0.0705122 10.7964 0.00916363 10.6501 0.00783455 10.4971C0.00650547 10.3442 0.0653022 10.1968 0.171561 10.0868L4.54656 5.71181C4.65595 5.60245 4.8043 5.54102 4.95898 5.54102C5.11366 5.54102 5.262 5.60245 5.37139 5.71181L7.87564 8.21606L13.0049 3.08681C13.1143 2.97745 13.2626 2.91602 13.4173 2.91602C13.572 2.91602 13.7203 2.97745 13.8297 3.08681Z" fill="inherit"></path>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.33594 3.49935C9.33594 3.34464 9.3974 3.19627 9.50679 3.08687C9.61619 2.97747 9.76456 2.91602 9.91927 2.91602H13.4193C13.574 2.91602 13.7224 2.97747 13.8317 3.08687C13.9411 3.19627 14.0026 3.34464 14.0026 3.49935V6.99935C14.0026 7.15406 13.9411 7.30243 13.8317 7.41183C13.7224 7.52122 13.574 7.58268 13.4193 7.58268C13.2646 7.58268 13.1162 7.52122 13.0068 7.41183C12.8974 7.30243 12.8359 7.15406 12.8359 6.99935V4.08268H9.91927C9.76456 4.08268 9.61619 4.02122 9.50679 3.91183C9.3974 3.80243 9.33594 3.65406 9.33594 3.49935Z" fill="inherit"></path>
  </svg>
);

const CheckArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="#090D14"></path>
  </svg>
);

// --- Dữ liệu Mock ---
const TRENDS = [
  { label: 'NFC', icon: <NFCIcon /> },
  { label: 'Pin trâu: trên 5500 mAh', icon: <NFCIcon /> }, // Tái sử dụng icon demo
  { label: '5G', icon: <NFCIcon /> },
];

const SORT_OPTIONS = [
  { id: 'featured', label: 'Nổi bật' },
  { id: 'price_asc', label: 'Giá tăng dần' },
  { id: 'price_desc', label: 'Giá giảm dần' },
  { id: 'installment', label: 'Trả góp 0%' },
];

const PRODUCTS: Product[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max 256GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png',
    price: 37690000,
    originalPrice: 37990000,
    discountNote: 'Giảm 300.000đ',
    installmentText: 'Trả góp 0%',
    specs: [
      { icon: 'https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg', label: 'Màn hình 6.9"', subLabel: 'cực lớn' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_metal_439a7cab32.svg', label: 'Thiết kế', subLabel: 'nguyên khối' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'A19 Pro', subLabel: 'tản nhiệt hơi' },
    ],
    colors: [{ hex: '#FA8C4A' }, { hex: '#404555' }, { hex: '#EDEDEB' }],
    variants: [{ label: '256 GB', active: true }, { label: '512 GB' }, { label: '1 TB' }, { label: '2 TB' }],
    promotions: [
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg'
    ],
    promotionText: 'Chủ thẻ MB Bank MasterCard: Giảm 10% tối đa 500,000đ'
  },
  {
    id: 'samsung-z-fold7',
    name: 'Samsung Galaxy Z Fold7 5G 12GB 256GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/samsung_galaxy_z_fold7_xanh_1_f38c49efb2.png',
    price: 40590000,
    originalPrice: 46990000,
    discountNote: 'Giảm 6.400.000đ',
    installmentText: 'Trả góp 0%',
    specs: [
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_mobile_fold_d73c89b64d.svg', label: 'Màn hình 8"', subLabel: 'Dynamic 2X' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_cam_a9461d9c4e.svg', label: 'Camera AI', subLabel: '200MP' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'Snapdragon', subLabel: '8 Elite' },
    ],
    colors: [{ hex: '#BBB9B9' }, { hex: '#0A0A0A' }, { hex: '#144D91' }],
    variants: [{ label: '256 GB', active: true }, { label: '512 GB' }],
    promotions: [
        'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png',
        'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-Kredivo-1744348489666.png'
    ],
    promotionText: 'Giảm 5% tối đa 200.000đ Hoặc Giảm 50% qua Kredivo'
  },
  {
    id: 'oppo-reno15-f',
    name: 'OPPO Reno15 F 5G 8GB 256GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/oppo_reno15_f_xanh_5_a866ea3714.png',
    price: 11990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_star_e5ff235795.svg', label: 'Thiết kế', subLabel: 'Mưa Sao băng' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_9e90c55554.svg', label: 'Pin', subLabel: '7000 mAh' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_water_resistant_f2193d2539.svg', label: 'Kháng nước', subLabel: 'IP69' },
    ],
    colors: [{ hex: '#3F4A5D' }, { hex: '#F9E9E9' }, { hex: '#D3DFF4' }],
    variants: [],
    promotions: ['https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png'],
    promotionText: 'Giảm 800.000đ khi thanh toán qua thẻ Visa SCB.'
  },
  {
    id: 'xiaomi-redmi-note-15',
    name: 'Xiaomi Redmi Note 15 6GB 128GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_redmi_note_15_xanh_1935de8379.png',
    price: 5990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'MediaTek', subLabel: 'G100-Ultra' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg', label: '6000 mAh', subLabel: '' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_guarantee_a8a3e794bf.svg', label: 'Chống va đập', subLabel: '1.8m' },
    ],
    colors: [{ hex: '#A4ABC0' }, { hex: '#201E1E' }, { hex: '#A2B6C4' }],
    variants: [],
    promotions: [],
    promotionText: ''
  },
  {
    id: 'xiaomi-redmi-note-15-1',
    name: 'Xiaomi Redmi Note 15 6GB 128GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_redmi_note_15_xanh_1935de8379.png',
    price: 5990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'MediaTek', subLabel: 'G100-Ultra' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg', label: '6000 mAh', subLabel: '' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_guarantee_a8a3e794bf.svg', label: 'Chống va đập', subLabel: '1.8m' },
    ],
    colors: [{ hex: '#A4ABC0' }, { hex: '#201E1E' }, { hex: '#A2B6C4' }],
    variants: [],
    promotions: [],
    promotionText: ''
  },
  {
    id: 'xiaomi-redmi-note-15-2',
    name: 'Xiaomi Redmi Note 15 6GB 128GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_redmi_note_15_xanh_1935de8379.png',
    price: 5990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'MediaTek', subLabel: 'G100-Ultra' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg', label: '6000 mAh', subLabel: '' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_guarantee_a8a3e794bf.svg', label: 'Chống va đập', subLabel: '1.8m' },
    ],
    colors: [{ hex: '#A4ABC0' }, { hex: '#201E1E' }, { hex: '#A2B6C4' }],
    variants: [],
    promotions: [],
    promotionText: ''
  },
  {
    id: 'xiaomi-redmi-note-15-3',
    name: 'Xiaomi Redmi Note 15 6GB 128GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_redmi_note_15_xanh_1935de8379.png',
    price: 5990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'MediaTek', subLabel: 'G100-Ultra' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg', label: '6000 mAh', subLabel: '' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_guarantee_a8a3e794bf.svg', label: 'Chống va đập', subLabel: '1.8m' },
    ],
    colors: [{ hex: '#A4ABC0' }, { hex: '#201E1E' }, { hex: '#A2B6C4' }],
    variants: [],
    promotions: [],
    promotionText: ''
  },
  {
    id: 'xiaomi-redmi-note-15-4',
    name: 'Xiaomi Redmi Note 15 6GB 128GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/xiaomi_redmi_note_15_xanh_1935de8379.png',
    price: 5990000,
    installmentText: 'Trả góp 0%',
    specs: [
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'MediaTek', subLabel: 'G100-Ultra' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_battery_charge_c0e32235b5.svg', label: '6000 mAh', subLabel: '' },
        { icon: 'https://cdn2.fptshop.com.vn/svg/ic_guarantee_a8a3e794bf.svg', label: 'Chống va đập', subLabel: '1.8m' },
    ],
    colors: [{ hex: '#A4ABC0' }, { hex: '#201E1E' }, { hex: '#A2B6C4' }],
    variants: [],
    promotions: [],
    promotionText: ''
  },{
  id: 'iphone-17-pro-max-2',
    name: 'iPhone 17 Pro Max 256GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png',
    price: 37690000,
    originalPrice: 37990000,
    discountNote: 'Giảm 300.000đ',
    installmentText: 'Trả góp 0%',
    specs: [
      { icon: 'https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg', label: 'Màn hình 6.9"', subLabel: 'cực lớn' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_metal_439a7cab32.svg', label: 'Thiết kế', subLabel: 'nguyên khối' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'A19 Pro', subLabel: 'tản nhiệt hơi' },
    ],
    colors: [{ hex: '#FA8C4A' }, { hex: '#404555' }, { hex: '#EDEDEB' }],
    variants: [{ label: '256 GB', active: true }, { label: '512 GB' }, { label: '1 TB' }, { label: '2 TB' }],
    promotions: [
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg'
    ],
    promotionText: 'Chủ thẻ MB Bank MasterCard: Giảm 10% tối đa 500,000đ'
  },
  {
  id: 'iphone-17-pro-max-3',
    name: 'iPhone 17 Pro Max 256GB',
    image: 'https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png',
    price: 37690000,
    originalPrice: 37990000,
    discountNote: 'Giảm 300.000đ',
    installmentText: 'Trả góp 0%',
    specs: [
      { icon: 'https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg', label: 'Màn hình 6.9"', subLabel: 'cực lớn' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_metal_439a7cab32.svg', label: 'Thiết kế', subLabel: 'nguyên khối' },
      { icon: 'https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg', label: 'A19 Pro', subLabel: 'tản nhiệt hơi' },
    ],
    colors: [{ hex: '#FA8C4A' }, { hex: '#404555' }, { hex: '#EDEDEB' }],
    variants: [{ label: '256 GB', active: true }, { label: '512 GB' }, { label: '1 TB' }, { label: '2 TB' }],
    promotions: [
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-zalopay-1746679378243.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-scb-1760973429023.png',
      'https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg'
    ],
    promotionText: 'Chủ thẻ MB Bank MasterCard: Giảm 10% tối đa 500,000đ'
  }
];

// 1. Định nghĩa Interface Props
interface ProductListProps {
  onOpenFilter?: () => void; // Hàm này sẽ được truyền từ cha xuống
}
import MobileFilterBar from "../../Fillter/FilterBar/FilterBar"; 
const ProductList: React.FC<ProductListProps> = ({ onOpenFilter }) => {
  const [activeSort, setActiveSort] = useState<string>('featured');
  const { addToCompare } = useCompare();
  const handleCompare = (product: Product) => {
    addToCompare(product);
  };
  return (
    <div className="product-list-container">
      
      {/* 1. THANH XU HƯỚNG (TREND) */}
      <div className="trend-wrapper">
        <span className="trend-label">Xu hướng:</span>
        {TRENDS.map((trend, index) => (
          <div key={index} className="trend-item">
            {trend.icon}
            <span>{trend.label}</span>
          </div>
        ))}
      </div>

      {/* 2. THANH SẮP XẾP (SORT BAR) */}
      <div className="sort-bar-container">
        <p className="result-count">Tìm thấy <strong>157</strong> kết quả</p>
         <MobileFilterBar onOpenFilter={onOpenFilter || (() => {})} />
        <div className="sort-options">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`sort-btn ${activeSort === option.id ? 'active' : ''}`}
              onClick={() => setActiveSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. LƯỚI SẢN PHẨM (GRID) */}
      <div className="product-grid">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} onCompare={handleCompare} />
        ))}
      </div>

      {/* 4. NÚT XEM THÊM (LOAD MORE) */}
      <div className="load-more-container">
        <button className="btn-load-more">
          Xem thêm 133 kết quả
          <CheckArrowIcon />
        </button>
      </div>

    </div>
  );
};

export default ProductList;