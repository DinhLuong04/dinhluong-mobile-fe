import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Overview.css";

// 1. Định nghĩa Type cho cấu trúc User lưu trong LocalStorage
interface LocalUser {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  token?: string;
}

// 2. Định nghĩa Type cho Đơn hàng (Khớp với OrderResponse.java DTO bên Spring Boot)
interface OrderResponse {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  // Các trường dưới đây có thể thêm vào nếu bạn cần hiển thị ở Overview
  receiverName?: string;
  receiverPhone?: string;
  receiverAddress?: string;
}

// 3. Định nghĩa Type cho ApiResponse wrapper của Spring Boot
interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

// 4. Định nghĩa Type cho Banner
interface Banner {
  id: number;
  src: string;
}

const Overview: React.FC = () => {
  // Ép kiểu cho state
  const [recentOrders, setRecentOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Dữ liệu banner tĩnh
  const banners: Banner[] = [
    { id: 2, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/edu-uu-dai-sinh-vien.jpg" },
    { id: 3, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/dac-quyen-online-home.jpg" },
  ];

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        // Lấy và ép kiểu LocalUser
        const localUserStr = localStorage.getItem('user');
        const localUser: LocalUser = localUserStr ? JSON.parse(localUserStr) : {};
        const token = localUser.token;

        if (!token) {
          console.error("Không tìm thấy token, vui lòng đăng nhập lại!");
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8080/api/orders/recent', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        
        // Ép kiểu JSON trả về theo chuẩn cấu trúc ApiResponse chứa mảng OrderResponse
        const json: ApiResponse<OrderResponse[]> = await response.json();
        
        if (json.status === 'success') {
          setRecentOrders(json.data); 
        } else {
          console.error("Lỗi từ server:", json.message);
        }
      } catch (error) {
        console.error("Lỗi tải đơn hàng gần đây:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

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
                Bạn chưa có đơn hàng nào gần đây? <a href="/" className="empty-action">Mua sắm ngay</a>
              </div>
            </div>
          ) : (
            /* 🔥 THÊM STYLE CUỘN (SCROLL) Ở ĐÂY 🔥 */
            <div 
              className="recent-orders-list" 
              style={{
                padding: '15px', 
                maxHeight: '250px', // Giới hạn chiều cao tối đa của vùng chứa đơn hàng (bạn có thể chỉnh lại số này cho vừa mắt)
                overflowY: 'auto',  // Bật thanh cuộn dọc khi nội dung vượt quá maxHeight
                overflowX: 'hidden' // Ẩn thanh cuộn ngang
              }}
            >
              {recentOrders.map((order) => (
                <div key={order.id} style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                  <div style={{fontWeight: 'bold'}}>Mã đơn: #{order.id}</div>
                  <div style={{color: '#d70018', fontWeight: 'bold'}}>{Number(order.totalAmount).toLocaleString('vi-VN')}đ</div>
                  <div style={{fontSize: '12px', color: '#666'}}>Trạng thái: {order.status}</div>
                </div>
              ))}
            </div>
          )}
          
        </div>

        {/* Ưu đãi của bạn (Tạm thời là tĩnh, có thể gắn API sau) */}
        <div className="dashboard-card col-1">
          <div className="card-header">
            <div className="card-title">Ưu đãi của bạn</div>
            <Link to="/member/voucher" className="card-link">Xem tất cả &gt;</Link>
          </div>
          <div className="empty-state">
            <img src="https://cdn-static.smember.com.vn/_next/static/media/empty.f8088c4d.png" alt="Empty" className="empty-img" />
            <div className="empty-text">
              Bạn chưa có ưu đãi nào. <a href="/" className="empty-action">Xem sản phẩm</a>
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
              Bạn chưa có sản phẩm nào yêu thích? <a href="/" className="empty-action">Mua sắm ngay</a>
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