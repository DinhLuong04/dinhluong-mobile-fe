import React from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography, List, Avatar, Progress, Space } from 'antd';
import {
    DollarOutlined, ShoppingCartOutlined, AppstoreOutlined,
    WarningOutlined, MessageOutlined, RobotOutlined, GiftOutlined, FireOutlined
} from '@ant-design/icons';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

const { Title, Text } = Typography;

// ==========================================
// 1. DỮ LIỆU MOCK (Dựa theo DB của bạn)
// ==========================================
const revenueData = [
    { name: 'T1', revenue: 45000000 }, { name: 'T2', revenue: 52000000 },
    { name: 'T3', revenue: 38000000 }, { name: 'T4', revenue: 65000000 },
    { name: 'T5', revenue: 72000000 }, { name: 'T6', revenue: 89000000 },
];

const orderStatusData = [
    { name: 'Đã giao', value: 400, color: '#52c41a' },
    { name: 'Đang giao', value: 150, color: '#1890ff' },
    { name: 'Chờ xử lý', value: 80, color: '#faad14' },
    { name: 'Đã hủy', value: 30, color: '#f5222d' },
];

const topBrandsData = [
    { name: 'Apple', sales: 1250, fill: '#000000' },
    { name: 'Samsung', sales: 980, fill: '#1428A0' },
    { name: 'Xiaomi', sales: 600, fill: '#FF6700' },
    { name: 'Oppo', sales: 450, fill: '#046A38' },
];

const voucherData = [
    { code: 'GIAM1Trieu', used: 85, limit: 100, color: 'success' },
    { code: 'FREESHIP', used: 4200, limit: 5000, color: 'normal' },
    { code: 'NEWBIE', used: 450, limit: 500, color: 'exception' }, // Sắp hết
];

const lowStockProducts = [
    { id: 1, name: 'iPhone 15 Pro Max', variant: '256GB - Titan', stock: 2, image: '📱' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', variant: '512GB - Xám', stock: 5, image: '📱' },
    { id: 3, name: 'Ốp lưng MagSafe', variant: 'Trong suốt', stock: 0, image: '🛡️' },
];

const recentOrders = [
    { key: '1', id: '#ORD001', customer: 'Nguyễn Văn A', total: 12500000, status: 'PENDING', payment: 'COD' },
    { key: '2', id: '#ORD002', customer: 'Trần Thị B', total: 2490000, status: 'PROCESSING', payment: 'VNPAY' },
    { key: '3', id: '#ORD003', customer: 'Lê Hoàng C', total: 8500000, status: 'SHIPPED', payment: 'MOMO' },
    { key: '4', id: '#ORD004', customer: 'Phạm D', total: 15400000, status: 'DELIVERED', payment: 'VNPAY' },
];

const formatVND = (value: number | string) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));

// ==========================================
// 2. COMPONENT CHÍNH
// ==========================================
const Dashboard: React.FC = () => {
    const columns = [
        { title: 'Mã ĐH', dataIndex: 'id', key: 'id', fontWeight: 'bold' },
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Tổng tiền', dataIndex: 'total', key: 'total', render: (val: number) => <b>{formatVND(val)}</b> },
        { title: 'Thanh toán', dataIndex: 'payment', key: 'payment', render: (val: string) => <Tag>{val}</Tag> },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render: (status: string) => {
                const colorMap: Record<string, string> = { PENDING: 'orange', PROCESSING: 'cyan', SHIPPED: 'blue', DELIVERED: 'green', CANCELLED: 'red' };
                return <Tag color={colorMap[status]}>{status}</Tag>;
            },
        },
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <Title level={3} style={{ marginTop: 0, marginBottom: 24 }}>Bảng điều khiển kinh doanh</Title>

            {/* --- ROW 1: 4 THẺ KPI CHÍNH --- */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Statistic title="Doanh thu (Tháng)" value={89000000} formatter={(v) => formatVND(v as number)} valueStyle={{ color: '#3f8600', fontWeight: 'bold' }} prefix={<DollarOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Statistic title="Đơn hàng chờ xử lý" value={80} valueStyle={{ color: '#faad14', fontWeight: 'bold' }} prefix={<ShoppingCartOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Statistic title="Cần hỗ trợ (Chat & Đánh giá)" value={20} valueStyle={{ color: '#f5222d', fontWeight: 'bold' }} prefix={<MessageOutlined />} suffix="mục" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Statistic title="Cảnh báo tồn kho" value={3} valueStyle={{ color: '#722ed1', fontWeight: 'bold' }} prefix={<WarningOutlined />} suffix="mã" />
                    </Card>
                </Col>
            </Row>

            {/* --- ROW 2: BIỂU ĐỒ DOANH THU & TRẠNG THÁI ĐƠN HÀNG --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card title={<><DollarOutlined /> Xu hướng Doanh thu</>} bordered={false} style={{ borderRadius: 10, height: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis tickFormatter={(v) => `${v / 1000000}Tr`} axisLine={false} tickLine={false} />
                                <RechartsTooltip formatter={(v: number) => formatVND(v)} />
                                <Line type="monotone" dataKey="revenue" stroke="#1890ff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                
                <Col xs={24} lg={8}>
                    <Card title={<><AppstoreOutlined /> Trạng thái đơn hàng</>} bordered={false} style={{ borderRadius: 10, height: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie data={orderStatusData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* --- ROW 3: WIDGET NÂNG CAO (Thương hiệu, Voucher, Chatbot) --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={8}>
                    <Card title={<><FireOutlined /> Top Thương hiệu bán chạy</>} bordered={false} style={{ borderRadius: 10, height: 350, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={topBrandsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                                <RechartsTooltip />
                                <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={20}>
                                    {topBrandsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title={<><GiftOutlined /> Hiệu suất Mã giảm giá (Vouchers)</>} bordered={false} style={{ borderRadius: 10, height: 350, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Space direction="vertical" size="large" style={{ width: '100%', marginTop: 10 }}>
                            {voucherData.map(v => (
                                <div key={v.code}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text strong>{v.code}</Text>
                                        <Text type="secondary">{v.used} / {v.limit}</Text>
                                    </div>
                                    <Progress 
                                        percent={Math.round((v.used / v.limit) * 100)} 
                                        status={v.color as any} 
                                        strokeWidth={10} 
                                    />
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title={<><RobotOutlined /> Tỷ lệ xử lý của Chatbot AI</>} bordered={false} style={{ borderRadius: 10, height: 350, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Progress type="dashboard" percent={85} strokeColor="#722ed1" size={150} />
                            <Title level={4} style={{ marginTop: 16 }}>Đỡ tải 85% CSKH</Title>
                            <Text type="secondary">Bot đã tự động trả lời 1,200/1,410 tin nhắn trong tháng này mà không cần Admin.</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* --- ROW 4: ĐƠN HÀNG MỚI & CẢNH BÁO TỒN KHO --- */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card title="Đơn hàng cần xử lý" bordered={false} style={{ borderRadius: 10, height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Table columns={columns} dataSource={recentOrders} pagination={false} size="small" />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Sản phẩm sắp hết hàng" bordered={false} style={{ borderRadius: 10, height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={lowStockProducts}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ background: '#f0f2f5' }}>{item.image}</Avatar>}
                                        title={<Text strong>{item.name}</Text>}
                                        description={item.variant}
                                    />
                                    <div style={{ textAlign: 'right' }}>
                                        <Text type={item.stock === 0 ? 'danger' : 'warning'} strong>
                                            Còn: {item.stock}
                                        </Text>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;