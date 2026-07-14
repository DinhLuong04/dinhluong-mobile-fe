import React from 'react';
import { Link } from 'react-router-dom';
import { useOverview } from './useOverview';
import "./Overview.css";

const Overview: React.FC = () => {

    const { recentOrders, loading, banners, formatCurrency, getStatusLabel } = useOverview();

    return (
        <div className="dashboard-grid">
            
            {/* HÀNG 1: Đơn hàng & Ưu đãi */}
            <div className="dashboard-row">
                
                {/* Đơn hàng gần đây */}
                <div className="dashboard-card col-2">
                    <div className="card-header">
                        <div className="card-title">Đơn hàng gần đây</div>
                        <Link to="/member/order" className="card-link">Xem tất cả &gt;</Link>
                    </div>
                    
                    {loading ? (
                        <div style={{padding: '20px', textAlign: 'center'}}>Đang tải danh sách đơn hàng...</div>
                    ) : recentOrders.length === 0 ? (
                        <div className="empty-state">
                            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
                            <div className="empty-text">
                                Bạn chưa có đơn hàng nào gần đây? <Link to="/" className="empty-action">Mua sắm ngay</Link>
                            </div>
                        </div>
                    ) : (
                        <div 
                            className="recent-orders-list" 
                            style={{
                                padding: '15px', 
                                maxHeight: '250px', 
                                overflowY: 'auto', 
                                overflowX: 'hidden' 
                            }}
                        >
                            {recentOrders.map((order) => (
                                <div key={order.id} style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                                    <div style={{fontWeight: 'bold'}}>Mã đơn: #{order.id}</div>
                                    <div style={{color: '#d70018', fontWeight: 'bold'}}>{formatCurrency(order.totalAmount || 0)}</div>
                                    <div style={{fontSize: '12px', color: '#666'}}>
                                        Trạng thái: <span style={{ fontWeight: '500' }}>{getStatusLabel(order.status || "")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ưu đãi của bạn */}
                <div className="dashboard-card col-1">
                    <div className="card-header">
                        <div className="card-title">Ưu đãi của bạn</div>
                        <Link to="/member/voucher" className="card-link">Xem tất cả &gt;</Link>
                    </div>
                    <div className="empty-state">
                        <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
                        <div className="empty-text">
                            Bạn chưa có ưu đãi nào. <Link to="/" className="empty-action">Xem sản phẩm</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* HÀNG 2: Sản phẩm yêu thích (Giao diện tĩnh) */}
            <div className="dashboard-row">
                <div className="dashboard-card col-2">
                    <div className="card-header">
                        <div className="card-title">Sản phẩm yêu thích</div>
                    </div>
                    <div className="empty-state">
                        <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
                        <div className="empty-text">
                            Bạn chưa có sản phẩm nào yêu thích? <Link to="/" className="empty-action">Mua sắm ngay</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* HÀNG 3: Chương trình nổi bật */}
            <div className="dashboard-card">
                <div className="card-header">
                    <div className="card-title">Chương trình nổi bật</div>
                </div>
                <div className="banner-list">
                    {banners.map((b) => (
                        <div key={b.id} className="banner-item">
                            <img src={b.src} alt="Banner" className="banner-img" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Overview;