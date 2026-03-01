import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./OrderHistory.css";

// 1. Định nghĩa các Interface cho TypeScript
interface LocalUser { id?: number; name?: string; email?: string; avatar?: string; token?: string; }
interface OrderResponse { id: number; totalAmount: number; status: string; createdAt: string;items?: { slug: string }[]; }
interface ApiResponse<T> { status: string; code: number; message: string; data: T; }

// 2. Map tên Tab hiển thị sang Status Enum của Spring Boot
const STATUS_MAP: Record<string, string> = {
  "Tất cả": "ALL", "Chờ xác nhận": "PENDING", "Đang chuẩn bị": "PROCESSING",
  "Chờ giao hàng": "SHIPPED", "Đã giao hàng": "DELIVERED", "Đã huỷ": "CANCELLED"
};

const STATUS_LABEL_MAP: Record<string, string> = {
  PENDING: "Chờ xác nhận", PROCESSING: "Đang xử lý", SHIPPED: "Đang giao hàng",
  DELIVERED: "Đã giao hàng", RETURNED: "Chuyển hoàn (Bom)", CANCELLED: "Đã huỷ"
};

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tất cả");
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const tabs = Object.keys(STATUS_MAP);

  const getToken = () => {
    const localUserStr = localStorage.getItem('user');
    return localUserStr ? JSON.parse(localUserStr).token : null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          console.error("Không tìm thấy token, vui lòng đăng nhập lại!");
          setLoading(false);
          return;
        }

        const statusParam = STATUS_MAP[activeTab];
        let url = 'http://localhost:8080/api/orders/my-orders';
        if (statusParam !== "ALL") {
          url += `?status=${statusParam}`;
        }

        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });

        if (response.ok) {
          const json: ApiResponse<OrderResponse[]> = await response.json();
          if (json.status === 'success') {
            setOrders(json.data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [activeTab]);

  // --- HÀM XỬ LÝ HỦY ĐƠN ---
  const handleCancelOrder = async (orderId: number) => {
    if (!window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${orderId} không?`)) return;

    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await response.json();

      if (response.ok && json.status === 'success') {
        alert("Hủy đơn hàng thành công!");
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'CANCELLED' } : o));
      } else {
        alert(json.message || "Không thể hủy đơn hàng lúc này.");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ.");
    }
  };

  // 🔥 SỬA LẠI: Điều hướng vào trang Chi tiết đơn hàng của Hệ thống (Order Detail)
  const handleGoToDetail = (orderId: number) => {
      navigate(`/member/order/${orderId}`); // <-- Đã sửa
  };
const handleGoToProductDetail = (order: OrderResponse) => {
      // Nếu đơn hàng có sản phẩm, lấy slug của sản phẩm đầu tiên [0] để chuyển hướng
      if (order.items && order.items.length > 0 && order.items[0].slug) {
          navigate(`/product/${order.items[0].slug}`);
      } else {
          // Dự phòng: Nếu lỗi không có slug, đẩy vào chi tiết đơn hàng
          navigate(`/member/order/${order.id}`);
      }
  };
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
          {/* ... (Phần Date Picker giữ nguyên) ... */}
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
                <div key={order.id} className="order-item-card" style={{border: '1px solid #ddd', margin: '15px 0', padding: '15px', borderRadius: '8px', backgroundColor: '#fff'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                     <span style={{fontWeight: 'bold'}}>Mã đơn hàng: #{order.id}</span>
                     <span style={{color: order.status === 'CANCELLED' ? '#999' : '#d70018', fontWeight: 'bold'}}>
                        {STATUS_LABEL_MAP[order.status] || order.status}
                     </span>
                  </div>
                  <div style={{marginBottom: '5px'}}>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                  <div style={{fontWeight: 'bold', fontSize: '16px', marginBottom: '15px'}}>
                    Tổng tiền: {Number(order.totalAmount).toLocaleString('vi-VN')}đ
                  </div>
                  
                  {/* THANH CÔNG CỤ */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #eee', paddingTop: '15px' }}>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                        {order.status === 'DELIVERED' && 'Cảm ơn bạn đã mua sắm!'}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        
                        {order.status === 'PENDING' && (
                            <button className="oh-btn oh-btn-danger" onClick={() => handleCancelOrder(order.id)}>Hủy đơn</button>
                        )}
                        
                        {/* Bấm Đánh giá hoặc Mua lại đều trỏ vào trang chi tiết đơn hàng */}
                        {order.status === 'DELIVERED' && (
                            <button className="oh-btn oh-btn-outline" onClick={() => handleGoToProductDetail(order)}>Đánh giá</button>
                        )}
                        {['DELIVERED', 'CANCELLED', 'RETURNED'].includes(order.status) && (
                            <button className="oh-btn oh-btn-primary" onClick={() => handleGoToProductDetail(order)}>Mua lại</button>
                        )}

                        <button onClick={() => handleGoToDetail(order.id)} className="oh-btn oh-btn-outline" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
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
    </div>
  );
};

export default OrderHistory;