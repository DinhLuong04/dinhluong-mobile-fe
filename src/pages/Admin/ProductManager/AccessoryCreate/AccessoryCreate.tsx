import React, { useState, useEffect } from 'react';
import { 
    Form, Input, InputNumber, Select, Button, Card, 
    Space, Divider, message, Row, Col, Typography 
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
const generateSlug = (str: string) => {
    if (!str) return '';
    return str.toString().toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s+/g, '-')           // Thay khoảng trắng bằng gạch ngang
        .replace(/[^\w\-]+/g, '')       // Xóa các ký tự đặc biệt
        .replace(/\-\-+/g, '-')         // Xóa các dấu gạch ngang liên tiếp
        .replace(/^-+/, '')             // Xóa gạch ngang ở đầu
        .replace(/-+$/, '');            // Xóa gạch ngang ở cuối
};
const { Title, Text } = Typography;
const { Option } = Select;

const AccessoryCreate: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // State lưu danh sách Hãng và Danh mục
    const [brands, setBrands] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    // Gọi API lấy dữ liệu Hãng & Danh mục khi vừa vào trang
    useEffect(() => {
        const fetchSelectData = async () => {
            const token = getAuthToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            try {
                const [brandRes, catRes] = await Promise.all([
                    fetch('http://localhost:8080/api/admin/brands', { headers }),
                    fetch('http://localhost:8080/api/admin/categories', { headers })
                ]);
                if (brandRes.ok) setBrands(await brandRes.json());
                if (catRes.ok) setCategories(await catRes.json());
            } catch (error) {
                message.error("Lỗi tải dữ liệu Hãng/Danh mục");
            }
        };
        fetchSelectData();
    }, []);

   const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const token = getAuthToken();

            // 🔥 1. CHUẨN HÓA MẢNG JSON TRƯỚC KHI GỬI
            const formattedSpecsJson = values.specificationsJson?.map((group: any, index: number) => ({
                id: index + 1,
                title: group.title,
                items: group.items || []
            })) || [];

            const payload = {
                name: values.name,
                slug: generateSlug(values.name),
                thumbnailUrl: values.thumbnailUrl,
                brandId: values.brandId,
                categoryId: values.categoryId,
                description: values.description,
                productType: 'ACCESSORY',
                status: 'ACTIVE',
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                originalPrice: values.originalPrice,
                displayPrice: values.displayPrice,
                
                variants: [
                    {
                        sku: values.sku || `PK-${Date.now()}`,
                        colorName: 'Mặc định',
                        colorHex: '#ffffff',
                        originalPrice: values.originalPrice,
                        price: values.displayPrice, // Map vào cột 'price' của variant
                        stockQuantity: values.stockQuantity,
                        isActive: true
                    }
                ],
                
                // Đổi từ specifications thành specificationsJson cho khớp DB
                specificationsJson: formattedSpecsJson
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            const response = await fetch('http://localhost:8080/api/admin/products', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData 
            });

            const json = await response.json();
            if (response.ok && json.status === 'success') {
                message.success('Thêm phụ kiện thành công!');
                navigate('/admin/accessories');
            } else {
                message.error(json.message || 'Có lỗi xảy ra khi lưu');
            }
        } catch (error) {
            message.error('Lỗi kết nối máy chủ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '0 24px 24px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/accessories')}>Trở về</Button>
                    <Title level={4} style={{ margin: 0 }}>Thêm Phụ Kiện Mới</Title>
                </Space>
                <Button type="primary" size="large" icon={<SaveOutlined />} loading={loading} onClick={() => form.submit()}>
                    Lưu Phụ Kiện
                </Button>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={24}>
                    {/* CỘT TRÁI: Thông tin chính & Thông số */}
                    <Col span={16}>
                        <Card title="Thông tin cơ bản" bordered={false} style={{ marginBottom: 24 }}>
                            <Form.Item name="name" label="Tên phụ kiện" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                                <Input placeholder="VD: Sạc nhanh Anker 20W" size="large" />
                            </Form.Item>

                            <Form.Item name="thumbnailUrl" label="Link Ảnh đại diện (Thumbnail URL)" rules={[{ required: true }]}>
                                <Input placeholder="https://cdn.example.com/image.jpg" />
                            </Form.Item>

                            <Form.Item 
                                name="description" 
                                label="Bài viết giới thiệu"
                                getValueFromEvent={(e) => e === '<p><br></p>' ? '' : e}
                            >
                                <ReactQuill 
                                    theme="snow" 
                                    style={{ height: 250, marginBottom: 40 }} 
                                />
                            </Form.Item>
                        </Card>

                       {/* 🔥 CẬP NHẬT: THÔNG SỐ KỸ THUẬT LỒNG NHAU */}
                        <Card title="Thông số kỹ thuật chi tiết" bordered={false} style={{ marginBottom: 24 }}>
                            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                                Cấu trúc: Nhóm thông số (VD: Kết nối) {'>'} Thuộc tính (VD: Độ dài - 1.2m)
                            </Text>
                            
                            <Form.List name="specificationsJson">
                                {(groupFields, { add: addGroup, remove: removeGroup }) => (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {groupFields.map((groupField) => (
                                            <Card 
                                                size="small" 
                                                key={groupField.key} 
                                                title={
                                                    <Form.Item 
                                                        {...groupField} 
                                                        name={[groupField.name, 'title']} 
                                                        style={{ margin: 0 }} 
                                                        rules={[{ required: true, message: 'Nhập tên nhóm!' }]}
                                                    >
                                                        <Input placeholder="Tên nhóm (VD: Thông số chung)" style={{ width: 300 }} />
                                                    </Form.Item>
                                                } 
                                                extra={
                                                    <Button danger type="text" icon={<MinusCircleOutlined />} onClick={() => removeGroup(groupField.name)}>
                                                        Xóa nhóm
                                                    </Button>
                                                }
                                                style={{ border: '1px dashed #d9d9d9', backgroundColor: '#fafafa' }}
                                            >
                                                <Form.List name={[groupField.name, 'items']}>
                                                    {(itemFields, { add: addItem, remove: removeItem }) => (
                                                        <>
                                                            {itemFields.map((itemField) => (
                                                                <Space key={itemField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                    <Form.Item {...itemField} name={[itemField.name, 'label']} rules={[{ required: true, message: 'Nhập Tên' }]}>
                                                                        <Input placeholder="Tên (VD: Công suất)" style={{ width: 220 }} />
                                                                    </Form.Item>
                                                                    <Form.Item {...itemField} name={[itemField.name, 'value']} rules={[{ required: true, message: 'Nhập Giá trị' }]}>
                                                                        <Input placeholder="Giá trị (VD: 20W)" style={{ width: 300 }} />
                                                                    </Form.Item>
                                                                    <MinusCircleOutlined onClick={() => removeItem(itemField.name)} style={{ color: 'red', fontSize: 16, cursor: 'pointer' }} />
                                                                </Space>
                                                            ))}
                                                            <Button type="dashed" onClick={() => addItem()} block icon={<PlusOutlined />}>
                                                                Thêm thuộc tính
                                                            </Button>
                                                        </>
                                                    )}
                                                </Form.List>
                                            </Card>
                                        ))}
                                        
                                        <Button type="primary" ghost onClick={() => addGroup()} block icon={<PlusOutlined />} size="large">
                                            + THÊM NHÓM THÔNG SỐ MỚI
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        </Card>

                        {/* Khu vực SEO */}
                        <Card title="Cấu hình SEO" bordered={false}>
                            <Form.Item name="metaTitle" label="Thẻ Tiêu đề (Meta Title)">
                                <Input placeholder="Tối đa 60-70 ký tự" />
                            </Form.Item>
                            <Form.Item name="metaDescription" label="Thẻ Mô tả (Meta Description)">
                                <Input.TextArea rows={2} placeholder="Tối đa 150-160 ký tự" />
                            </Form.Item>
                        </Card>
                    </Col>

                    {/* CỘT PHẢI: Giá bán, Tồn kho, Phân loại */}
                    <Col span={8}>
                        <Card title="Giá & Kho hàng" bordered={false} style={{ marginBottom: 24 }}>
                            <Form.Item name="sku" label="Mã sản phẩm (SKU)">
                                <Input placeholder="Để trống sẽ tự tạo" />
                            </Form.Item>

                            <Form.Item name="originalPrice" label="Giá gốc (VNĐ)" rules={[{ required: true }]}>
                                <InputNumber 
                                    min={0} style={{ width: '100%' }} size="large"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>

                            <Form.Item name="displayPrice" label="Giá bán khuyến mãi (VNĐ)" rules={[{ required: true }]}>
                                <InputNumber 
                                    min={0} style={{ width: '100%' }} size="large"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            </Form.Item>

                            <Divider />

                            <Form.Item name="stockQuantity" label="Số lượng tồn kho" rules={[{ required: true }]}>
                                <InputNumber min={0} style={{ width: '100%' }} size="large" placeholder="0" />
                            </Form.Item>
                        </Card>

                        <Card title="Tổ chức" bordered={false}>
                            <Form.Item name="categoryId" label="Danh mục phụ kiện" rules={[{ required: true, message: 'Chọn danh mục!' }]}>
                                <Select placeholder="-- Chọn danh mục --" size="large">
                                    {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item name="brandId" label="Thương hiệu" rules={[{ required: true, message: 'Chọn hãng!' }]}>
                                <Select placeholder="-- Chọn hãng --" size="large">
                                    {brands.map(b => <Option key={b.id} value={b.id}>{b.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AccessoryCreate;