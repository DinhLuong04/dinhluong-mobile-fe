import React, { useState } from "react";
import type { CartItem as CartItemType } from "../../types/Product.types"; 
import { OrderSummary } from "../../components/Cart/OrderSummary/OrderSummary";
import { CartItem } from "../../components/Cart/CartItem/CartItem";
import { CartAlert } from "../../components/Cart/CartAlert/CartAlert";

// --- DỮ LIỆU MẪU ---
const INITIAL_PRODUCTS: CartItemType[] = [
  {
    id: 1,
    name: "Điện thoại Nokia 105 DS Pro 4G Đen TA-1538 128MB Đen",
    sku: "TA-1538",
    image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/2023_8_14_638276308842946387_nokia-105-ds-pro-4g-den-5.jpg",
    colorName: "Đen",
    slug: "nokia-105-ds-pro-4g",
    price: 690000,
    originalPrice: 0,
    quantity: 1,
    checked: true,
    combos: [
        { id: "combo-nokia-1", name: "Combo Sim TD149 kèm Bảo hành", price: 199000, originalPrice: 349000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/sticker_2f113e56cd.png", checked: false },
        { id: "combo-nokia-2", name: "Combo eSIM TD149 kèm Bảo hành", price: 199000, originalPrice: 349000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/sticker_2f113e56cd.png", checked: false }
    ]
  },
  {
    id: 2,
    name: "iPhone 17 Pro Max 256GB Xanh Đậm",
    sku: "IP17PM-BLUE",
    image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/iphone_17_pro_max_deep_blue_1_eea0b1d2e9.png",
    colorName: "Xanh Đậm",
    slug: "iphone-17-pro-max",
    price: 37690000,
    originalPrice: 37990000,
    quantity: 1,
    checked: true,
    combos: [
        { id: "combo-ip17-1", name: "Gói Phụ kiện Chuẩn", price: 899000, originalPrice: 1388000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/combo_chuan_ip17prm_ca9cd4eb52.png", checked: true }
    ]
  },
  {
    id: 3,
    name: "iPhone 16 Pro Max 256GB Titan Sa Mạc",
    sku: "IP16PM-DESERT",
    image: "https://cdn2.fptshop.com.vn/unsafe/128x0/filters:format(webp):quality(75)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
    colorName: "Titan Sa Mạc",
    slug: "iphone-16-pro-max",
    price: 32490000,
    originalPrice: 34290000,
    quantity: 2,
    checked: true,
    combos: [
        { id: "combo-ip16-1", name: "Gói Phụ kiện iFan", price: 2437000, originalPrice: 0, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/Goi_PK_i_Fan_i_Phone_16_Pro_Max_52d5526043.png", checked: false },
        { id: "combo-ip16-2", name: "Gói Phụ kiện Chuẩn", price: 859000, originalPrice: 1388000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/Goi_PK_Chuan_i_Phone_16_Pro_Max_8c5690c448.png", checked: false },
        { id: "combo-ip16-3", name: "Combo Sim TD199 kèm bảo hành", price: 249000, originalPrice: 399000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/sticker_2f113e56cd.png", checked: false },
        { id: "combo-ip16-4", name: "Combo eSim TD199 kèm bảo hành", price: 249000, originalPrice: 399000, image: "https://cdn2.fptshop.com.vn/unsafe/96x0/filters:format(webp):quality(75)/sticker_2f113e56cd.png", checked: false }
    ]
  }
];

const CartPage = () => {
  const [products, setProducts] = useState<CartItemType[]>(INITIAL_PRODUCTS);

  // State quản lý Popup
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  // --- LOGIC XỬ LÝ SẢN PHẨM ---
  const updateQuantity = (id: number | string, val: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: val } : p));
  };

  const toggleCheck = (id: number | string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
  };

  const toggleAll = (isChecked: boolean) => {
    setProducts(prev => prev.map(p => ({ ...p, checked: isChecked })));
  };

  // Logic Toggle Combo (Đã sửa lỗi Cannot find name)
  const toggleCombo = (productId: number | string, comboId: number | string) => {
    setProducts(prev => prev.map(p => {
        if (p.id !== productId || !p.combos) return p;
        const updatedCombos = p.combos.map(c => 
            c.id === comboId ? { ...c, checked: !c.checked } : c
        );
        return { ...p, combos: updatedCombos };
    }));
  };

  // Logic Xóa 1 sản phẩm (Gọi Popup)
  const removeProduct = (id: number | string) => {
    setAlertState({
        isOpen: true,
        message: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
        onConfirm: () => {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    });
  };

  // Logic Xóa nhiều sản phẩm (Gọi Popup) - (Đã xóa phiên bản trùng lặp bị lỗi)
  const handleRemoveSelected = () => {
    const selectedItems = products.filter(p => p.checked);

    if (selectedItems.length === 0) {
        setAlertState({
            isOpen: true,
            message: "Vui lòng chọn ít nhất một sản phẩm để xóa!",
            onConfirm: () => {} 
        });
        return;
    }

    setAlertState({
        isOpen: true,
        message: `Bạn có chắc chắn muốn xóa ${selectedItems.length} sản phẩm đã chọn khỏi giỏ hàng?`,
        onConfirm: () => {
            setProducts(prev => prev.filter(p => !p.checked));
        }
    });
  };

  // --- TÍNH TOÁN TIỀN ---
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

  return (
    <div className="min-h-screen bg-gray-100 py-4 font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* --- ĐÃ THÊM POPUP VÀO ĐÂY --- */}
        <CartAlert 
            isOpen={alertState.isOpen}
            message={alertState.message}
            onConfirm={alertState.onConfirm}
            onClose={() => setAlertState(prev => ({ ...prev, isOpen: false }))}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    className="h-5 w-5 cursor-pointer accent-red-600" 
                    checked={isAllChecked} 
                    onChange={(e) => toggleAll(e.target.checked)} 
                />
                <span className="font-medium">
                    {isAllChecked 
                        ? `Chọn tất cả (${products.length})` 
                        : `Đã chọn (${selectedCount}/${products.length})`
                    }
                </span>
              </div>
              
              <button 
                className={`text-gray-400 hover:text-red-500 transition-colors ${products.filter(p => p.checked).length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRemoveSelected}
                title="Xóa các sản phẩm đã chọn"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
              </button>
            </div>

            {/* List Items */}
            <div className="space-y-4">
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
                  <div className="text-center py-10 bg-white rounded-xl">
                      <p className="text-gray-500">Giỏ hàng trống</p>
                  </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
             <OrderSummary 
                totalPrice={totalPrice + comboPrice} 
                totalDiscount={totalDiscount}
                finalPrice={finalPrice}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;