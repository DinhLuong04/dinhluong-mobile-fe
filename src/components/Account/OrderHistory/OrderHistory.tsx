import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Input } from 'antd';
import { useOrderHistory, STATUS_LABEL_MAP } from './useOrderHistory';
import "./OrderHistory.css";

const OrderHistory: React.FC = () => {
  
    const {
        tabs, activeTab, setActiveTab,
        orders, loading,
        isCancelModalVisible, setIsCancelModalVisible, cancelReason, setCancelReason,
        showCancelModal, confirmCancelOrder,
        handleGoToDetail, handleGoToProductDetail
    } = useOrderHistory();

    return (
        <div className="order-history">
            <div className="oh-mobile-header">Lịch sử mua hàng</div>
            <div className="oh-container">
                
                {/* Tabs Navigation */}
                <div className="oh-tabs-wrapper">
                    <div className="oh-tabs">
                        {tabs.map((tab) => (
                            <div 
                                key={tab}
                                className={`oh-tab-item ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="oh-filter-bar">
                    <span className="oh-title-desktop">Lịch sử mua hàng</span>
                </div>

                {/* Content Area */}
                <div className="oh-content">
                    {loading ? (
                        <div style={{textAlign: 'center', padding: '50px'}}>Đang tải danh sách...</div>
                    ) : orders.length === 0 ? (
                        <div className="oh-empty-box">
                            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="No Orders" className="oh-empty-img" />
                            <div className="oh-empty-text">
                                Bạn chưa có đơn hàng nào. <Link to="/" className="oh-empty-link">Trang chủ</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="order-list-render" style={{ maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
                            {orders.map(order => (
                                <div key={order.id} className="order-item-card" style={{ border: '1px solid #ddd', margin: '15px 0', padding: '15px', borderRadius: '8px', backgroundColor: '#fff' }}>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 'bold' }}>Mã đơn hàng: #{order.id}</span>
                                        <span style={{ color: order.status === 'CANCELLED' ? '#999' : '#d70018', fontWeight: 'bold' }}>
                                            {STATUS_LABEL_MAP[order.status!] || order.status}
                                        </span>
                                    </div>

                                    <div style={{ marginBottom: '8px' }}>
                                        {order.items && order.items.length > 0 && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                <span style={{ color: '#555', fontSize: '14px' }}>
                                                    Sản phẩm: <strong>{order.items[0].productName}</strong>
                                                </span>
                                                
                                                {order.items[0].available === false && (
                                                    <span style={{ 
                                                        fontSize: '11px', color: '#fff', padding: '2px 6px', 
                                                        borderRadius: '4px', backgroundColor: '#999'
                                                    }}>
                                                        Ngừng kinh doanh
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '5px', fontSize: '13px', color: '#666' }}>
                                        Ngày đặt: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : '---'}
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>
                                        Tổng tiền: {Number(order.totalAmount).toLocaleString('vi-VN')}đ
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #eee', paddingTop: '15px' }}>
                                        <div style={{ fontSize: '13px', color: '#666' }}>
                                            {order.status === 'DELIVERED' && 'Cảm ơn bạn đã mua sắm!'}
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            {order.status === 'PENDING' && (
                                                <button className="oh-btn oh-btn-danger" onClick={() => showCancelModal(order.id!)}>Hủy đơn</button>
                                            )}

                                            {order.status === 'DELIVERED' && order.items?.[0]?.available !== false && (
                                                <button className="oh-btn oh-btn-outline" onClick={() => handleGoToProductDetail(order)}>Đánh giá</button>
                                            )}
                                            
                                            {['DELIVERED', 'CANCELLED', 'RETURNED'].includes(order.status!) && order.items?.[0]?.available !== false && (
                                                <button className="oh-btn oh-btn-primary" onClick={() => handleGoToProductDetail(order)}>Mua lại</button>
                                            )}

                                            <button onClick={() => handleGoToDetail(order.id!)} className="oh-btn oh-btn-outline" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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

export default OrderHistory;