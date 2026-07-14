import './BtnUser.css';
import { Link } from 'react-router-dom';
import LoginToggle from './LoginToggle/LoginToggle';
import Notification from './Notification/Notification'; 
import { useAuth } from '../../../contexts/AuthContext';
import { Badge } from 'antd';
import { useBtnUser } from './useBtnUser';

const BtnUser = () => {
    const { isLogin, user } = useAuth(); 
    const {
        isUserMenuOpen, setIsUserMenuOpen,
        isNotifOpen, setIsNotifOpen,
        unreadCount, setUnreadCount,
        handleUserToggle, handleNotifToggle
    } = useBtnUser(isLogin, user);

    if (!isLogin) {
        return (
            <Link to="/login" className="inner-btn-user" title="Tài khoản">
                <i className="fa-solid fa-user"></i>
                <span className="user-text desktop-only">Đăng nhập</span>
            </Link> 
        );
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* 🔔 NÚT CHUÔNG THÔNG BÁO */}
            <div className='inner-notification' style={{ position: 'relative' }}>
                <div onClick={handleNotifToggle} style={{ cursor: 'pointer', padding: '5px' }}>
                    <Badge count={unreadCount} overflowCount={99} size="small" offset={[-2, 2]}>
                        <i className="fa-solid fa-bell" style={{ fontSize: '20px', color: '#fff' }}></i>
                    </Badge>
                </div>

                {/* Khung Dropdown Thông báo */}
                {isNotifOpen && (
                    <div style={{ position: 'absolute', top: '40px', right: '-80px', zIndex: 1000, width: '380px' }}>
                        <Notification 
                            onClose={() => setIsNotifOpen(false)} 
                            refreshTrigger={unreadCount} 
                            setUnreadCount={setUnreadCount} 
                        />
                    </div>
                )}
            </div>

            {/* 👤 NÚT TÀI KHOẢN USER */}
            <div className="inner-btn-user" style={{ position: 'relative', margin: 0 }}> 
                <div onClick={handleUserToggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-user" style={{ fontSize: '18px' }}></i>
                    <span className="user-text-login desktop-only">
                        {user?.name || "Khách hàng"}
                    </span>
                </div>
                
                {/* Khung Dropdown Menu User */}
                {isUserMenuOpen && (
                    <div style={{ position: 'absolute', top: '40px', right: '0', zIndex: 1000 }}>
                        <LoginToggle onClose={() => setIsUserMenuOpen(false)} />
                    </div>
                )}
            </div>

        </div>
    );
};

export default BtnUser;