// src/components/StickyCompareBar/StickyCompareBar.tsx
import React from 'react';
import './StickyCompareBar.css';
import { useCompare } from '../../contexts/CompareContext'; // Check path

const StickyCompareBar: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, isVisible, toggleCompareVisibility } = useCompare();
  const MAX_SLOTS = 3;

  if (compareList.length === 0) return null;

  return (
    <div className={`compare-bar ${!isVisible ? 'hidden' : ''}`}>
      <div className='container'>
        <button 
          className={`btn-toggle ${!isVisible ? 'collapsed-pill' : ''}`} 
          onClick={toggleCompareVisibility}
        >
          {!isVisible ? (
            <>
              <span className="pill-text">So sánh ({compareList.length})</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.20694 12.2672C3.92125 11.9672 3.93279 11.4925 4.23271 11.2068L9.48318 6.20548C9.77285 5.92955 10.2281 5.92955 10.5178 6.20548L15.7682 11.2068C16.0681 11.4925 16.0797 11.9672 15.794 12.2672C15.5083 12.5671 15.0336 12.5786 14.7336 12.2929L10.0005 7.78434L5.26729 12.2929C4.96737 12.5786 4.49264 12.5671 4.20694 12.2672Z" fill="#ffffff"/>
              </svg>
            </>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon-expanded">
               <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM7.46967 9.96967C7.76256 9.67678 8.23744 9.67678 8.53033 9.96967L12 13.4393L15.4697 9.96967C15.7626 9.67678 16.2374 9.67678 16.5303 9.96967C16.8232 10.2626 16.8232 10.7374 16.5303 11.0303L12.5303 15.0303C12.2374 15.3232 11.7626 15.3232 11.4697 15.0303L7.46967 11.0303C7.17678 10.7374 7.17678 10.2626 7.46967 9.96967Z" fill="#fff"/>
            </svg>
          )}
        </button>

        <div className="compare-inner">
           <div className="product-list">
            {compareList.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-img" />
                <div className="product-name">{product.name}</div>
                <button className="btn-remove" onClick={() => removeFromCompare(product.id)}>✕</button>
              </div>
            ))}
            {[...Array(MAX_SLOTS - compareList.length)].map((_, index) => (
              <div key={`empty-${index}`} className="empty-slot">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="empty-text">Thêm sản phẩm</span>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            <button className="btn btn-clear" onClick={clearCompare}>Xóa tất cả</button>
            <button className="btn btn-compare-1">So sánh ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCompareBar;