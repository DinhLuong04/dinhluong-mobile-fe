// src/pages/OrderDetail/OrderDetail.tsx
import React from 'react';
import { message, Modal, Input } from 'antd'; 
import { useOrderDetail, STATUS_LABEL_MAP } from './useOrderDetail';
import "./OrderDetail.css";

const OrderDetail: React.FC = () => {
  
    const {
        order, loading, error, navigate,
        isCancelModalVisible, setIsCancelModalVisible, cancelReason, setCancelReason,
        showCancelModal, confirmCancelOrder
    } = useOrderDetail();

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải chi tiết đơn hàng...</div>;
    }

    if (error || !order) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="od-back-btn" style={{margin: '0 auto'}}>Quay lại</button>
            </div>
        );
    }

    return (
        <div className="order-detail-wrapper">
            
            {/* Header */}
            <div className="od-header">
                <button onClick={() => navigate(-1)} className="od-back-btn">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
                    Quay lại
                </button>
                <h2 className="od-title">Chi tiết đơn hàng #{order.id}</h2>
            </div>

            {/* Trạng thái */}
            <div className="od-card">
                <div className="od-status-row">
                    <span>Ngày đặt: <strong>{order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : '---'}</strong></span>
                    <span className="od-status-badge">
                        {STATUS_LABEL_MAP[order.status!] || order.status}
                    </span>
                </div>
            </div>

            {/* Địa chỉ */}
            <div className="od-card">
                <h3 className="od-card-title">Địa chỉ nhận hàng</h3>
                <div className="od-address-name"><strong>{order.receiverName}</strong> | {order.receiverPhone}</div>
                <div className="od-address-detail">{order.receiverAddress}</div>
            </div>

            {/* Thanh toán */}
            <div className="od-card">
                <h3 className="od-card-title">Phương thức thanh toán</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ fontSize: '15px' }}>
                        {order.paymentMethod === 'VNPAY' ? (
                            <><span style={{ color: '#005baa', fontWeight: 'bold' }}>VNPAY</span> - Thanh toán trực tuyến</>
                        ) : (
                            <><span style={{ color: '#000', fontWeight: 'bold' }}>COD</span> - Thanh toán khi nhận hàng</>
                        )}
                    </div>
                    <div>
                        {order.paymentMethod === 'VNPAY' ? (
                            order.paymentStatus === 'PAID' ? (
                                <span style={{ color: '#28a745', fontWeight: 'bold', backgroundColor: '#e6f4ea', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>✅ Đã thanh toán</span> 
                            ) : order.paymentStatus === 'REFUND_PENDING' ? (
                                <span style={{ color: '#005baa', fontWeight: 'bold', backgroundColor: '#e1f0ff', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>🔄 Hoàn tiền</span>
                            ) : (
                                <span style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#fce8e6', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>❌ Chưa thanh toán</span>
                            )
                        ) : (
                            <span style={{ color: '#fd7e14', fontWeight: 'bold', backgroundColor: '#fff3cd', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>⏳ Thu tiền mặt</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="od-card">
                <h3 className="od-card-title">Sản phẩm đã mua</h3>
                <div className="od-product-list">
                    {order.items?.map((item) => (
                        <div key={item.id} className="od-product-item">
                            <div className="od-main-product" style={{ alignItems: 'flex-start' }}>
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.productName} 
                                    className="od-product-img" 
                                    onClick={() => item.available && navigate(`/product/${item.slug}`)}
                                    style={{ 
                                        cursor: item.available ? 'pointer' : 'default',
                                        filter: item.available ? 'none' : 'grayscale(100%)',
                                        opacity: item.available ? 1 : 0.6
                                    }}
                                />
                                
                                <div className="od-product-info">
                                    <div 
                                        className="od-product-name"
                                        onClick={() => item.available && navigate(`/product/${item.slug}`)}
                                        style={{ 
                                            cursor: item.available ? 'pointer' : 'default', 
                                            color: item.available ? '#005baa' : '#888'
                                        }}
                                    >
                                        {item.productName}
                                        {!item.available && (
                                            <span style={{ 
                                                fontSize: '10px', color: '#fff', backgroundColor: '#999', 
                                                padding: '2px 6px', borderRadius: '4px', marginLeft: '8px', fontWeight: 'normal'
                                            }}>
                                                Ngừng kinh doanh
                                            </span>
                                        )}
                                    </div>
                                    {item.variantName && <div className="od-product-variant">Phân loại: {item.variantName}</div>}
                                    <div className="od-product-qty">Số lượng: x{item.quantity}</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                    <div className="od-product-price">
                                        {Number(item.priceAtPurchase).toLocaleString('vi-VN')}đ
                                    </div>
                                    
                                    {order.status === 'DELIVERED' && item.available && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                            <button className="oh-btn oh-btn-outline" onClick={() => navigate(`/product/${item.slug}`)}>Đánh giá</button>
                                            <button className="oh-btn oh-btn-primary" onClick={() => navigate(`/product/${item.slug}`)}>Mua lại</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sản phẩm mua kèm */}
                            {item.comboItems && item.comboItems.length > 0 && (
                                <div className="od-combo-section">
                                    <div className="od-combo-title">🎁 Ưu đãi mua kèm / Combo</div>
                                    {item.comboItems.map((combo, comboIdx) => (
                                        <div key={comboIdx} className="od-combo-item">
                                            <img src={combo.imageUrl} alt={combo.name} className="od-combo-img" />
                                            <div className="od-combo-info">
                                                <div className="od-combo-name">{combo.name}</div>
                                                <div className="od-combo-qty">Số lượng: x{item.quantity}</div>
                                            </div>
                                            <div className={`od-combo-price ${combo.price === 0 ? 'free' : ''}`}>
                                                {combo.price === 0 ? 'Tặng kèm' : `${Number(combo.price).toLocaleString('vi-VN')}đ`}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="od-card od-total-card">
                <div className="od-total-text">Tổng thành tiền:</div>
                <div className="od-total-amount">{Number(order.totalAmount).toLocaleString('vi-VN')}đ</div>
            </div>

            {/* Nút Hủy Đơn */}
            <div className="od-card od-action-card" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '15px' }}>
                {order.status === 'PENDING' && (
                    <button className="oh-btn oh-btn-danger" onClick={showCancelModal}>Hủy đơn hàng</button>
                )}
            </div>

            {/* Modal */}
            <Modal
                title="Xác nhận Hủy đơn hàng"
                open={isCancelModalVisible}
                onOk={confirmCancelOrder}
                onCancel={() => setIsCancelModalVisible(false)}
                okText="Xác nhận hủy"
                cancelText="Đóng"
                okButtonProps={{ danger: true }}
            >
                <div style={{ marginBottom: 10 }}>
                    <p>Vui lòng cho chúng tôi biết lý do bạn hủy đơn hàng này để cải thiện dịch vụ:</p>
                </div>
                <Input.TextArea
                    rows={4}
                    placeholder="Ví dụ: Tôi muốn thay đổi địa chỉ giao hàng, Tôi đổi ý..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                />
            </Modal>

        </div>
    );
};

export default OrderDetail;