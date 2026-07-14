import React from 'react';
import './MobileBottomNav.css';
import Notification from '../../Header/BtnUser/Notification/Notification'; 
import { useMobileBottomNav } from './useMobileBottomNav';

interface MobileBottomNavProps {
    unreadNotifCount?: number;
    setUnreadCount?: (count: number) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ unreadNotifCount = 0, setUnreadCount }) => {
    const {
        isNotifOpen, setIsNotifOpen,
        handleUpdateUnreadCount,
        handleNavClick, activeIndex, NAV_ITEMS
    } = useMobileBottomNav(unreadNotifCount, setUnreadCount);

    const icons: Record<string, React.ReactNode> = {
        home: ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none"><path fill="currentColor" fillOpacity="0.1" d="M21 18.342v-7.817c0-1.21-.54-2.357-1.47-3.123l-5-4.118a3.975 3.975 0 0 0-5.06 0l-5 4.118A4.046 4.046 0 0 0 3 10.525v7.817c0 2.227 1.79 4.033 4 4.033h10c2.21 0 4-1.806 4-4.033Z" /><path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M21 18.342v-7.817c0-1.21-.54-2.357-1.47-3.123l-5-4.118a3.975 3.975 0 0 0-5.06 0l-5 4.118A4.046 4.046 0 0 0 3 10.525v7.817c0 2.227 1.79 4.033 4 4.033h10c2.21 0 4-1.806 4-4.033Z" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M10 18.375h4" /></svg> ),
        orders: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 14V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 16.5L18 18.5L22 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
        notification: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/><path d="M18 15V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V15L4 18H20L18 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> ),
        account: ( <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> )
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
                                    {icons[item.id]}
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
                        setUnreadCount={handleUpdateUnreadCount} 
                    />
                </div>
            </div>
        </>
    );
};

export default MobileBottomNav;