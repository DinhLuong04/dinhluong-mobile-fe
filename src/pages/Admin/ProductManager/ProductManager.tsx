import React, { useState, useEffect } from 'react';
import { 
    Table, Tag, Space, Typography, Input, Select, 
    Button, message, Card, Tooltip, Switch, Popconfirm, Image, Badge
} from 'antd';
import { 
    PlusOutlined, EditOutlined, DeleteOutlined, 
    AppstoreOutlined, SkinOutlined, StarOutlined, StarFilled, EyeOutlined, CopyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StockDetailModal from './StockDetailModal/StockDetailModal';
const { Title, Text } = Typography;
const { Option } = Select;

interface ProductResponse {
    id: number;
    name: string;
    slug: string;
    displayPrice: number;
    originalPrice: number;
    thumbnailUrl: string;
    brandName: string;
    categoryName: string;
    status: string;
    totalVariants: number;
    outOfStockVariantCount: number; // Thêm dòng này
    lowStockVariantCount: number;   // Thêm dòng này
    totalStock: number;
    soldQuantity: number;
    isFeatured: boolean;
    createdAt: string;
}

interface ProductManagerProps {
    defaultType?: 'MAIN' | 'ACCESSORY';
}

const ProductManager: React.FC<ProductManagerProps> = ({ defaultType = 'MAIN' }) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    
    const [searchText, setSearchText] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [filterBrand, setFilterBrand] = useState<string>('ALL');
    const [filterCategory, setFilterCategory] = useState<string>('ALL');
    
    const [brands, setBrands] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [stockModalVisible, setStockModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{id: number, name: string} | null>(null);
    const navigate = useNavigate();
    const handleOpenStockModal = (record: ProductResponse) => {
        setSelectedProduct({ id: record.id, name: record.name });
        setStockModalVisible(true);
    };
    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };


    const isMain = defaultType === 'MAIN';
    const pageTitle = isMain ? 'Quản lý Sản phẩm chính' : 'Quản lý Phụ kiện';
    
    // Khai báo sẵn các route tương ứng
    const createRoute = isMain ? '/admin/products/create' : '/admin/accessories/create';
    const editBasePath = isMain ? '/admin/products/edit' : '/admin/accessories/edit';


    // Lấy dữ liệu Brands và Categories cho Filter
    useEffect(() => {
        const fetchFilters = async () => {
            const token = getAuthToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                const [catRes, brandRes] = await Promise.all([
                    fetch('http://localhost:8080/api/admin/categories', { headers }),
                    fetch('http://localhost:8080/api/admin/brands', { headers })
                ]);
                if (catRes.ok) setCategories(await catRes.json());
                if (brandRes.ok) setBrands(await brandRes.json());
            } catch (error) {
                console.error("Lỗi tải bộ lọc");
            }
        };
        fetchFilters();
    }, []);

    const fetchProducts = async (page = 1, size = 10) => {
        setLoading(true);
        try {
            const token = getAuthToken();
            const queryParams = new URLSearchParams({
                page: (page - 1).toString(),
                size: size.toString(),
                productType: defaultType
            });
            
            if (searchText) queryParams.append('keyword', searchText);
            if (filterStatus !== 'ALL') queryParams.append('status', filterStatus);
            if (filterBrand !== 'ALL') queryParams.append('brandId', filterBrand);
            if (filterCategory !== 'ALL') queryParams.append('categoryId', filterCategory);

            const res = await fetch(`http://localhost:8080/api/admin/products?${queryParams.toString()}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            
            if (res.ok && json.status === 'success') {
                setProducts(json.data.content);
                setTotal(json.data.totalElements);
                setCurrentPage(page);
                setPageSize(size);
            }
        } catch (error) {
            message.error("Lỗi tải danh sách sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(1, pageSize);
    }, [filterStatus, filterBrand, filterCategory, searchText, defaultType]);

    const handleToggleStatus = async (id: number) => {
        try {
            const token = getAuthToken();
            const res = await fetch(`http://localhost:8080/api/admin/products/${id}/toggle-status`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                message.success("Đã cập nhật trạng thái!");
                fetchProducts(currentPage, pageSize);
            }
        } catch (error) {
            message.error("Lỗi cập nhật");
        }
    };

    const handleToggleFeatured = async (id: number) => {
        try {
            const token = getAuthToken();
            const res = await fetch(`http://localhost:8080/api/admin/products/${id}/toggle-featured`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await res.json();
            if (res.ok && json.status === 'success') {
                message.success("Đã cập nhật trạng thái nổi bật!");
                fetchProducts(currentPage, pageSize);
            } else {
                message.warning(json.message || "Không thể thực hiện thao tác này");
            }
        } catch (error) {
            message.error("Lỗi kết nối máy chủ");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const token = getAuthToken();
            const res = await fetch(`http://localhost:8080/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                message.success("Xóa sản phẩm thành công!");
                fetchProducts(currentPage, pageSize);
            }
        } catch (error) {
            message.error("Lỗi khi xóa");
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', width: 60, render: (id: number) => <Text type="secondary">#{id}</Text> },
        {
            title: 'Nổi bật',
            dataIndex: 'isFeatured',
            align: 'center' as const,
            width: 80,
            render: (isFeatured: boolean, record: ProductResponse) => (
                <Tooltip title={isFeatured ? "Bỏ ghim khỏi trang chủ" : "Ghim lên trang chủ"}>
                    <Button 
                        type="text" 
                        icon={isFeatured ? <StarFilled style={{ color: '#faad14', fontSize: 18 }} /> : <StarOutlined style={{ fontSize: 18 }} />} 
                        onClick={() => handleToggleFeatured(record.id)}
                    />
                </Tooltip>
            )
        },
        { 
            title: 'Sản phẩm', 
            key: 'product', 
            width: 280,
            render: (_: any, record: ProductResponse) => (
                <Space>
                    <Image 
                        src={record.thumbnailUrl} 
                        alt={record.name} 
                        width={45} height={45} 
                        style={{ objectFit: 'contain', borderRadius: 4, border: '1px solid #f0f0f0' }} 
                        fallback="https://via.placeholder.com/45"
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong style={{ fontSize: 14 }}>{record.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{record.brandName} • {record.categoryName}</Text>
                    </div>
                </Space>
            )
        },
        { 
            title: 'Giá bán', 
            key: 'price', 
            render: (_: any, record: ProductResponse) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text type="danger" strong>{record.displayPrice?.toLocaleString()} đ</Text>
                    {record.originalPrice > record.displayPrice && (
                        <Text delete type="secondary" style={{ fontSize: 12 }}>{record.originalPrice?.toLocaleString()} đ</Text>
                    )}
                </div>
            )
        },
        // [BỔ SUNG LẠI] Cột số lượng phiên bản
        {
            title: 'Phân loại',
            dataIndex: 'totalVariants',
            align: 'center' as const,
            width: 100,
            render: (total: number) => <Tag color="geekblue">{total || 0} mẫu</Tag>
        },
        { 
            title: 'Tồn kho', 
            key: 'stockInfo', 
            align: 'center' as const,
            width: 140,
            render: (_: any, record: ProductResponse) => {
                let stockColor = 'success';
                let stockText = `Tổng: ${record.totalStock || 0}`;
                if ((record.totalStock || 0) === 0) { stockColor = 'error'; stockText = 'Hết hàng toàn bộ'; } 

                // Kiểm tra xem có cảnh báo nào không để tô viền cho cả khối
                const hasWarning = record.outOfStockVariantCount > 0 || record.lowStockVariantCount > 0;

                return (
                    <Tooltip title="Nhấp vào để kiểm tra và cập nhật">
                        <div 
                            style={{ 
                                cursor: 'pointer', 
                                padding: '6px', 
                                borderRadius: 6, 
                                background: hasWarning ? '#fafafa' : 'transparent',
                                border: hasWarning ? '1px dashed #d9d9d9' : '1px solid transparent',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '4px'
                            }} 
                            onClick={() => handleOpenStockModal(record)}
                        >
                            <Badge status={stockColor as any} text={<Text type={stockColor as any} strong>{stockText}</Text>} />
                            
                            {/* NHÃN 1: MẪU ĐÃ HẾT HÀNG (Ưu tiên hiển thị trên cùng, màu đỏ) */}
                            {record.outOfStockVariantCount > 0 && (
                                <div style={{ fontSize: 11, color: '#cf1322', background: '#fff1f0', padding: '2px 6px', borderRadius: 4, width: '100%', textAlign: 'center', border: '1px solid #ffa39e' }}>
                                    🔴 {record.outOfStockVariantCount} mẫu hết!
                                </div>
                            )}

                            {/* NHÃN 2: MẪU SẮP HẾT HÀNG (Màu vàng cam) */}
                            {record.lowStockVariantCount > 0 && (
                                <div style={{ fontSize: 11, color: '#d48806', background: '#fffbe6', padding: '2px 6px', borderRadius: 4, width: '100%', textAlign: 'center', border: '1px solid #ffe58f' }}>
                                    ⚠️ {record.lowStockVariantCount} sắp hết
                                </div>
                            )}

                            {/* Nếu an toàn 100% thì hiện icon cái bút mờ mờ */}
                            {!hasWarning && record.totalStock > 0 && (
                                <div style={{ fontSize: 11, color: '#1890ff' }}>✏️ Cập nhật</div>
                            )}
                        </div>
                    </Tooltip>
                );
            } 
        },
        // [ĐÃ TÁCH] Cột Số lượng Đã bán
        {
            title: 'Đã bán',
            dataIndex: 'soldQuantity',
            align: 'center' as const,
            width: 90,
            render: (sold: number) => <Text strong>{sold || 0}</Text>
        },
        { 
            title: 'Trạng thái', 
            key: 'status', 
            align: 'center' as const,
            render: (_: any, record: ProductResponse) => (
                <Switch 
                    checked={record.status === 'ACTIVE'} 
                    onChange={() => handleToggleStatus(record.id)}
                    checkedChildren="Hiện"
                    unCheckedChildren="Ẩn"
                />
            ) 
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center' as const,
            render: (_: any, record: ProductResponse) => (
                <Space size="small">
                    <Tooltip title="Xem trên Web">
                        <Button type="text" icon={<EyeOutlined />} onClick={() => window.open(`/product/${record.slug}`, '_blank')} />
                    </Tooltip>
                    <Tooltip title="Nhân bản (Clone)">
                        <Button type="dashed" icon={<CopyOutlined />} 
                            onClick={() => navigate(createRoute, { state: { cloneFromId: record.id } })} 
                        />
                    </Tooltip>
                    
                    <Tooltip title="Chỉnh sửa">
                        {/* 2. Dùng editBasePath tự động nối với ID */}
                        <Button type="primary" ghost icon={<EditOutlined />} 
                            onClick={() => navigate(`${editBasePath}/${record.id}`)} 
                        />
                    </Tooltip>
                    <Popconfirm title="Xóa sản phẩm này?" onConfirm={() => handleDelete(record.id)}>
                        <Tooltip title="Xóa">
                            <Button danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ];

  

    return (
        <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <Title level={4} style={{ margin: 0 }}>
                    {isMain ? <AppstoreOutlined /> : <SkinOutlined />} {pageTitle}
                </Title>
                
                {/* 3. Nút Thêm mới dùng createRoute */}
                <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate(createRoute)}>
                    Thêm {isMain ? 'sản phẩm' : 'phụ kiện'} mới
                </Button>
            </div>
            

            <Card size="small" style={{ marginBottom: 20, background: '#fafafa' }}>
                <Space wrap size="middle">
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Tìm kiếm:</Text>
                        <Input.Search placeholder="Tên sản phẩm..." allowClear onSearch={setSearchText} style={{ width: 220 }} />
                    </div>
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Hãng:</Text>
                        <Select value={filterBrand} onChange={setFilterBrand} style={{ width: 140 }}>
                            <Option value="ALL">Tất cả</Option>
                            {brands.map(b => <Option key={b.id} value={b.id}>{b.name}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Danh mục:</Text>
                        <Select value={filterCategory} onChange={setFilterCategory} style={{ width: 160 }}>
                            <Option value="ALL">Tất cả</Option>
                            {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <Text strong style={{ marginRight: 8 }}>Trạng thái:</Text>
                        <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 120 }}>
                            <Option value="ALL">Tất cả</Option>
                            <Option value="ACTIVE">Đang bán</Option>
                            <Option value="INACTIVE">Đã ẩn</Option>
                        </Select>
                    </div>
                </Space>
            </Card>

            <Table 
                columns={columns} 
                dataSource={products} 
                rowKey="id" 
                loading={loading} 
                pagination={{ 
                    current: currentPage, pageSize: pageSize, total: total, showSizeChanger: true,
                    onChange: (page, size) => fetchProducts(page, size)
                }} 
            />
            {/* COMPONENT MODAL ĐƯỢC GỌI TẠI ĐÂY */}
            <StockDetailModal 
                open={stockModalVisible} 
                onClose={() => setStockModalVisible(false)} 
                onSuccess={() => fetchProducts(currentPage, pageSize)} // <--- THÊM DÒNG NÀY
                product={selectedProduct} 
            />
        </div>
    );
};

export default ProductManager;