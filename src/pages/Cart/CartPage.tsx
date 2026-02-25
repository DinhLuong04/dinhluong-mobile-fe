import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import type { CartItem as CartItemType } from "../../types/Product.types"; 
import { OrderSummary } from "../../components/Cart/OrderSummary/OrderSummary";
import { CartItem } from "../../components/Cart/CartItem/CartItem";
import { CartAlert } from "../../components/Cart/CartAlert/CartAlert";
import "./CartPage.css"; 

const CartPage = () => {
  const navigate = useNavigate(); 

  const [products, setProducts] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    message: string;
    title?: string; 
    type?: "alert" | "confirm";
    onConfirm: () => void;
  }>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  // ==========================================
  // 1. API GET: LẤY DANH SÁCH GIỎ HÀNG TỪ SERVER
  // ==========================================
  const fetchCartData = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        setLoading(false);
        return;
    }
    const user = JSON.parse(userStr);

    try {
        const response = await fetch(`http://localhost:8080/api/cart/${user.id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data.data && data.data.items) {
                let fetchedItems = data.data.items;

                // XỬ LÝ TỰ ĐỘNG TÍCH CHỌN COMBO KHI THÊM TỪ CHI TIẾT SẢN PHẨM
                const autoCheckStr = localStorage.getItem('AUTO_CHECK_CART_ITEMS');
                if (autoCheckStr) {
                    try {
                        const autoCheckIds = JSON.parse(autoCheckStr);
                        fetchedItems = fetchedItems.map((item: CartItemType) => {
                            if (autoCheckIds.includes(item.id)) {
                                return {
                                    ...item,
                                    checked: true,
                                    combos: item.combos?.map(c => ({ ...c, checked: true }))
                                };
                            }
                            return item;
                        });
                        localStorage.removeItem('AUTO_CHECK_CART_ITEMS');
                    } catch (e) {
                        console.error("Lỗi parse AUTO_CHECK_CART_ITEMS:", e);
                    }
                }

                setProducts(fetchedItems);
            }
        }
    } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    // 🧹 Dọn dẹp payload cũ nếu user từ trang Thanh toán back lại
    localStorage.removeItem('CHECKOUT_PAYLOAD');
    fetchCartData();
  }, []);

  // ==========================================
  // 2. CẬP NHẬT SỐ LƯỢNG LÊN SERVER
  // ==========================================
  const updateQuantity = async (id: number | string, val: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: val } : p));
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    const user = JSON.parse(userStr);
    try {
        await fetch(`http://localhost:8080/api/cart/update/${id}?quantity=${val}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
    } catch (error) {
        console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  // ==========================================
  // 3. XÓA SẢN PHẨM KHỎI SERVER
  // ==========================================
  const removeProduct = (id: number | string) => {
    setAlertState({
        isOpen: true,
        message: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
        onConfirm: async () => {
            setAlertState(prev => ({ ...prev, isOpen: false }));
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            try {
                const response = await fetch(`http://localhost:8080/api/cart/remove/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                if (response.ok) {
                    setProducts(prev => prev.filter(p => p.id !== id));
                    window.dispatchEvent(new Event('cartUpdated')); 
                }
            } catch (error) {
                console.error("Lỗi xóa sản phẩm:", error);
            }
        }
    });
  };

  const handleRemoveSelected = () => {
    const selectedItems = products.filter(p => p.checked);
    if (selectedItems.length === 0) {
        setAlertState({ isOpen: true, message: "Vui lòng chọn ít nhất một sản phẩm để xóa!", onConfirm: () => {} });
        return;
    }
    setAlertState({
        isOpen: true,
        message: `Bạn có chắc chắn muốn xóa ${selectedItems.length} sản phẩm đã chọn?`,
        onConfirm: async () => {
            setAlertState(prev => ({ ...prev, isOpen: false }));
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            try {
                for (let item of selectedItems) {
                    await fetch(`http://localhost:8080/api/cart/remove/${item.id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    });
                }
                setProducts(prev => prev.filter(p => !p.checked));
                window.dispatchEvent(new Event('cartUpdated')); 
            } catch (error) {
                 console.error("Lỗi xóa nhiều sản phẩm:", error);
            }
        }
    });
  };

  // ==========================================
  // 4. XỬ LÝ GIAO DIỆN (CHECKBOX)
  // ==========================================
  const toggleCheck = (id: number | string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const toggleAll = (isChecked: boolean) => {
    setProducts(prev => prev.map(p => ({ ...p, checked: isChecked })));
  };

  const toggleCombo = (productId: number | string, comboId: number | string) => {
    setProducts(prev => prev.map(p => {
        if (p.id !== productId || !p.combos) return p;
        const updatedCombos = p.combos.map(c => 
            c.id === comboId ? { ...c, checked: !c.checked } : c
        );
        return { ...p, combos: updatedCombos };
    }));
  };

  // ==========================================
  // 5. TÍNH TOÁN TIỀN 
  // ==========================================
  const totalPrice = products.reduce((sum, p) => {
    if (!p.checked) return sum;
    const basePrice = p.originalPrice || p.price; 
    return sum + (basePrice * p.quantity);
  }, 0);

  const productFinalPrice = products.reduce((sum, p) => {
    return p.checked ? sum + (p.price * p.quantity) : sum;
  }, 0);

  const comboPrice = products.reduce((sum, p) => {
      if (!p.checked || !p.combos) return sum;
      const currentComboTotal = p.combos.reduce((cSum, c) => c.checked ? cSum + c.price : cSum, 0);
      return sum + currentComboTotal;
  }, 0);

  const finalPrice = productFinalPrice + comboPrice;
  const totalDiscount = Math.max(0, totalPrice - productFinalPrice);

  const isAllChecked = products.length > 0 && products.every(p => p.checked);
  const selectedCount = products.filter(p => p.checked).length;
  const isRemoveDisabled = selectedCount === 0;

  // ==========================================
  // 6. 🔥 XỬ LÝ THANH TOÁN (Chuyển trang Checkout)
  // ==========================================
  const handleCheckout = () => {
    const selectedItems = products.filter(p => p.checked);

    if (selectedItems.length === 0) {
        setAlertState({ isOpen: true, message: "Vui lòng chọn ít nhất 1 sản phẩm!", onConfirm: () => {} });
        return;
    }

    // 1. Lọc ra các sản phẩm được chọn (bỏ đi những combo không được tick để mang sang Checkout cho nhẹ)
    const itemsToCheckout = selectedItems.map(item => ({
        ...item,
        combos: item.combos ? item.combos.filter(c => c.checked) : []
    }));

    // 2. Gói toàn bộ dữ liệu cần thiết vào 1 Object
    const checkoutPayload = {
        // Dữ liệu dùng để Backend xử lý (Chỉ chứa ID)
       idsForBackend: itemsToCheckout.map(item => ({
            // 🔥 THAY ĐỔI: Sử dụng productVariantId thay vì id
            variantId: item.productVariantId,
            quantity: item.quantity,
            // Combo id vẫn lấy từ trường id của CartComboItemDto
            comboIds: item.combos?.map(c => c.id) || []
        })),

        // Dữ liệu dùng để Frontend vẽ giao diện (Hình ảnh, tên, giá, tổng tiền...)
        uiData: {
            items: itemsToCheckout,
            summary: {
                totalPrice: totalPrice + comboPrice,
                totalDiscount: totalDiscount,
                finalPrice: finalPrice
            }
        }
    };

    // 3. Lưu cục Object xịn xò này vào LocalStorage
    localStorage.setItem('CHECKOUT_PAYLOAD', JSON.stringify(checkoutPayload));

    // 4. Bay sang trang Thanh toán
    navigate('/checkout'); 
  };

  if (loading) return <div style={{textAlign: "center", padding: "100px"}}>Đang tải giỏ hàng...</div>;

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        
        <CartAlert 
            isOpen={alertState.isOpen}
            message={alertState.message}
            onConfirm={alertState.onConfirm}
            onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
        />

        <div className="cart-grid">
          
          <div className="cart-main">
            <div className="cart-header">
              <div className="header-left">
                <input 
                    type="checkbox" 
                    className="checkbox-custom" 
                    checked={isAllChecked} 
                    onChange={(e) => toggleAll(e.target.checked)} 
                />
                <span className="header-text">
                    {isAllChecked 
                        ? `Chọn tất cả (${products.length})` 
                        : `Đã chọn (${selectedCount}/${products.length})`
                    }
                </span>
              </div>
              
              <button 
                className={`btn-remove-selected ${isRemoveDisabled ? 'disabled' : ''}`}
                onClick={handleRemoveSelected}
                title="Xóa các sản phẩm đã chọn"
                disabled={isRemoveDisabled}
              >
                <svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
              </button>
            </div>

            <div className="cart-list">
              {products.length > 0 ? products.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  onUpdateQuantity={updateQuantity}
                  onToggleCheck={toggleCheck}
                  onRemove={removeProduct}
                  onToggleCombo={toggleCombo}
                />
              )) : (
                  <div className="cart-empty" style={{textAlign: "center", padding: "40px", backgroundColor: "#fff"}}>
                      <p>Giỏ hàng của bạn đang trống</p>
                      <a href="/" style={{color: "#cb1c22", fontWeight: "bold", textDecoration: "none", marginTop: "10px", display: "inline-block"}}>Tiếp tục mua sắm</a>
                  </div>
              )}
            </div>
          </div>

          <div className="cart-sidebar">
             {/* 🔥 Truyền các props vào OrderSummary */}
             <OrderSummary 
               totalPrice={totalPrice + comboPrice} 
               totalDiscount={totalDiscount}
               finalPrice={finalPrice}
               onCheckout={handleCheckout} 
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;