import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd'; // 1. IMPORT MESSAGE VÀ MODAL TỪ ANTD
import "./OrderDetail.css";

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
  slug: string; // <-- Đã thêm slug
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

const STATUS_LABEL_MAP: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  PROCESSING: "Đang xử lý",
  SHIPPED: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  RETURNED: "Chuyển hoàn (Bom)",
  CANCELLED: "Đã huỷ"
};

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
        const token = localUserStr ? JSON.parse(localUserStr).token : null;

        if (!token) {
          setError("Vui lòng đăng nhập để xem đơn hàng.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const json: ApiResponse<OrderDetailResponse> = await response.json();

        if (response.ok && json.status === 'success') {
          setOrder(json.data);
        } else {
          setError(json.message || "Không thể tải chi tiết đơn hàng.");
        }
      } catch (err) {
        setError("Lỗi kết nối đến máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrderDetail();
  }, [id]);

  // --- HÀM HỦY ĐƠN HÀNG ĐÃ ĐƯỢC NÂNG CẤP ---
  const handleCancelOrder = () => {
    if (!order) return;

    // 2. SỬ DỤNG MODAL.CONFIRM
    Modal.confirm({
      title: 'Xác nhận hủy đơn hàng',
      content: `Bạn có chắc chắn muốn hủy đơn hàng #${order.id} không?`,
      okText: 'Xác nhận hủy',
      cancelText: 'Đóng',
      okType: 'danger',
      onOk: async () => {
        try {
            const localUserStr = localStorage.getItem('user');
            const token = localUserStr ? JSON.parse(localUserStr).token : null;
            const response = await fetch(`http://localhost:8080/api/orders/${order.id}/cancel`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const json = await response.json();
            
            if (response.ok && json.status === 'success') {
                message.success("Hủy đơn hàng thành công!"); // 3. THAY THẾ ALERT
                setOrder({ ...order, status: 'CANCELLED' }); // Cập nhật UI
            } else {
                message.error(json.message || "Không thể hủy đơn hàng lúc này."); // 4. THAY THẾ ALERT
            }
        } catch (error) {
            message.error("Lỗi kết nối máy chủ."); // 5. THAY THẾ ALERT
        }
      }
    });
  };

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
          <span>Ngày đặt: <strong>{new Date(order.createdAt).toLocaleString('vi-VN')}</strong></span>
          <span className="od-status-badge">
            {STATUS_LABEL_MAP[order.status] || order.status}
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
              order.paymentStatus === 'PAID' 
                ? <span style={{ color: '#28a745', fontWeight: 'bold', backgroundColor: '#e6f4ea', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>✅ Đã thanh toán</span> 
                : <span style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#fce8e6', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>❌ Chưa thanh toán</span>
            ) : (
              <span style={{ color: '#fd7e14', fontWeight: 'bold', backgroundColor: '#fff3cd', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>⏳ Thu tiền mặt</span>
            )}
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm (MỖI SP ĐỀU CÓ NÚT BẤM) */}
      <div className="od-card">
        <h3 className="od-card-title">Sản phẩm đã mua</h3>
        <div className="od-product-list">
          {order.items.map((item) => (
            <div key={item.id} className="od-product-item">
              
              {/* SẢN PHẨM CHÍNH */}
              <div className="od-main-product" style={{ alignItems: 'flex-start' }}>
                <img 
                    src={item.imageUrl} 
                    alt={item.productName} 
                    className="od-product-img" 
                    onClick={() => navigate(`/product/${item.slug}`)}
                    style={{ cursor: 'pointer' }}
                />
                
                <div className="od-product-info">
                  <div 
                      className="od-product-name"
                      onClick={() => navigate(`/product/${item.slug}`)}
                      style={{ cursor: 'pointer', color: '#005baa' }}
                  >
                      {item.productName}
                  </div>
                  {item.variantName && <div className="od-product-variant">Phân loại: {item.variantName}</div>}
                  <div className="od-product-qty">Số lượng: x{item.quantity}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div className="od-product-price">
                    {Number(item.priceAtPurchase).toLocaleString('vi-VN')}đ
                  </div>
                  
                  {/* 🔥 CÁC NÚT ĐÁNH GIÁ / MUA LẠI NẰM CẠNH MỖI SẢN PHẨM */}
                  {order.status === 'DELIVERED' && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                       <button 
                           className="oh-btn oh-btn-outline" 
                           style={{ padding: '4px 12px', fontSize: '12px' }} 
                           onClick={() => navigate(`/product/${item.slug}`)} 
                       >
                           Đánh giá
                       </button>
                       <button 
                           className="oh-btn oh-btn-primary" 
                           style={{ padding: '4px 12px', fontSize: '12px' }} 
                           onClick={() => navigate(`/product/${item.slug}`)} 
                       >
                           Mua lại
                       </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SẢN PHẨM COMBO ĐI KÈM */}
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

      {/* THANH CÔNG CỤ Ở ĐÁY TRANG (Chỉ còn nút Hủy) */}
      <div className="od-card od-action-card" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '15px' }}>
          {order.status === 'PENDING' && (
              <button className="oh-btn oh-btn-danger" onClick={handleCancelOrder}>Hủy đơn hàng</button>
          )}
      </div>

    </div>
  );
};

export default OrderDetail;