import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileBottomNav.css';
import Notification from '../../Header/BtnUser/Notification/Notification'; 

interface MobileBottomNavProps {
    unreadNotifCount?: number;
    setUnreadCount?: (count: number) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ unreadNotifCount = 0, setUnreadCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // 1. THÊM STATE ĐỂ TỰ QUẢN LÝ SỐ LƯỢNG CHƯA ĐỌC
  const [localUnreadCount, setLocalUnreadCount] = useState<number>(unreadNotifCount);

  // 2. GỌI API LẤY SỐ LƯỢNG THÔNG BÁO CHƯA ĐỌC KHI MỚI VÀO WEB
  useEffect(() => {
    const fetchUnreadCount = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        if (!user.token) return;

        try {
            const res = await fetch('http://localhost:8080/api/notifications/unread-count', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const json = await res.json();
            if (json.status === 'success') {
                setLocalUnreadCount(json.data); // Đắp số lượng vào state
                if (setUnreadCount) setUnreadCount(json.data); // Báo lên Component cha nếu cần
            }
        } catch (error) {
            console.error("Lỗi lấy số lượng thông báo:", error);
        }
    };

    fetchUnreadCount();
  }, []);

  const NAV_ITEMS = [
    {
      id: 'home',
      label: 'Trang chủ',
      path: '/',
      badge: 0,
      icon: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none"><path fill="currentColor" fillOpacity="0.1" d="M21 18.342v-7.817c0-1.21-.54-2.357-1.47-3.123l-5-4.118a3.975 3.975 0 0 0-5.06 0l-5 4.118A4.046 4.046 0 0 0 3 10.525v7.817c0 2.227 1.79 4.033 4 4.033h10c2.21 0 4-1.806 4-4.033Z" /><path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M21 18.342v-7.817c0-1.21-.54-2.357-1.47-3.123l-5-4.118a3.975 3.975 0 0 0-5.06 0l-5 4.118A4.046 4.046 0 0 0 3 10.525v7.817c0 2.227 1.79 4.033 4 4.033h10c2.21 0 4-1.806 4-4.033Z" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M10 18.375h4" /></svg> ),
    },
    {
      id: 'orders',
      label: 'Đơn hàng',
      path: '/member/order',
      badge: 0,
      icon: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 14V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 16.5L18 18.5L22 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
    },
    {
      id: 'notification',
      label: 'Thông báo',
      path: '#', 
      badge: localUnreadCount, // 3. SỬ DỤNG STATE localUnreadCount VỪA TẠO
      icon: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/><path d="M18 15V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V15L4 18H20L18 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
    },
    {
      id: 'account',
      label: 'Tài khoản',
      path: '/member',
      badge: 0,
      icon: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
    }
  ];

  let activeIndex = NAV_ITEMS.findIndex(item => {
    if (item.path === '/' && location.pathname === '/') return true;
    if (item.path !== '/' && item.path !== '#' && location.pathname.startsWith(item.path)) return true;
    return false;
  });

  if (activeIndex === -1) {
    activeIndex = 0;
  }

  const handleNavClick = (item: any) => {
    if (item.id === 'notification') {
        setIsNotifOpen(true);
        return;
    }
    navigate(item.path);        
  };

  return (
    <>
        <nav className="mobile-bottom-nav">
          <div className="nav-indicator-wrapper" style={{ left: `${activeIndex * 25}%`, width: '25%' }}>
            <div className="nav-indicator"></div>
          </div>

          <ul className="nav-list">
            {NAV_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-icon-wrapper">
                    {item.icon}
                    {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
                  </div>
                  <span className="nav-item-text">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`bottom-sheet-overlay ${isNotifOpen ? 'open' : ''}`} onClick={() => setIsNotifOpen(false)}></div>
        
        <div className={`bottom-sheet-container ${isNotifOpen ? 'open' : ''}`}>
            <div className="bottom-sheet-header">
                <h3>Thông báo của bạn</h3>
                <button className="bottom-sheet-close" onClick={() => setIsNotifOpen(false)}>✕</button>
            </div>
            <div className="bottom-sheet-content">
                <Notification 
                    onClose={() => setIsNotifOpen(false)} 
                    refreshTrigger={isNotifOpen ? 1 : 0}
                    // 4. BẮT SỰ KIỆN KHI NOTIFICATION COMPONENT CẬP NHẬT TRẠNG THÁI ĐÃ ĐỌC
                    setUnreadCount={(count) => {
                        setLocalUnreadCount(count); // Cập nhật ngay thanh Nav
                        if (setUnreadCount) setUnreadCount(count);
                    }} 
                />
            </div>
        </div>
    </>
  );
};

export default MobileBottomNav;