import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography, List, Avatar, Progress, Space, Select, DatePicker, Spin, Empty } from 'antd';
import {
    DollarOutlined, CheckCircleOutlined, UserAddOutlined, BellOutlined,
    FireOutlined, WarningOutlined, CreditCardOutlined, GiftOutlined, RobotOutlined, StarOutlined
} from '@ant-design/icons';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar, RadialBarChart, RadialBar
} from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// ==========================================
// 1. INTERFACE DỮ LIỆU TỪ API (Ánh xạ từ Database)
// ==========================================
interface DashboardData {
    overview: {
        totalRevenue: number;       // Từ bảng orders (DELIVERED) + payments
        completedOrders: number;    // Từ bảng orders
        newUsers: number;           // Từ bảng users
        pendingTasks: number;       // Từ bảng chat_messages (is_read=0) + product_comments (PENDING)
    };
    revenueTrends: { date: string; revenue: number; orders: number }[];
    paymentMethods: { name: string; value: number; color: string }[]; // Từ bảng payments
    topProducts: { id: number; name: string; variant: string; sold: number; image: string; revenue: number }[]; // Nối bảng order_items + product_variants
    lowStockVariants: { sku: string; name: string; variant: string; stock: number; image: string }[]; // Từ product_variants
    topBrands: { name: string; revenue: number; fill: string }[]; // Nối bảng brands + order_items
    activeVouchers: { code: string; used: number; limit: number; expiry: string }[]; // Từ bảng vouchers
    supportStats: { chatbotHandled: number; humanHandled: number; avgRating: number }; // Từ chatbot_interactions + chat_messages + product_comments
}

const formatVND = (value: number | string) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));

