import React, { useState, useEffect } from 'react';
import {
    Table, Tag, Button, Space, Drawer, Descriptions,
    Select, message, Typography, Card, Input, Tabs, Image, List
} from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

// --- Interfaces ---
interface ComboItemDetail { variantId: number; name: string; imageUrl: string; price: number; }
interface OrderItemResponse { id: number; productVariantId: number; productName: string; variantName?: string; imageUrl: string; quantity: number; priceAtPurchase: number; comboItems: ComboItemDetail[]; }
interface OrderDetailResponse {
    id: number; userId: number; totalAmount: number; status: string;
    createdAt: string; receiverName: string; receiverPhone: string; receiverAddress: string;
    paymentMethod: string;  // 🔥 MỚI THÊM
    paymentStatus: string;  // 🔥 MỚI THÊM
    items: OrderItemResponse[];
}
interface ApiResponse<T> { status: string; code: number; message: string; data: T; }

const statusConfig: Record<string, { color: string, label: string }> = {
    PENDING: { color: 'orange', label: 'Chờ xác nhận' },
    PROCESSING: { color: 'blue', label: 'Đang xử lý' },
    SHIPPED: { color: 'cyan', label: 'Đang giao hàng' },
    DELIVERED: { color: 'green', label: 'Giao thành công' },
    RETURNED: { color: 'volcano', label: 'Chuyển hoàn (Bom)' }, // 🔥 BỔ SUNG TRẠNG THÁI NÀY
    CANCELLED: { color: 'red', label: 'Đã hủy' },
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const OrderManager: React.FC = () => {
    const [orders, setOrders] = useState<OrderDetailResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState<string>('ALL');
    const [searchText, setSearchText] = useState<string>('');

    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetailResponse | null>(null);

    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    const fetchOrders = async (status: string, keyword: string) => {
        setLoading(true);
        try {
            const token = getAuthToken();
            const queryParams = new URLSearchParams({ status: status, keyword: keyword }).toString();

            const response = await fetch(`http://localhost:8080/api/admin/orders?${queryParams}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json: ApiResponse<OrderDetailResponse[]> = await response.json();

            if (response.ok && json.status === 'success') {
                setOrders(json.data);
            } else {
                message.error(json.message || "Lỗi khi lấy danh sách đơn hàng");
            }
        } catch (error) {
            message.error("Lỗi kết nối đến máy chủ");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(activeTab, searchText);
    }, [activeTab]);

    const handleSearch = (value: string) => {
        setSearchText(value);
        fetchOrders(activeTab, value);
    };

    const handleUpdateStatus = async (newStatus: string) => {
        if (!selectedOrder) return;
        try {
            const token = getAuthToken();
            const response = await fetch(`http://localhost:8080/api/admin/orders/${selectedOrder.id}/status`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            const json: ApiResponse<any> = await response.json();
            if (response.ok && json.status === 'success') {
                message.success(`Cập nhật đơn hàng thành công!`);
                setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
                setSelectedOrder({ ...selectedOrder, status: newStatus });
                if (activeTab !== 'ALL') {
                    setDrawerVisible(false);
                    fetchOrders(activeTab, searchText);
                }
            } else { message.error(json.message); }
        } catch (error) { message.error("Lỗi kết nối, không thể cập nhật"); }
    };

    // --- CẤU HÌNH TABLE COLUMNS ---
    const columns = [
        { title: 'Mã ĐH', dataIndex: 'id', key: 'id', render: (text: number) => <strong>#{text}</strong> },
        { title: 'Khách hàng', key: 'customer', render: (_: any, record: OrderDetailResponse) => (<div><div>{record.receiverName}</div><Text type="secondary">{record.receiverPhone}</Text></div>) },

        // 🔥 MỚI THÊM: Cột Thanh toán
        {
            title: 'Thanh toán',
            key: 'payment',
            render: (_: any, record: OrderDetailResponse) => (
                <Space direction="vertical" size={0}>
                    <Tag color={record.paymentMethod === 'VNPAY' ? 'blue' : 'default'} style={{ margin: 0 }}>
                        {record.paymentMethod}
                    </Tag>
                    {record.paymentMethod === 'VNPAY' && (
                        <Text type={record.paymentStatus === 'PAID' ? 'success' : 'danger'} style={{ fontSize: '11px', fontWeight: 500 }}>
                            {record.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chưa TT / Lỗi'}
                        </Text>
                    )}
                </Space>
            )
        },

        { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', render: (amount: number) => <Text strong type="danger">{formatCurrency(amount)}</Text> },
        { title: 'Ngày đặt', dataIndex: 'createdAt', key: 'createdAt', render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm') },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (status: string) => {
                const conf = statusConfig[status] || { color: 'default', label: status };
                return <Tag color={conf.color}>{conf.label}</Tag>
            }
        },
        { title: 'Thao tác', key: 'action', render: (_: any, record: OrderDetailResponse) => (<Button type="primary" size="small" icon={<EyeOutlined />} onClick={() => { setSelectedOrder(record); setDrawerVisible(true); }}>Chi tiết</Button>) },
    ];

    const itemColumns = [
        {
            title: 'Sản phẩm', key: 'product',
            render: (_: any, record: OrderItemResponse) => (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Image src={record.imageUrl || 'https://via.placeholder.com/50'} width={50} height={50} style={{ objectFit: 'cover', borderRadius: 4, border: '1px solid #f0f0f0' }} />
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.productName}</div>
                        {record.variantName && <div style={{ fontSize: '12px', color: '#888' }}>Phân loại: {record.variantName}</div>}
                    </div>
                </div>
            )
        },
        { title: 'SL', dataIndex: 'quantity', key: 'quantity', align: 'center' as const },
        { title: 'Đơn giá', dataIndex: 'priceAtPurchase', key: 'priceAtPurchase', render: (price: number) => formatCurrency(price) },
        { title: 'Thành tiền', key: 'total', render: (_: any, record: OrderItemResponse) => <Text strong>{formatCurrency(record.priceAtPurchase * record.quantity)}</Text> },
    ];

    const expandedRowRender = (record: OrderItemResponse) => {
        if (!record.comboItems || record.comboItems.length === 0) return null;
        return (
            <div style={{ padding: '10px 20px', backgroundColor: '#fafafa', borderRadius: 4 }}>
                <List
                    size="small" header={<div style={{ fontWeight: 600, color: '#ff4d4f' }}>🎁 Mua kèm / Quà tặng</div>}
                    dataSource={record.comboItems}
                    renderItem={combo => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image src={combo.imageUrl} width={40} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} />}
                                title={combo.name}
                                description={<span style={{ fontSize: 12 }}>Số lượng: x{record.quantity}</span>}
                            />
                            <div style={{ fontWeight: 500, color: combo.price === 0 ? '#52c41a' : 'inherit' }}>
                                {combo.price === 0 ? 'Tặng kèm' : formatCurrency(combo.price)}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    };

    const tabItems = [
        { key: 'ALL', label: 'Tất cả' },
        { key: 'PENDING', label: 'Chờ xác nhận' },
        { key: 'PROCESSING', label: 'Đang xử lý' },
        { key: 'SHIPPED', label: 'Đang giao' },
        { key: 'RETURNED', label: 'Hoàn hàng (Bom)' },
        { key: 'DELIVERED', label: 'Đã giao' }, { key: 'CANCELLED', label: 'Đã hủy' },
    ];

    return (
        <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Title level={4} style={{ margin: 0 }}>Quản lý Đơn hàng</Title>
                <Input.Search
                    placeholder="Tìm mã ĐH, SĐT, Tên..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
            </div>

            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} style={{ marginBottom: 16 }} />

            <Table columns={columns} dataSource={orders} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />

            <Drawer title={`Chi tiết đơn hàng #${selectedOrder?.id}`} width={750} onClose={() => setDrawerVisible(false)} open={drawerVisible}>
                {selectedOrder && (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Card size="small" title="Cập nhật trạng thái">
                            <Space>
                                <Text>Trạng thái hiện tại:</Text>
                                <Select
                                    value={selectedOrder.status}
                                    style={{ width: 170 }}
                                    onChange={handleUpdateStatus}
                                    // 1. Khóa hẳn ô Select nếu đơn đã ở chu trình cuối (Thành công / Hoàn hàng / Hủy)
                                    disabled={['DELIVERED', 'RETURNED', 'CANCELLED'].includes(selectedOrder.status)}
                                >
                                    {Object.entries(statusConfig).map(([key, val]) => {
                                        // Đánh số thứ tự chu trình
                                        const levels: Record<string, number> = {
                                            PENDING: 1,
                                            PROCESSING: 2,
                                            SHIPPED: 3,
                                            DELIVERED: 4,
                                            RETURNED: 4, // Hoàn hàng cũng là bước cuối (cùng cấp với Đã giao)
                                            CANCELLED: 99
                                        };

                                        const currentLevel = levels[selectedOrder.status] || 0;
                                        const optionLevel = levels[key] || 0;

                                        // 2. Không cho phép chọn lùi trạng thái
                                        const isBackward = optionLevel < currentLevel;

                                        // 3. Xử lý Logic rẽ nhánh tại bước SHIPPED (Bước 3):
                                        // - Nếu đang giao (SHIPPED): KHÔNG cho phép Hủy (CANCELLED), chỉ được Hoàn (RETURNED) hoặc Thành công (DELIVERED)
                                        // - Nếu chưa giao (PENDING/PROCESSING): KHÔNG cho phép Hoàn (RETURNED), chỉ được Hủy (CANCELLED)
                                        const isInvalidCancel = key === 'CANCELLED' && selectedOrder.status === 'SHIPPED';
                                        const isInvalidReturn = key === 'RETURNED' && selectedOrder.status !== 'SHIPPED';

                                        return (
                                            <Option
                                                key={key}
                                                value={key}
                                                disabled={isBackward || isInvalidCancel || isInvalidReturn}
                                            >
                                                {val.label}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Space>
                        </Card>

                        <Descriptions title="Thông tin Đơn hàng" bordered column={1} size="small">
                            <Descriptions.Item label="Người nhận">{selectedOrder.receiverName}</Descriptions.Item>
                            <Descriptions.Item label="Điện thoại">{selectedOrder.receiverPhone}</Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedOrder.receiverAddress}</Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt">{dayjs(selectedOrder.createdAt).format('DD/MM/YYYY HH:mm')}</Descriptions.Item>

                            {/* 🔥 MỚI THÊM: Hàng thanh toán trong Drawer */}
                            <Descriptions.Item label="Thanh toán">
                                <Space>
                                    <Tag color={selectedOrder.paymentMethod === 'VNPAY' ? 'blue' : 'default'} style={{ margin: 0 }}>
                                        {selectedOrder.paymentMethod}
                                    </Tag>
                                    {selectedOrder.paymentMethod === 'VNPAY' && (
                                        <Text strong type={selectedOrder.paymentStatus === 'PAID' ? 'success' : 'danger'}>
                                            ({selectedOrder.paymentStatus === 'PAID' ? 'Đã thu tiền' : 'Chưa thanh toán'})
                                        </Text>
                                    )}
                                </Space>
                            </Descriptions.Item>

                        </Descriptions>

                        <div>
                            <Title level={5}>Sản phẩm đặt mua</Title>
                            <Table
                                columns={itemColumns} dataSource={selectedOrder.items} rowKey="id" pagination={false} size="small"
                                expandable={{
                                    expandedRowRender,
                                    rowExpandable: record => record.comboItems && record.comboItems.length > 0,
                                    defaultExpandAllRows: true
                                }}
                            />
                            <div style={{ textAlign: 'right', marginTop: 16, padding: '10px 0', borderTop: '1px solid #f0f0f0' }}>
                                <Title level={4} style={{ margin: 0 }}>Tổng cộng: <Text type="danger">{formatCurrency(selectedOrder.totalAmount)}</Text></Title>
                            </div>
                        </div>
                    </Space>
                )}
            </Drawer>
        </div>
    );
};

export default OrderManager;