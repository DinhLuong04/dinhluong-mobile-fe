import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./OrderDetail.css"; // Nhớ import CSS

// --- ĐỊNH NGHĨA TYPE DỮ LIỆU ---
interface ComboItemDetail {
  variantId: number;
  name: string;
  imageUrl: string;
  price: number;
}

interface OrderItemResponse {
  id: number;
  productVariantId: number;
  productName: string;
  variantName?: string;
  imageUrl: string;
  quantity: number;
  priceAtPurchase: number;
  comboItems: ComboItemDetail[];
}

interface OrderDetailResponse {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  paymentMethod: string; 
  paymentStatus: string;
  items: OrderItemResponse[];
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const localUserStr = localStorage.getItem('user');
        const localUser = localUserStr ? JSON.parse(localUserStr) : {};
        const token = localUser.token;

        if (!token) {
          setError("Vui lòng đăng nhập để xem đơn hàng.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const json: ApiResponse<OrderDetailResponse> = await response.json();

        if (response.ok && json.status === 'success') {
          setOrder(json.data);
        } else {
          setError(json.message || "Không thể tải chi tiết đơn hàng.");
        }
      } catch (err) {
        setError("Lỗi kết nối đến máy chủ.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrderDetail();
  }, [id]);

  // --- RENDERING TẠM THỜI ---
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

  // --- RENDERING CHÍNH ---
  return (
    <div className="order-detail-wrapper">
      
      {/* Nút quay lại & Tiêu đề */}
      <div className="od-header">
        <button onClick={() => navigate(-1)} className="od-back-btn">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
          Quay lại
        </button>
        <h2 className="od-title">Chi tiết đơn hàng #{order.id}</h2>
      </div>

      {/* Thông tin trạng thái */}
      <div className="od-card">
        <div className="od-status-row">
          <span>Ngày đặt: <strong>{new Date(order.createdAt).toLocaleString('vi-VN')}</strong></span>
          <span className="od-status-badge">{order.status}</span>
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <div className="od-card">
        <h3 className="od-card-title">Địa chỉ nhận hàng</h3>
        <div className="od-address-name"><strong>{order.receiverName}</strong> | {order.receiverPhone}</div>
        <div className="od-address-detail">{order.receiverAddress}</div>
      </div>
      {/* 🔥 THÊM MỚI: THÔNG TIN THANH TOÁN */}
      <div className="od-card">
        <h3 className="od-card-title">Phương thức thanh toán</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          
          {/* Hiển thị tên phương thức */}
          <div style={{ fontSize: '15px' }}>
            {order.paymentMethod === 'VNPAY' ? (
              <><span style={{ color: '#005baa', fontWeight: 'bold' }}>VNPAY</span> - Thanh toán trực tuyến</>
            ) : (
              <><span style={{ color: '#000', fontWeight: 'bold' }}>COD</span> - Thanh toán khi nhận hàng</>
            )}
          </div>

          {/* Hiển thị trạng thái thanh toán */}
          <div>
            {order.paymentMethod === 'VNPAY' ? (
              order.paymentStatus === 'PAID' 
                ? <span style={{ color: '#28a745', fontWeight: 'bold', backgroundColor: '#e6f4ea', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>✅ Đã thanh toán</span> 
                : <span style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#fce8e6', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>❌ Chưa thanh toán</span>
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
          {order.items.map((item) => (
            <div key={item.id} className="od-product-item">
              
              {/* 1. HIỂN THỊ SẢN PHẨM CHÍNH */}
              <div className="od-main-product">
                <img src={item.imageUrl} alt={item.productName} className="od-product-img" />
                <div className="od-product-info">
                  <div className="od-product-name">{item.productName}</div>
                  {item.variantName && <div className="od-product-variant">Phân loại: {item.variantName}</div>}
                  <div className="od-product-qty">Số lượng: x{item.quantity}</div>
                </div>
                <div className="od-product-price">
                  {Number(item.priceAtPurchase).toLocaleString('vi-VN')}đ
                </div>
              </div>

              {/* 2. HIỂN THỊ SẢN PHẨM COMBO ĐI KÈM */}
              {item.comboItems && item.comboItems.length > 0 && (
                <div className="od-combo-section">
                  <div className="od-combo-title">
                    🎁 Ưu đãi mua kèm / Combo
                  </div>
                  
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

    </div>
  );
};

export default OrderDetail;