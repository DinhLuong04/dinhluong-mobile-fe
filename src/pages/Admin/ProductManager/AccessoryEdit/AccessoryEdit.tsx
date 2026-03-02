import React, { useState, useEffect } from 'react';
import {
    Form, Input, InputNumber, Select, Button, Card,
    Space, Divider, message, Row, Col, Typography, Spin, Upload // 🔥 CẬP NHẬT: Import Upload
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
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
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');            
};

const { Title, Text } = Typography;
const { Option } = Select;

// 🔥 CẬP NHẬT: Hàm xử lý event của component Upload
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AccessoryEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); 

    const [brands, setBrands] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const [defaultVariantId, setDefaultVariantId] = useState<number | null>(null);

    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    // 1. GỌI API LẤY DỮ LIỆU CŨ ĐỔ VÀO FORM
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setFetching(true);
            try {
                const token = getAuthToken();
                const headers = { 'Authorization': `Bearer ${token}` };

                const [brandRes, catRes, productRes] = await Promise.all([
                    fetch('http://localhost:8080/api/admin/brands', { headers }),
                    fetch('http://localhost:8080/api/admin/categories', { headers }),
                    fetch(`http://localhost:8080/api/admin/products/${id}`, { headers }) 
                ]);

                if (brandRes.ok) setBrands(await brandRes.json());
                if (catRes.ok) setCategories(await catRes.json());

                if (productRes.ok) {
                    const json = await productRes.json();
                    if (json.status === 'success') {
                        const product = json.data;
                        
                        const defaultVariant = (product.variants && product.variants.length > 0) 
                                               ? product.variants[0] : null;
                        
                        if (defaultVariant?.id) setDefaultVariantId(defaultVariant.id);

                        // 🔥 CẬP NHẬT: Cấu hình hiển thị ảnh cũ vào component Upload
                        const initialThumbnail = product.thumbnailUrl ? [{
                            uid: '-1',
                            name: 'current_image.png',
                            status: 'done',
                            url: product.thumbnailUrl,
                        }] : [];

                        form.setFieldsValue({
                            name: product.name,
                            thumbnailUrl: product.thumbnailUrl, // Vẫn lưu lại url cũ ngầm
                            thumbnail: initialThumbnail,        // Đổ vào component Upload
                            brandId: product.brandId, 
                            categoryId: product.categoryId,
                            description: product.description || '', 
                            metaTitle: product.metaTitle,
                            metaDescription: product.metaDescription,

                            sku: defaultVariant?.sku || `PK-${product.id}`,
                            originalPrice: defaultVariant?.price || product.originalPrice || 0,
                            displayPrice: defaultVariant?.price || product.displayPrice || 0,
                            stockQuantity: defaultVariant?.stockQuantity || product.totalStock || 0,
                            
                            specificationsJson: product.specificationsJson || []
                        });
                    }
                } else {
                    message.error("Không tìm thấy thông tin phụ kiện!");
                    navigate('/admin/accessories');
                }
            } catch (error) {
                message.error("Lỗi tải dữ liệu máy chủ");
            } finally {
                setFetching(false);
            }
        };
        fetchData();
    }, [id, form, navigate]);

    // 2. HÀM XỬ LÝ LƯU CẬP NHẬT
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const token = getAuthToken();
            const formattedSpecsJson = values.specificationsJson?.map((group: any, index: number) => ({
                id: index + 1, 
                title: group.title,
                items: group.items || []
            })) || [];

            // 🔥 CẬP NHẬT: Xử lý logic ảnh (Giữ ảnh cũ hay upload ảnh mới)
            let finalThumbnailUrl = values.thumbnailUrl; // Mặc định là url cũ
            let newImageFile = null;

            if (values.thumbnail && values.thumbnail.length > 0) {
                // Nếu có originFileObj nghĩa là user vừa chọn 1 file mới từ máy
                if (values.thumbnail[0].originFileObj) {
                    newImageFile = values.thumbnail[0].originFileObj;
                    finalThumbnailUrl = null; // Không cần gửi url nữa vì đã gửi file
                }
            } else {
                // Nếu mảng rỗng nghĩa là user đã bấm nút xóa ảnh trên giao diện
                finalThumbnailUrl = null; 
            }

            const payload = {
                name: values.name,
                slug: generateSlug(values.name),
                thumbnailUrl: finalThumbnailUrl, // Backend sẽ lấy url này nếu không có file mới
                brandId: values.brandId,
                categoryId: values.categoryId,
                description: values.description,
                productType: 'ACCESSORY',
                metaTitle: values.metaTitle,
                metaDescription: values.metaDescription,
                originalPrice: values.originalPrice,
                displayPrice: values.displayPrice,

                variants: [
                    {
                        id: defaultVariantId, 
                        sku: values.sku,
                        colorName: 'Mặc định',
                        colorHex: '#ffffff',
                        price: values.displayPrice, 
                        stockQuantity: values.stockQuantity,
                        isActive: true
                    }
                ],
                specificationsJson: formattedSpecsJson
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));
            
            // Nếu có file mới thì append vào
            if (newImageFile) {
                formData.append("thumbnail", newImageFile);
            }

            // Gọi API PUT để Update
            const response = await fetch(`http://localhost:8080/api/admin/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // KHÔNG set Content-Type vì FormData sẽ tự động set boundary
                },
                body: formData 
            });

            const json = await response.json();
            if (response.ok && json.status === 'success') {
                message.success('Cập nhật phụ kiện thành công!');
                navigate('/admin/accessories');
            } else {
                message.error(json.message || 'Có lỗi xảy ra khi cập nhật');
            }
        } catch (error) {
            message.error('Lỗi kết nối máy chủ');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <Spin size="large" tip="Đang tải dữ liệu phụ kiện..." />
            </div>
        );
    }

    return (
        <div style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0' }}>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/accessories')}>Trở về</Button>
                    <Title level={4} style={{ margin: 0 }}>Chỉnh sửa Phụ Kiện #{id}</Title>
                </Space>
                <Button type="primary" size="large" icon={<SaveOutlined />} loading={loading} onClick={() => form.submit()}>
                    Lưu Thay Đổi
                </Button>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* 🔥 Trường ẩn lưu trữ Link ảnh cũ */}
                <Form.Item name="thumbnailUrl" hidden>
                    <Input />
                </Form.Item>

                <Row gutter={24}>
                    <Col span={16}>
                        <Card title="Thông tin cơ bản" bordered={false} style={{ marginBottom: 24 }}>
                            <Form.Item name="name" label="Tên phụ kiện" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                                <Input placeholder="VD: Sạc nhanh Anker 20W" size="large" />
                            </Form.Item>

                            {/* 🔥 CẬP NHẬT: Giao diện Upload ảnh */}
                            <Form.Item 
                                name="thumbnail" 
                                label="Ảnh đại diện" 
                                valuePropName="fileList" 
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                            >
                                <Upload 
                                    name="file" 
                                    listType="picture-card" 
                                    maxCount={1} 
                                    beforeUpload={() => false} // Không upload ngay, giữ lại submit cùng form
                                    accept="image/*"
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Thay ảnh</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Bài viết giới thiệu"
                                getValueFromEvent={(e) => e === '<p><br></p>' ? '' : e}
                            >
                                <ReactQuill theme="snow" style={{ height: 250, marginBottom: 40 }} />
                            </Form.Item>
                        </Card>

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
                        <Card title="Cấu hình SEO" bordered={false}>
                            <Form.Item name="metaTitle" label="Thẻ Tiêu đề (Meta Title)">
                                <Input placeholder="Tối đa 60-70 ký tự" />
                            </Form.Item>
                            <Form.Item name="metaDescription" label="Thẻ Mô tả (Meta Description)">
                                <Input.TextArea rows={2} placeholder="Tối đa 150-160 ký tự" />
                            </Form.Item>
                        </Card>
                    </Col>

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

export default AccessoryEdit;