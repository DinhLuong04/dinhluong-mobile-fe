import React from 'react';
// 1. Phải import useNavigate từ react-router-dom
import { useNavigate } from 'react-router-dom'; 

// 2. Thêm chữ "export" ở đầu để các component khác có thể dùng
export const BackToHomeButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      type="button" 
      onClick={() => navigate('/')} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: 'none', 
        border: 'none', 
        color: '#666', 
        cursor: 'pointer', 
        fontSize: '14px', 
        padding: '0',
        marginBottom: '20px',
        fontWeight: '500',
        transition: 'color 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.color = '#cb1c22'}
      onMouseOut={(e) => e.currentTarget.style.color = '#666'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      Quay lại trang chủ
    </button>
  );
};