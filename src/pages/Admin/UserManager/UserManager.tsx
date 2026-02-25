import React, { useState, useEffect } from 'react';
import { 
    Table, Tag, Space, Typography, Input, 
    Select, Switch, message, Avatar, Card, Tooltip, 
    Button, Drawer, Descriptions, Row, Col, Statistic, Divider, List
} from 'antd';
import { 
    SearchOutlined, UserOutlined, GoogleOutlined, 
    FacebookOutlined, EyeOutlined, ShoppingCartOutlined, 
    DollarOutlined, CloseCircleOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

// --- CÁC INTERFACE KHỚP VỚI BACKEND DTO ---
interface UserResponse {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    avatarUrl: string;
    authProvider: string;
    roleName: string;
    isEnabled: boolean;
    createdAt: string;
}

interface UserDetailResponse extends UserResponse {
    statistics: {
        totalOrders: number;
        cancelledOrders: number;
        totalSpent: number;
    };
    addresses: {
        id: number;
        receiverName: string;
        receiverPhone: string;
        fullAddress: string;
    }[];
    recentOrders: {
        id: number;
        totalAmount: number;
        status: string;
        createdAt: string;
    }[];
}

const UserManager: React.FC = () => {
    // States cho danh sách
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [searchText, setSearchText] = useState<string>('');

    // States cho Drawer xem chi tiết
    const [detailVisible, setDetailVisible] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<UserDetailResponse | null>(null);
    const [detailLoading, setDetailLoading] = useState<boolean>(false);

    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    // --- FETCH DANH SÁCH USER ---
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = getAuthToken();
            const queryParams = new URLSearchParams();
            if (searchText) queryParams.append('keyword', searchText);
            if (filterStatus !== 'ALL') queryParams.append('isEnabled', filterStatus === 'ACTIVE' ? 'true' : 'false');

            const response = await fetch(`http://localhost:8080/api/admin/users?${queryParams.toString()}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await response.json();
            
            if (response.ok && json.status === 'success') {
                setUsers(json.data);
            } else {
                message.error(json.message);
            }
        } catch (error) {
            message.error("Lỗi kết nối đến máy chủ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filterStatus, searchText]);

    // --- FETCH CHI TIẾT 1 USER ---
    const fetchUserDetail = async (userId: number) => {
        setDetailVisible(true);
        setDetailLoading(true);
        setUserDetail(null); // Reset data cũ
        try {
            const token = getAuthToken();
            // LƯU Ý: Đổi đường dẫn này cho khớp với Endpoint Controller của bạn
            const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await response.json();
            
            if (response.ok && json.status === 'success') {
                setUserDetail(json.data);
            } else {
                message.error(json.message || "Không thể lấy chi tiết user");
                setDetailVisible(false);
            }
        } catch (error) {
            message.error("Lỗi kết nối đến máy chủ");
            setDetailVisible(false);
        } finally {
            setDetailLoading(false);
        }
    };

    // --- TOGGLE TRẠNG THÁI ---
    const handleToggleStatus = async (userId: number, checked: boolean) => {
        try {
            const token = getAuthToken();
            const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/toggle-status`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const json = await response.json();
            if (response.ok && json.status === 'success') {
                message.success(checked ? "Đã mở khóa tài khoản!" : "Đã khóa tài khoản!");
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, isEnabled: checked } : u));
            } else {
                message.error(json.message);
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật trạng thái");
        }
    };

    // --- CẤU HÌNH CỘT CHO BẢNG CHÍNH ---
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: 60, render: (text: number) => <Text type="secondary">#{text}</Text> },
        { 
            title: 'Khách hàng', 
            key: 'user', 
            render: (_: any, record: UserResponse) => (
                <Space>
                    <Avatar src={record.avatarUrl} icon={<UserOutlined />} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong>{record.fullName || 'Chưa cập nhật tên'}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
                    </div>
                </Space>
            )
        },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', render: (text: string) => text || <Text type="secondary">---</Text> },
        { 
            title: 'Loại tài khoản', 
            dataIndex: 'authProvider', 
            key: 'authProvider', 
            render: (provider: string) => {
                if (provider === 'GOOGLE') return <Tag icon={<GoogleOutlined />} color="red">Google</Tag>;
                if (provider === 'FACEBOOK') return <Tag icon={<FacebookOutlined />} color="blue">Facebook</Tag>;
                return <Tag color="default">Mật khẩu</Tag>; 
            }
        },
        { 
            title: 'Trạng thái', 
            key: 'status', 
            align: 'center' as const,
            render: (_: any, record: UserResponse) => (
                <Tooltip title={record.isEnabled ? "Khóa tài khoản này" : "Mở khóa tài khoản"}>
                    <Switch 
                        checked={record.isEnabled} 
                        onChange={(checked) => handleToggleStatus(record.id, checked)}
                        checkedChildren="Hoạt động"
                        unCheckedChildren="Đã khóa"
                        disabled={record.roleName === 'ADMIN'}
                    />
                </Tooltip>
            ) 
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: UserResponse) => (
                <Tooltip title="Xem chi tiết">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<EyeOutlined />} 
                        onClick={() => fetchUserDetail(record.id)}
                    />
                </Tooltip>
            )
        }
    ];

    // --- CẤU HÌNH CỘT CHO BẢNG ĐƠN HÀNG TRONG DRAWER ---
    const orderColumns = [
        { title: 'Mã ĐH', dataIndex: 'id', render: (id: number) => `#${id}` },
        { title: 'Ngày đặt', dataIndex: 'createdAt', render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm') },
        { title: 'Tổng tiền', dataIndex: 'totalAmount', render: (amount: number) => `${amount.toLocaleString()} đ` },
        { title: 'Trạng thái', dataIndex: 'status', render: (status: string) => <Tag color="blue">{status}</Tag> }
    ];

    return (
        <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <Title level={4} style={{ margin: '0 0 20px 0' }}>Quản lý Tài khoản Khách hàng</Title>

            <Card size="small" style={{ marginBottom: 20, background: '#fafafa' }}>
                <Space wrap size="large">
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Tìm kiếm:</Text>
                        <Input.Search 
                            placeholder="Tên, Email, SĐT..." 
                            allowClear 
                            onSearch={(value) => setSearchText(value)} 
                            style={{ width: 250 }} 
                        />
                    </div>
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Trạng thái:</Text>
                        <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 150 }}>
                            <Option value="ALL">Tất cả</Option>
                            <Option value="ACTIVE">Đang hoạt động</Option>
                            <Option value="LOCKED">Bị khóa</Option>
                        </Select>
                    </div>
                </Space>
            </Card>

            <Table 
                columns={columns} 
                dataSource={users} 
                rowKey="id" 
                loading={loading} 
                pagination={{ pageSize: 10 }} 
            />

            {/* DRAWER XEM CHI TIẾT */}
            <Drawer
                title="Chi tiết khách hàng"
                width={720}
                onClose={() => setDetailVisible(false)}
                open={detailVisible}
                loading={detailLoading}
            >
                {userDetail && (
                    <>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card size="small" bordered={false} style={{ background: '#f6ffed' }}>
                                    <Statistic title="Tổng đơn hàng" value={userDetail.statistics?.totalOrders || 0} prefix={<ShoppingCartOutlined />} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card size="small" bordered={false} style={{ background: '#e6f7ff' }}>
                                    <Statistic title="Tổng chi tiêu" value={userDetail.statistics?.totalSpent || 0} suffix="đ" prefix={<DollarOutlined />} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card size="small" bordered={false} style={{ background: '#fff1f0' }}>
                                    <Statistic title="Đơn đã hủy" value={userDetail.statistics?.cancelledOrders || 0} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#cf1322' }} />
                                </Card>
                            </Col>
                        </Row>

                        <Divider />

                        <Descriptions title="Thông tin cá nhân" bordered size="small" column={2}>
                            <Descriptions.Item label="Họ và tên">{userDetail.fullName || '---'}</Descriptions.Item>
                            <Descriptions.Item label="Email">{userDetail.email}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{userDetail.phone || '---'}</Descriptions.Item>
                            <Descriptions.Item label="Ngày đăng ký">{dayjs(userDetail.createdAt).format('DD/MM/YYYY')}</Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <Title level={5}>Sổ địa chỉ</Title>
                        <List
                            size="small"
                            bordered
                            dataSource={userDetail.addresses}
                            locale={{ emptyText: 'Chưa có địa chỉ nào' }}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<Text strong>{item.receiverName} - {item.receiverPhone}</Text>}
                                        description={item.fullAddress}
                                    />
                                </List.Item>
                            )}
                            style={{ marginBottom: 24 }}
                        />

                        <Title level={5}>Đơn hàng gần đây</Title>
                        <Table 
                            size="small"
                            columns={orderColumns} 
                            dataSource={userDetail.recentOrders} 
                            rowKey="id" 
                            pagination={false}
                            locale={{ emptyText: 'Chưa có đơn hàng nào' }}
                        />
                    </>
                )}
            </Drawer>
        </div>
    );
};

export default UserManager;