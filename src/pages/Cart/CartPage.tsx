import React from "react";
import { OrderSummary } from "../../components/Cart/OrderSummary/OrderSummary";
import { CartItem } from "../../components/Cart/CartItem/CartItem";
import { CartAlert } from "../../components/Cart/CartAlert/CartAlert";
import { useCart } from "./useCart";
import "./CartPage.css"; 

const CartPage: React.FC = () => {
    const {
        products, loading, alertState, setAlertState,
        isAllChecked, isRemoveDisabled, purchasableProducts, selectedCount,
        totalPrice, comboPrice, totalDiscount, finalPrice,
        updateQuantity, removeProduct, handleRemoveSelected,
        toggleCheck, toggleAll, toggleCombo, handleCheckout
    } = useCart();

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
                                        ? `Chọn tất cả (${purchasableProducts.length})` 
                                        : `Đã chọn (${selectedCount}/${purchasableProducts.length})`
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