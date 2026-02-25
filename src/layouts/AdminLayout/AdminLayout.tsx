import React, { useState } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
    TagsOutlined,
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
    LogoutOutlined,
    GiftOutlined,
    CommentOutlined,
    RobotOutlined,
    BellOutlined,
    ProfileOutlined,
    ControlOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth(); // Dùng hàm logout của bạn
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    // Thông tin admin (lấy từ localStorage hoặc AuthContext)
    const userStr = localStorage.getItem('user');
    const adminUser = userStr ? JSON.parse(userStr) : { name: 'Admin', avatar: '' };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // --- CẤU TRÚC MENU DỰA TRÊN DATABASE ---
    const menuItems = [
        { key: '/admin', icon: <DashboardOutlined />, label: 'Tổng quan' },
        
        {
            key: 'sales',
            icon: <ShoppingCartOutlined />,
            label: 'Quản lý Bán hàng',
            children: [
                { key: '/admin/orders', label: 'Đơn hàng (Orders)' },  
                { key: '/admin/payments', label: 'Giao dịch (Payments)' }, // Thêm mới     // Bảng: orders, order_items, payments
                { key: '/admin/vouchers', label: 'Mã giảm giá (Vouchers)' } // Bảng: vouchers, user_vouchers
            ]
        },

        {
            key: 'catalog',
            icon: <AppstoreOutlined />,
            label: 'Quản lý Sản phẩm',
            children: [
                { key: '/admin/products', label: 'Sản phẩm chính' }, 
                { key: '/admin/accessories', label: 'Phụ kiện' },
                { key: '/admin/combos', label: 'Combo Mua kèm' },     // Bảng: products, variants, images, combos
                { key: '/admin/categories', label: 'Danh mục (Categories)' },// Bảng: categories
                { key: '/admin/brands', label: 'Thương hiệu (Brands)' },    // Bảng: brands
                { key: '/admin/specs', label: 'Thuộc tính (Specs)' }        // Bảng: spec_groups, spec_attributes
            ]
        },

        {
            key: 'customers',
            icon: <UserOutlined />,
            label: 'Quản lý Khách hàng',
            children: [
                { key: '/admin/users', label: 'Tài khoản' },                // Bảng: users, roles, addresses
                { key: '/admin/reviews', label: 'Đánh giá & Bình luận' }    // Bảng: product_comments, comment_images
            ]
        },

        {
            key: 'support',
            icon: <MessageOutlined />,
            label: 'Chăm sóc & Hỗ trợ',
            children: [
                { key: '/admin/chat', icon: <MessageOutlined />, label: 'Live Chat' },      // Bảng: chat_messages
                { key: '/admin/chatbot', icon: <RobotOutlined />, label: 'Lịch sử Chatbot' },// Bảng: chatbot_interactions
                { key: '/admin/notifications', icon: <BellOutlined />, label: 'Thông báo' }   // Bảng: notifications
            ]
        },

        { key: '/admin/settings', icon: <SettingOutlined />, label: 'Cài đặt hệ thống' }
    ];

    // Mở sẵn các sub-menu nếu đang ở trang con
    const defaultOpenKeys = ['sales', 'catalog', 'customers', 'support'].filter(key => 
        location.pathname.includes(key) || 
        (key === 'catalog' && (location.pathname.includes('products') || location.pathname.includes('categories') || location.pathname.includes('brands') || location.pathname.includes('specs'))) ||
        (key === 'sales' && (location.pathname.includes('orders') || location.pathname.includes('vouchers'))) ||
        (key === 'customers' && (location.pathname.includes('users') || location.pathname.includes('reviews'))) ||
        (key === 'support' && (location.pathname.includes('chat') || location.pathname.includes('chatbot') || location.pathname.includes('notifications')))
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* --- SIDEBAR --- */}
            <Sider 
                collapsible 
                collapsed={collapsed} 
                onCollapse={(value) => setCollapsed(value)}
                width={250}
                theme="dark"
            >
                <div style={{ 
                    height: 64, margin: '10px 16px', color: 'white', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: collapsed ? '14px' : '18px', fontWeight: 'bold',
                    borderBottom: '1px solid rgba(255,255,255,0.2)'
                }}>
                    {collapsed ? 'DLM' : 'DinhLuongMobile'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={defaultOpenKeys}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>

            {/* --- KHU VỰC CHÍNH --- */}
            <Layout>
                {/* Header */}
                <Header style={{ 
                    padding: '0 24px', background: colorBgContainer, 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)', zIndex: 1 
                }}>
                    <div style={{ fontWeight: '500', fontSize: '16px' }}>
                        Trang quản trị hệ thống
                    </div>

                    <Dropdown 
                        menu={{ 
                            items: [
                                { key: 'profile', icon: <ProfileOutlined />, label: 'Hồ sơ cá nhân' },
                                { type: 'divider' },
                                { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true, onClick: handleLogout }
                            ] 
                        }} 
                        placement="bottomRight"
                    >
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px' }}>
                            <span style={{ fontWeight: '500' }}>{adminUser.name || 'Admin'}</span>
                            <Avatar src={adminUser.avatar} style={{ backgroundColor: '#1890ff' }}>
                                {adminUser.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                            </Avatar>
                        </div>
                    </Dropdown>
                </Header>

                {/* Content */}
                <Content style={{ margin: '24px 16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ 
                        padding: 24, flex: 1, 
                        background: colorBgContainer, borderRadius: borderRadiusLG,
                        overflowY: 'auto' // Thêm scroll nếu nội dung dài
                    }}>
                        {/* Đây là nơi các trang con (Dashboard, Quản lý SP) được render */}
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;