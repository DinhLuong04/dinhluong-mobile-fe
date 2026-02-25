import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./OrderHistory.css";

// 1. Định nghĩa các Interface cho TypeScript
interface LocalUser {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

interface OrderResponse {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

// 2. Map tên Tab hiển thị (Tiếng Việt) sang Status Enum (Tiếng Anh) của Spring Boot
const STATUS_MAP: Record<string, string> = {
  "Tất cả": "ALL",
  "Chờ xác nhận": "PENDING",
  "Đã xác nhận": "PROCESSING",
  "Đang vận chuyển": "SHIPPED",
  "Đã giao hàng": "DELIVERED",
  "Đã huỷ": "CANCELLED"
};

const OrderHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Tất cả");
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = Object.keys(STATUS_MAP);

  // 3. Gọi API mỗi khi người dùng click đổi Tab
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const localUserStr = localStorage.getItem('user');
        const localUser: LocalUser = localUserStr ? JSON.parse(localUserStr) : {};
        const token = localUser.token;

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

        const response = await fetch(url, {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) {
           console.error(`Lỗi HTTP Server: ${response.status}`);
           return; 
        }

        const json: ApiResponse<OrderResponse[]> = await response.json();

        if (json.status === 'success') {
          setOrders(json.data);
        } else {
          console.error("Lỗi từ server:", json.message);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  return (
    <div className="order-history">
      {/* 1. Header Mobile (Ẩn trên Desktop) */}
      <div className="oh-mobile-header">
        Lịch sử mua hàng
      </div>

      <div className="oh-container">
        {/* 2. Tabs Navigation (Sticky) */}
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

        {/* 3. Filter Bar (Date Picker) - Giao diện tĩnh */}
        <div className="oh-filter-bar">
          <span className="oh-title-desktop">Lịch sử mua hàng</span>
          
          <div className="oh-date-picker">
            <input 
              type="text" 
              className="oh-date-input" 
              placeholder="Từ ngày" 
              defaultValue="01/12/2020" 
            />
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="oh-date-icon" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l14 0"></path><path d="M13 18l6 -6"></path><path d="M13 6l6 6"></path></svg>
            
            <input 
              type="text" 
              className="oh-date-input" 
              placeholder="Đến ngày" 
              defaultValue="24/01/2026" 
            />
            
            <div className="oh-calendar-btn">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            </div>
          </div>
        </div>

        {/* 4. Content Area */}
        <div className="oh-content">
          {loading ? (
            <div style={{textAlign: 'center', padding: '50px'}}>Đang tải danh sách...</div>
          ) : orders.length === 0 ? (
            <div className="oh-empty-box">
              <img 
                src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" 
                alt="No Orders" 
                className="oh-empty-img" 
              />
              <div className="oh-empty-text">
                Bạn chưa có đơn hàng nào.
                <Link to="/" className="oh-empty-link">Trang chủ</Link>
              </div>
            </div>
          ) : (
            /* 🔥 VÙNG SCROLL ĐƯỢC THÊM Ở ĐÂY 🔥 */
            <div 
              className="order-list-render"
              style={{
                maxHeight: '600px', // Giới hạn chiều cao khung chứa
                overflowY: 'auto',  // Bật cuộn dọc
                overflowX: 'hidden', // Tắt cuộn ngang
                paddingRight: '10px' // Đẩy nhẹ nội dung vào để không bị thanh scroll bar che khuất
              }}
            >
              {orders.map(order => (
                <div key={order.id} className="order-item-card" style={{border: '1px solid #ddd', margin: '15px 0', padding: '15px', borderRadius: '8px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                     <span style={{fontWeight: 'bold'}}>Mã đơn hàng: #{order.id}</span>
                     <span style={{color: '#d70018', fontWeight: 'bold'}}>{order.status}</span>
                  </div>
                  <div style={{marginBottom: '5px'}}>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                  <div style={{fontWeight: 'bold', fontSize: '16px'}}>
                    Tổng tiền: {Number(order.totalAmount).toLocaleString('vi-VN')}đ
                  </div>
                  <div style={{textAlign: 'right', marginTop: '10px'}}>
                    <Link to={`/member/order/${order.id}`} style={{color: '#007bff', textDecoration: 'none', fontWeight: 'bold'}}>Xem chi tiết</Link>
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