// ==========================================
// 2. COMPONENT CHÍNH
// ==========================================
const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [timeFilter, setTimeFilter] = useState<string>('this_month');
    const getAuthToken = () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user).token : '';
    };
    // ==========================================
    // 3. GIẢ LẬP GỌI API THEO FILTER
    // ==========================================

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Gọi API thật
                const response = await fetch(`http://localhost:8080/api/admin/dashboard?time=${timeFilter}`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${getAuthToken()}` 
                    }
                });

                const json = await response.json();

                // Kiểm tra status từ server trả về
                if (response.ok && json.status === 'success') {
                    setData(json.data); // Cập nhật state bằng dữ liệu thật
                } else {
                    console.error("Lỗi từ server:", json.message);
                    // Có thể thêm message.error(json.message) của Antd ở đây nếu muốn báo lỗi lên UI
                }
            } catch (error) {
                console.error("Lỗi kết nối khi tải dữ liệu Dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [timeFilter]); // Gọi lại API mỗi khi timeFilter thay đổi

    // ==========================================
    // 4. RENDER GIAO DIỆN
    // ==========================================
    return (
        <div style={{ paddingBottom: 24, backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '24px' }}>
            
            {/* --- HEADER & BỘ LỌC THỜI GIAN --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0 }}>Trung tâm điều hành</Title>
                    <Text type="secondary">Tổng quan hoạt động kinh doanh và vận hành hệ thống</Text>
                </div>
                <Space>
                    {timeFilter === 'custom' && <RangePicker />}
                    <Select value={timeFilter} onChange={setTimeFilter} style={{ width: 160 }} size="large">
                        <Option value="today">Hôm nay</Option>
                        <Option value="this_week">Tuần này</Option>
                        <Option value="this_month">Tháng này</Option>
                        <Option value="this_year">Năm nay</Option>
                        <Option value="custom">Tùy chỉnh...</Option>
                    </Select>
                </Space>
            </div>

            <Spin spinning={isLoading} tip="Đang đồng bộ dữ liệu hệ thống...">
                {/* --- ROW 1: 4 THẺ KPI CHÍNH --- */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Statistic title="Doanh thu hợp lệ (Đã thanh toán)" value={data?.overview.totalRevenue || 0} formatter={(v) => formatVND(v as number)} valueStyle={{ color: '#3f8600', fontWeight: 'bold' }} prefix={<DollarOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Statistic title="Đơn hàng hoàn tất" value={data?.overview.completedOrders || 0} valueStyle={{ color: '#1890ff', fontWeight: 'bold' }} prefix={<CheckCircleOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Statistic title="Khách hàng đăng ký mới" value={data?.overview.newUsers || 0} valueStyle={{ color: '#722ed1', fontWeight: 'bold' }} prefix={<UserAddOutlined />} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Statistic title="Công việc chờ xử lý (Chat & Đánh giá)" value={data?.overview.pendingTasks || 0} valueStyle={{ color: '#cf1322', fontWeight: 'bold' }} prefix={<BellOutlined />} />
                        </Card>
                    </Col>
                </Row>

                {/* --- ROW 2: BIỂU ĐỒ DOANH THU & PHƯƠNG THỨC THANH TOÁN --- */}
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    <Col xs={24} lg={16}>
                        <Card title="Xu hướng Doanh thu & Lượng đơn hàng" bordered={false} style={{ borderRadius: 12, height: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            {data?.revenueTrends && data.revenueTrends.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={data.revenueTrends} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                        {/* Trục Y trái cho Doanh thu */}
                                        <YAxis yAxisId="left" tickFormatter={(v) => `${v / 1000000}Tr`} axisLine={false} tickLine={false} />
                                        {/* Trục Y phải cho Đơn hàng */}
                                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                                        <RechartsTooltip formatter={(value: number, name: string) => name === 'revenue' ? formatVND(value) : value} />
                                        <Legend />
                                        <Line yAxisId="left" name="Doanh thu (VNĐ)" type="monotone" dataKey="revenue" stroke="#1890ff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                        <Line yAxisId="right" name="Số đơn hàng" type="monotone" dataKey="orders" stroke="#52c41a" strokeWidth={3} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : <Empty description="Không có dữ liệu giao dịch" style={{ marginTop: 60 }} />}
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title={<><CreditCardOutlined /> Tỷ trọng Thanh toán</>} bordered={false} style={{ borderRadius: 12, height: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie data={data?.paymentMethods || []} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                                        {data?.paymentMethods?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                    <RechartsTooltip formatter={(val: number) => `${val}%`} />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>

                {/* --- ROW 3: SẢN PHẨM & KHO HÀNG --- */}
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    {/* Cột 1: Top Sản phẩm */}
                    <Col xs={24} xl={10}>
                        <Card title={<><FireOutlined style={{ color: '#ff4d4f' }}/> Top Sản phẩm bán chạy</>} bordered={false} style={{ borderRadius: 12, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={data?.topProducts || []}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <div style={{ position: 'relative' }}>
                                                    <Avatar size={50} src={item.image} style={{ background: '#f5f5f5' }} />
                                                    <div style={{ position: 'absolute', top: -8, left: -8, background: index < 3 ? '#ff4d4f' : '#d9d9d9', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 12, fontWeight: 'bold' }}>
                                                        {index + 1}
                                                    </div>
                                                </div>
                                            }
                                            title={<Text strong>{item.name}</Text>}
                                            description={<Text type="secondary">{item.variant}</Text>}
                                        />
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>Đã bán: {item.sold}</div>
                                            <Text type="secondary" style={{ fontSize: 12 }}>{formatVND(item.revenue)}</Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* Cột 2: Cảnh báo tồn kho */}
                    <Col xs={24} xl={6}>
                        <Card title={<><WarningOutlined style={{ color: '#faad14' }}/> Cần nhập hàng gấp</>} bordered={false} style={{ borderRadius: 12, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <List
                                itemLayout="horizontal"
                                dataSource={data?.lowStockVariants || []}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text strong>{item.name}</Text>}
                                            description={
                                                <>
                                                    <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>{item.variant}</Text>
                                                    <Text type="secondary" style={{ fontSize: 11 }}>SKU: {item.sku}</Text>
                                                </>
                                            }
                                        />
                                        <Tag color={item.stock === 0 ? 'error' : 'warning'}>Còn: {item.stock}</Tag>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* Cột 3: Top Thương hiệu */}
                    <Col xs={24} xl={8}>
                        <Card title="Doanh thu theo thương hiệu" bordered={false} style={{ borderRadius: 12, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={data?.topBrands || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis tickFormatter={(v) => `${v / 1000000}Tr`} axisLine={false} tickLine={false} />
                                    <RechartsTooltip formatter={(v: number) => formatVND(v)} cursor={{fill: 'transparent'}}/>
                                    <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={40}>
                                        {data?.topBrands?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>

                {/* --- ROW 4: MARKETING & CSKH --- */}
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                    {/* Cột 1: Vouchers */}
                    <Col xs={24} lg={12}>
                        <Card title={<><GiftOutlined /> Hiệu suất Mã giảm giá (Vouchers)</>} bordered={false} style={{ borderRadius: 12, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                {data?.activeVouchers?.map(v => {
                                    const percent = Math.round((v.used / v.limit) * 100);
                                    let statusColor: "success" | "normal" | "exception" = "normal";
                                    if (percent >= 90) statusColor = "exception"; // Sắp hết lượt
                                    else if (percent >= 50) statusColor = "success";

                                    return (
                                        <div key={v.code}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <Space>
                                                    <Text strong>{v.code}</Text>
                                                    <Tag color="default" style={{ fontSize: 10 }}>HSD: {new Date(v.expiry).toLocaleDateString('vi-VN')}</Tag>
                                                </Space>
                                                <Text type="secondary">{v.used} / {v.limit}</Text>
                                            </div>
                                            <Progress percent={percent} status={statusColor} strokeWidth={8} />
                                        </div>
                                    )
                                })}
                            </Space>
                        </Card>
                    </Col>

                    {/* Cột 2: Hiệu năng CSKH & AI */}
                    <Col xs={24} lg={12}>
                        <Card title={<><RobotOutlined /> Hiệu quả CSKH & Trợ lý ảo AI</>} bordered={false} style={{ borderRadius: 12, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <Row align="middle" justify="center" style={{ height: '100%' }}>
                                <Col span={10} style={{ textAlign: 'center' }}>
                                    {/* Tính phần trăm AI đỡ tải */}
                                    <Progress 
                                        type="dashboard" 
                                        percent={data?.supportStats ? Math.round((data.supportStats.chatbotHandled / (data.supportStats.chatbotHandled + data.supportStats.humanHandled)) * 100) : 0} 
                                        strokeColor="#722ed1" 
                                        size={130} 
                                    />
                                    <div style={{ marginTop: 8 }}><Text strong>Tỷ lệ AI tự phục vụ</Text></div>
                                </Col>
                                <Col span={14}>
                                    <Space direction="vertical" size="middle" style={{ width: '100%', paddingLeft: 20 }}>
                                        <div>
                                            <Text type="secondary">Bot AI đã giải quyết:</Text>
                                            <div style={{ fontSize: 18, fontWeight: 'bold', color: '#722ed1' }}>{data?.supportStats.chatbotHandled} tin nhắn</div>
                                        </div>
                                        <div>
                                            <Text type="secondary">Nhân viên xử lý (Human):</Text>
                                            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{data?.supportStats.humanHandled} tin nhắn</div>
                                        </div>
                                        <div style={{ marginTop: 10, padding: '8px 12px', background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 8 }}>
                                            <Space>
                                                <StarOutlined style={{ color: '#faad14' }} />
                                                <Text strong>Đánh giá SP trung bình:</Text>
                                                <Text style={{ fontSize: 16, color: '#faad14', fontWeight: 'bold' }}>{data?.supportStats.avgRating} / 5.0</Text>
                                            </Space>
                                        </div>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            </Spin>
        </div>
    );
};

export default Dashboard;