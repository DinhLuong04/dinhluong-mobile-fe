import React, { useState, useEffect } from 'react';
import { 
    Form, Input, InputNumber, Select, Switch, Button, 
    Card, Tabs, Space, Row, Col, Typography, message, Divider, Spin, Upload
} from 'antd';
import { 
    PlusOutlined, MinusCircleOutlined, SaveOutlined, ArrowLeftOutlined, UploadOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const ProductEdit: React.FC = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState(false);
    
    // File upload states
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [specGroups, setSpecGroups] = useState<any[]>([]);

    const getAuthToken = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr).token : '';
    };

    useEffect(() => {
        const fetchAllData = async () => {
            const token = getAuthToken();
            const headers = { 'Authorization': `Bearer ${token}` };
            
            try {
                const [catRes, brandRes, specRes] = await Promise.all([
                    fetch('http://localhost:8080/api/admin/categories', { headers }),
                    fetch('http://localhost:8080/api/admin/brands', { headers }),
                    fetch('http://localhost:8080/api/admin/spec-groups', { headers })
                ]);
                
                if (catRes.ok) setCategories(await catRes.json());
                if (brandRes.ok) setBrands(await brandRes.json());

                // LẤY DỮ LIỆU SPEC GROUPS 
                let fetchedSpecGroups: any[] = [];
                if (specRes.ok) {
                    fetchedSpecGroups = await specRes.json();
                    setSpecGroups(fetchedSpecGroups); 
                }

                const productRes = await fetch(`http://localhost:8080/api/admin/products/${id}`, { headers });
                if (productRes.ok) {
                    const json = await productRes.json();
                    if (json.status === 'success') {
                        const formData = { ...json.data };
                        
                        // 🔥 HIỂN THỊ ẢNH THUMBNAIL CŨ TRÊN Ô UPLOAD
                        const initialThumbnail = formData.thumbnailUrl ? [{
                            uid: '-1',
                            name: 'current_thumbnail.png',
                            status: 'done',
                            url: formData.thumbnailUrl,
                        }] : [];
                        formData.thumbnail = initialThumbnail;

                        // Map EAV để điền vào các ô input tĩnh
                        if (formData.specValues && Array.isArray(formData.specValues)) {
                            formData.specValuesMap = {};
                            formData.specValues.forEach((item: any) => {
                                formData.specValuesMap[item.attributeId] = item.value;
                            });
                        }

                        // LỌC DỮ LIỆU JSON
                        if (formData.specificationsJson && fetchedSpecGroups.length > 0) {
                            const eavGroupNames = fetchedSpecGroups.map((g: any) => g.name);
                            formData.specificationsJson = formData.specificationsJson.filter(
                                (group: any) => !eavGroupNames.includes(group.title)
                            );
                        }

                        // Đổ dữ liệu vào Form
                        form.setFieldsValue(formData);
                    }
                } else {
                    message.error("Không tìm thấy sản phẩm!");
                }
            } catch (error) {
                message.error("Lỗi khi tải dữ liệu!");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAllData();
    }, [id, form]);

    const onFinish = async (values: any) => {
        setSubmitting(true);
        try {
            const token = getAuthToken();
            const payload = { ...values };
            
            // XỬ LÝ EAV ĐỂ BACKEND LƯU BỘ LỌC
            if (payload.specValuesMap) {
                payload.specValues = Object.entries(payload.specValuesMap)
                    .filter(([_, val]) => val !== undefined && val !== null && val !== '') 
                    .map(([attrId, val]) => ({
                        attributeId: Number(attrId),
                        value: val
                    }));
            }

            // GỘP EAV THÀNH MẢNG JSON
            let combinedJson: any[] = [];
            if (payload.specValuesMap) {
                specGroups.forEach(group => {
                    let itemsForThisGroup: any[] = [];
                    group.attributes?.forEach((attr: any) => {
                        const val = payload.specValuesMap[attr.id];
                        if (val !== undefined && val !== null && val !== '') {
                            itemsForThisGroup.push({
                                label: attr.name,
                                value: String(val)
                            });
                        }
                    });

                    if (itemsForThisGroup.length > 0) {
                        combinedJson.push({
                            title: group.name, 
                            items: itemsForThisGroup
                        });
                    }
                });
                delete payload.specValuesMap; 
            }

            // GỘP THÊM CÁC NHÓM JSON TỰ DO
            if (payload.specificationsJson && Array.isArray(payload.specificationsJson)) {
                payload.specificationsJson.forEach((customGroup: any) => {
                    if (customGroup.title && customGroup.items && customGroup.items.length > 0) {
                        combinedJson.push({
                            title: customGroup.title,
                            items: customGroup.items.map((i: any) => ({
                                label: i.label,
                                value: i.value
                            }))
                        });
                    }
                });
            }

            // ĐÁNH LẠI ID TỪ 1 -> N CHO TOÀN BỘ MẢNG
            payload.specificationsJson = combinedJson.map((group, index) => ({
                ...group,
                id: index + 1
            }));

            // 🔥 XỬ LÝ ẢNH THUMBNAIL (GIỮ NGUYÊN)
            let finalThumbnailUrl = values.thumbnailUrl;
            let newThumbnailFile = null;

            if (values.thumbnail && values.thumbnail.length > 0) {
                if (values.thumbnail[0].originFileObj) {
                    newThumbnailFile = values.thumbnail[0].originFileObj;
                    finalThumbnailUrl = null; 
                }
            } else {
                finalThumbnailUrl = null; 
            }
            payload.thumbnailUrl = finalThumbnailUrl;
            delete payload.thumbnail;

            // ==========================================
            // 🔥 NÂNG CẤP: XỬ LÝ ẢNH GALLERY TỪ STATE
            // ==========================================
            delete payload.gallery; // Xóa key này đi để không bị vướng rác vào JSON

            // GÓI VÀO FORMDATA VÀ GỬI ĐI
            const formData = new FormData();
            formData.append('data', JSON.stringify(payload));
            
            if (newThumbnailFile) {
                formData.append('thumbnail', newThumbnailFile);
            }
            
            // Dùng trực tiếp biến state galleryFiles mà chúng ta đã lưu khi chọn ảnh!
            if (galleryFiles && galleryFiles.length > 0) {
                galleryFiles.forEach(file => formData.append('gallery', file));
            }

            const res = await fetch(`http://localhost:8080/api/admin/products/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            const json = await res.json();
            if (res.ok && json.status === 'success') {
                message.success("Cập nhật sản phẩm thành công!");
                navigate(-1);
            } else {
                message.error(json.message || "Lỗi cập nhật!");
            }
        } catch (error) {
            message.error("Lỗi kết nối máy chủ!");
        } finally {
            setSubmitting(false);
        }
    };

    // --- 1. TABS THÔNG TIN CHUNG ---
    const tabBasicInfo = (
        <Space direction="vertical" size="middle" style={{ display: 'flex', width: '100%' }}>
            <Divider orientation="left" style={{ marginTop: 0 }}>Thông tin cơ bản</Divider>
            <Row gutter={16}>
                <Col span={12}><Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input /></Form.Item></Col>
                <Col span={12}><Form.Item name="slug" label="Đường dẫn (Slug)" rules={[{ required: true }]}><Input /></Form.Item></Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="productType" label="Loại sản phẩm">
                        <Select disabled>
                            <Option value="MAIN">Sản phẩm chính</Option>
                            <Option value="ACCESSORY">Phụ kiện</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="categoryId" label="Danh mục">
                        <Select allowClear>{categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}</Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="brandId" label="Thương hiệu">
                        <Select allowClear>{brands.map(b => <Option key={b.id} value={b.id}>{b.name}</Option>)}</Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={8}><Form.Item name="displayPrice" label="Giá bán (VNĐ)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /></Form.Item></Col>
                <Col span={8}><Form.Item name="originalPrice" label="Giá gốc (VNĐ)"><InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /></Form.Item></Col>
                <Col span={8}><Form.Item name="status" label="Trạng thái"><Select><Option value="ACTIVE">Đang bán</Option><Option value="INACTIVE">Ẩn</Option></Select></Form.Item></Col>
            </Row>

            <Divider orientation="left">Ghi chú & Tính năng nổi bật</Divider>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="installmentText" label="Ghi chú trả góp (Nếu có)">
                        <Input placeholder="VD: Trả góp 0% qua thẻ tín dụng" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="specialFeatures" label="Tính năng đặc biệt">
                        <Input placeholder="VD: Kháng nước IP68, Sạc nhanh 67W" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="highlightFeatures" label="Đặc điểm nổi bật (Văn bản ngắn)">
                <TextArea rows={2} placeholder="Nhập tóm tắt vài dòng về sản phẩm..." />
            </Form.Item>

            <Divider orientation="left">Thông số vật lý (Phục vụ bộ lọc tìm kiếm)</Divider>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="osType" label="Hệ điều hành">
                        <Select placeholder="Chọn HĐH" allowClear>
                            <Option value="IOS">iOS</Option>
                            <Option value="ANDROID">Android</Option>
                            <Option value="HARMONYOS">HarmonyOS</Option>
                            <Option value="WINDOWS">Windows</Option>
                            <Option value="OTHER">Khác</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="screenSize" label="Kích thước màn hình (inch)">
                        <InputNumber step={0.1} style={{ width: '100%' }} placeholder="VD: 6.7" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="refreshRate" label="Tần số quét (Hz)">
                        <InputNumber style={{ width: '100%' }} placeholder="VD: 120" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="batteryCapacity" label="Dung lượng Pin (mAh)">
                        <InputNumber style={{ width: '100%' }} placeholder="VD: 5000" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="screenResolutionType" label="Loại độ phân giải">
                        <Input placeholder="VD: Full HD+, 2K+" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="support5g" label="Hỗ trợ mạng 5G" valuePropName="checked">
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="left">Bài viết giới thiệu chi tiết</Divider>
            <Form.Item name="description" label="Mô tả sản phẩm"><TextArea rows={6} /></Form.Item>
        </Space>
    );

   // --- 2. TABS HÌNH ẢNH ---
    const tabImages = (
        <Space direction="vertical" style={{ display: 'flex', width: '100%' }}>
            {/* Input Ẩn lưu URL Thumbnail cũ */}
            <Form.Item name="thumbnailUrl" hidden><Input /></Form.Item>
            
            <Form.Item 
                name="thumbnail" 
                label="Ảnh đại diện (Thumbnail)" 
                valuePropName="fileList" 
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
            >
                <Upload 
                    name="file" 
                    listType="picture-card" 
                    maxCount={1} 
                    beforeUpload={(file) => {
                        setThumbnailFile(file); 
                        form.setFieldValue('thumbnailUrl', ''); 
                        return false; 
                    }}
                    accept="image/*"
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Thay ảnh</div>
                    </div>
                </Upload>
            </Form.Item>
            
            <Divider orientation="left">Tải thêm ảnh mới vào Bộ sưu tập</Divider>

            <Space style={{ marginBottom: 16 }}>
                 <Upload 
                    multiple 
                    showUploadList={false}
                    accept="image/*"
                    beforeUpload={(file) => {
                        setGalleryFiles(prev => [...prev, file]);
                        return false; 
                    }}
                >
                    <Button type="primary" ghost icon={<UploadOutlined />}>Chọn thêm nhiều ảnh từ máy tính</Button>
                </Upload>
            </Space>

            {/* 🔥 NÂNG CẤP: HIỂN THỊ ẢNH PREVIEW KHI VỪA CHỌN TỪ MÁY TÍNH */}
            {galleryFiles.length > 0 && (
                <div style={{ marginBottom: 24, padding: 16, background: '#e6f7ff', borderRadius: 8, border: '1px dashed #91d5ff' }}>
                    <Text strong style={{ display: 'block', marginBottom: 12, color: '#1890ff' }}>
                        ⏳ Ảnh đang chờ tải lên (Chưa lưu):
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {galleryFiles.map((f, i) => {
                            // Tạo URL tạm thời để preview ảnh local
                            const tempUrl = URL.createObjectURL(f);
                            return (
                                <Card 
                                    key={i} 
                                    size="small" 
                                    style={{ width: 140, borderColor: '#91d5ff' }} 
                                    bodyStyle={{ padding: 8 }}
                                >
                                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                                        <img 
                                            src={tempUrl} 
                                            alt="new-gallery" 
                                            style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }} 
                                        />
                                    </div>
                                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                                        <Text ellipsis style={{ width: '100%', fontSize: 12 }} title={f.name}>
                                            {f.name}
                                        </Text>
                                    </div>
                                    <Button 
                                        danger 
                                        block
                                        size="small"
                                        onClick={() => setGalleryFiles(prev => prev.filter((_, idx) => idx !== i))}
                                    >
                                        Hủy bỏ
                                    </Button>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* QUẢN LÝ ẢNH CŨ (GIỮ NGUYÊN) */}
            <Divider orientation="left">Quản lý Bộ sưu tập hiện tại</Divider>
            <Text type="secondary" italic style={{ display: 'block', marginBottom: 16 }}>
                Đây là các ảnh đang có sẵn của sản phẩm. Bạn có thể xem, thay đổi thứ tự hoặc xóa chúng.
            </Text>

            <Form.List name="images">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fields.map(({ key, name, ...restField }) => (
                            <Card 
                                key={key} 
                                size="small" 
                                style={{ width: 220, position: 'relative', borderColor: '#d9d9d9' }} 
                                bodyStyle={{ padding: 12 }}
                            >
                                <Form.Item {...restField} name={[name, 'id']} style={{ display: 'none' }}><Input /></Form.Item>
                                
                                <Form.Item noStyle shouldUpdate>
                                    {() => {
                                        const imgUrl = form.getFieldValue(['images', name, 'imageUrl']);
                                        return imgUrl ? (
                                            <div style={{ textAlign: 'center', marginBottom: 12 }}>
                                                <img 
                                                    src={imgUrl} 
                                                    alt="gallery" 
                                                    style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6, border: '1px solid #f0f0f0' }} 
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ width: '100%', height: 140, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, marginBottom: 12 }}>
                                                <Text type="secondary">Chưa có URL</Text>
                                            </div>
                                        );
                                    }}
                                </Form.Item>

                                <Form.Item {...restField} name={[name, 'imageUrl']} style={{ marginBottom: 12 }}>
                                    <Input placeholder="Nhập URL ảnh..." size="small" />
                                </Form.Item>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Form.Item {...restField} name={[name, 'sortOrder']} label="Thứ tự" style={{ marginBottom: 0 }}>
                                        <InputNumber min={1} size="small" style={{ width: 60 }} />
                                    </Form.Item>
                                    <Button danger type="text" icon={<MinusCircleOutlined />} onClick={() => remove(name)} title="Xóa ảnh này" />
                                </div>
                            </Card>
                        ))}
                        
                        <Button 
                            type="dashed" 
                            onClick={() => add()} 
                            style={{ width: 220, height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <PlusOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                            Thêm URL ảnh thủ công
                        </Button>
                    </div>
                )}
            </Form.List>
        </Space>
    );
    // --- 3. TABS PHIÊN BẢN (VARIANTS) ---
    const tabVariants = (
        <Form.List name="variants">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Card size="small" key={key} style={{ marginBottom: 16, background: '#fafafa' }} extra={<MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />} title={`Phiên bản #${name + 1}`}>
                            <Form.Item {...restField} name={[name, 'id']} style={{ display: 'none' }}><Input /></Form.Item>
                            <Row gutter={16}>
                                <Col span={12}><Form.Item {...restField} name={[name, 'sku']} label="Mã SKU" rules={[{ required: true }]}><Input /></Form.Item></Col>
                                
                                {/* 🔥 NÂNG CẤP: UPLOAD ẢNH VARIANT TỨC THỜI (GIỐNG CREATE) */}
                                <Col span={12}>
                                    <Form.Item label="Ảnh phiên bản (Màu sắc)">
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Form.Item {...restField} name={[name, 'imageUrl']} noStyle>
                                                <Input placeholder="URL ảnh sẽ hiện ở đây..." style={{ width: 'calc(100% - 105px)' }} />
                                            </Form.Item>

                                            <Upload
                                                showUploadList={false}
                                                accept="image/*"
                                                customRequest={async (options) => {
                                                    const { file, onSuccess, onError } = options;
                                                    const formData = new FormData();
                                                    formData.append('file', file as File);

                                                    try {
                                                        const res = await fetch('http://localhost:8080/api/admin/products/upload', {
                                                            method: 'POST',
                                                            headers: { 'Authorization': `Bearer ${getAuthToken()}` },
                                                            body: formData
                                                        });
                                                        const data = await res.json();

                                                        if (res.ok && data.status === 'success') {
                                                            form.setFieldValue(['variants', name, 'imageUrl'], data.data);
                                                            onSuccess?.("ok");
                                                            message.success("Tải ảnh lên thành công!");
                                                        } else {
                                                            onError?.(new Error("Lỗi server"));
                                                            message.error(data.message || "Lỗi tải ảnh");
                                                        }
                                                    } catch (err) {
                                                        onError?.(new Error("Lỗi mạng"));
                                                        message.error("Lỗi kết nối máy chủ!");
                                                    }
                                                }}
                                            >
                                                <Button icon={<UploadOutlined />} type="primary">Tải ảnh</Button>
                                            </Upload>
                                        </Space.Compact>

                                        {/* Preview ảnh nhỏ ở dưới */}
                                        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => {
                                            const prevUrl = prevValues.variants?.[name]?.imageUrl;
                                            const currentUrl = currentValues.variants?.[name]?.imageUrl;
                                            return prevUrl !== currentUrl;
                                        }}>
                                            {() => {
                                                const currentUrl = form.getFieldValue(['variants', name, 'imageUrl']);
                                                return currentUrl ? (
                                                    <div style={{ marginTop: 8 }}>
                                                        <img src={currentUrl} alt="Preview" style={{ height: 40, width: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #d9d9d9' }} />
                                                    </div>
                                                ) : null;
                                            }}
                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={8}><Form.Item {...restField} name={[name, 'colorName']} label="Tên màu"><Input placeholder="VD: Titan Sa Mạc" /></Form.Item></Col>
                                <Col span={8}><Form.Item {...restField} name={[name, 'colorHex']} label="Mã màu (Hex)"><Input type="color" style={{ padding: 0, width: '100%', height: 32 }} /></Form.Item></Col>
                                <Col span={8}><Form.Item {...restField} name={[name, 'price']} label="Giá bán (VNĐ)"><InputNumber style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /></Form.Item></Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={6}><Form.Item {...restField} name={[name, 'ram']} label="RAM"><Input placeholder="VD: 8GB" /></Form.Item></Col>
                                <Col span={6}><Form.Item {...restField} name={[name, 'rom']} label="ROM"><Input placeholder="VD: 256GB" /></Form.Item></Col>
                                <Col span={6}><Form.Item {...restField} name={[name, 'stockQuantity']} label="Tồn kho"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
                                <Col span={6}><Form.Item {...restField} name={[name, 'isActive']} label="Kích hoạt" valuePropName="checked"><Switch /></Form.Item></Col>
                            </Row>
                        </Card>
                    ))}
                    <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm phiên bản</Button></Form.Item>
                </>
            )}
        </Form.List>
    );

   const tabSpecs = (
        <Space direction="vertical" style={{ display: 'flex', width: '100%' }}>
            
            {/* PHẦN 1: HIGHLIGHT SPECS (THÔNG SỐ NỔI BẬT DƯỚI TÊN SP) */}
            <Divider orientation="left">Điểm nổi bật (Highlight Specs)</Divider>
            <Form.List name="highlightSpecs">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item {...restField} name={[name, 'id']} style={{ display: 'none' }}><Input /></Form.Item>
                                <Form.Item {...restField} name={[name, 'label']} label="Nhãn"><Input placeholder="VD: Camera" /></Form.Item>
                                <Form.Item {...restField} name={[name, 'value']} label="Giá trị"><Input placeholder="VD: 48MP" /></Form.Item>
                                <Form.Item {...restField} name={[name, 'iconUrl']} label="URL Icon"><Input placeholder="https://..." /></Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                            </Space>
                        ))}
                        <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Thêm điểm nổi bật</Button></Form.Item>
                    </>
                )}
            </Form.List>

            {/* PHẦN 2: THÔNG SỐ EAV (DÙNG ĐỂ LÀM BỘ LỌC TÌM KIẾM) */}
            <Divider orientation="left">Thông số cơ sở (EAV - Phục vụ bộ lọc)</Divider>
            {specGroups.map(group => (
                <Card key={group.id} title={group.name} size="small" style={{ marginBottom: 16, background: '#fafafa' }}>
                    <Row gutter={16}>
                        {group.attributes?.map((attr: any) => (
                            <Col span={8} key={attr.id}>
                                <Form.Item name={['specValuesMap', attr.id]} label={attr.name}>
                                    <Input placeholder={`Nhập ${attr.name.toLowerCase()}`} />
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                </Card>
            ))}

            {/* PHẦN 3: THÔNG SỐ JSON (HIỂN THỊ BẢNG CHI TIẾT GẬP MỞ TÙY BIẾN) */}
            <Divider orientation="left">Bảng thông số chi tiết (JSON Hiển thị)</Divider>
            <Card bordered={false} style={{ background: '#fafafa' }}>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                    Thêm các nhóm thông số tự do (VD: Thiết kế, Màn hình, Pin...). Phần này dùng để hiển thị chi tiết cho khách hàng.
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
                                            <Input placeholder="Tên nhóm (VD: Màn hình)" style={{ width: 300 }} />
                                        </Form.Item>
                                    } 
                                    extra={<Button danger type="text" icon={<MinusCircleOutlined />} onClick={() => removeGroup(groupField.name)}>Xóa nhóm</Button>}
                                    style={{ border: '1px solid #d9d9d9' }}
                                >
                                    <Form.List name={[groupField.name, 'items']}>
                                        {(itemFields, { add: addItem, remove: removeItem }) => (
                                            <>
                                                {itemFields.map((itemField) => (
                                                    <Space key={itemField.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                        <Form.Item {...itemField} name={[itemField.name, 'label']} rules={[{ required: true, message: 'Nhập Tên' }]}>
                                                            <Input placeholder="Tên (VD: Tần số quét)" style={{ width: 220 }} />
                                                        </Form.Item>
                                                        <Form.Item {...itemField} name={[itemField.name, 'value']} rules={[{ required: true, message: 'Nhập Giá trị' }]}>
                                                            <Input placeholder="Giá trị (VD: 120Hz)" style={{ width: 300 }} />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => removeItem(itemField.name)} style={{ color: 'red', fontSize: 16, cursor: 'pointer' }} />
                                                    </Space>
                                                ))}
                                                <Button type="dashed" onClick={() => addItem()} block icon={<PlusOutlined />}>
                                                    Thêm thuộc tính cho nhóm này
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

        </Space>
    );

   const tabItems = [
        { key: '1', label: 'Thông tin chung', children: tabBasicInfo, forceRender: true },
        { key: '2', label: 'Hình ảnh', children: tabImages, forceRender: true },
        { key: '3', label: 'Phiên bản (Variants)', children: tabVariants, forceRender: true },
        { key: '4', label: 'Thông số kỹ thuật', children: tabSpecs, forceRender: true },
    ];

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
            <Card title={<Title level={4} style={{ margin: 0 }}>Cập nhật Sản phẩm #{id}</Title>} extra={<Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Quay lại</Button>}>
                <Spin spinning={loading} description="Đang tải thông tin sản phẩm...">
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Tabs defaultActiveKey="1" items={tabItems} />
                        <Divider />
                        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                            <Space>
                                <Button onClick={() => navigate(-1)}>Hủy bỏ</Button>
                                <Button type="primary" htmlType="submit" loading={submitting} icon={<SaveOutlined />} size="large">
                                    Cập nhật thay đổi
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    );
};

export default ProductEdit;