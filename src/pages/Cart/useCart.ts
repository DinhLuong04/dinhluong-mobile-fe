// src/pages/CartPage/useCart.ts
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import type { CartItemType, CheckoutPayload } from '../../types/cart.types';
import { cartService } from '../../service/cartService'; // Tận dụng service chuẩn

interface AlertState {
    isOpen: boolean;
    message: string;
    title?: string;
    type?: "alert" | "confirm";
    onConfirm: () => void;
}

export const useCart = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [alertState, setAlertState] = useState<AlertState>({
        isOpen: false,
        message: "",
        onConfirm: () => {},
    });

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart(); 
            if (data && data.items) {
                let fetchedItems: CartItemType[] = data.items;
                const autoCheckStr = localStorage.getItem('AUTO_CHECK_CART_ITEMS');
                if (autoCheckStr) {
                    try {
                        const autoCheckIds = JSON.parse(autoCheckStr);
                        fetchedItems = fetchedItems.map(item => {
                            if (autoCheckIds.includes(item.id) && item.stockQuantity > 0) {
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
        } catch (error: any) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        localStorage.removeItem('CHECKOUT_PAYLOAD');
        fetchCartData();
    }, []);

    const updateQuantity = async (id: number | string, val: number) => {
        const itemToUpdate = products.find(p => p.id === id);
        if (!itemToUpdate) return;

        if (val > itemToUpdate.stockQuantity) {
            message.warning(`Rất tiếc, sản phẩm này chỉ còn ${itemToUpdate.stockQuantity} chiếc!`);
            return;
        }

        const previousProducts = [...products];
        setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity: val } : p));

        try {
            await cartService.updateQuantity(id, val); 
        } catch (error: any) {
            message.error(error.message || "Tồn kho không đủ, vui lòng tải lại trang!");
            setProducts(previousProducts); 
        }
    };

    const removeProduct = (id: number | string) => {
        setAlertState({
            isOpen: true,
            message: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
            onConfirm: async () => {
                setAlertState(prev => ({ ...prev, isOpen: false }));
                try {
                    await cartService.removeCartItem(id);
                    setProducts(prev => prev.filter(p => p.id !== id));
                    window.dispatchEvent(new Event('cartUpdated'));
                } catch (error) {
                    console.error("Lỗi xóa sản phẩm:", error);
                    message.error("Không thể xóa sản phẩm");
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
                try {
                    await Promise.all(selectedItems.map(item => cartService.removeCartItem(item.id)));
                    setProducts(prev => prev.filter(p => !p.checked));
                    window.dispatchEvent(new Event('cartUpdated'));
                } catch (error) {
                    console.error("Lỗi xóa nhiều sản phẩm:", error);
                    message.error("Có lỗi xảy ra khi xóa danh sách sản phẩm");
                }
            }
        });
    };

    const toggleCheck = (id: number | string) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
    };

    const toggleAll = (isChecked: boolean) => {
        setProducts(prev => prev.map(p => ({
            ...p,
            checked: p.stockQuantity > 0 ? isChecked : false
        })));
    };

    const toggleCombo = (productId: number | string, comboId: number | string) => {
        setProducts(prev => prev.map(p => {
            if (p.id !== productId || !p.combos) return p;
            const updatedCombos = p.combos.map(c => c.id === comboId ? { ...c, checked: !c.checked } : c);
            return { ...p, combos: updatedCombos };
        }));
    };

    const totalPrice = products.reduce((sum, p) => p.checked ? sum + ((p.originalPrice || p.price) * p.quantity) : sum, 0);
    const productFinalPrice = products.reduce((sum, p) => p.checked ? sum + (p.price * p.quantity) : sum, 0);
    const comboPrice = products.reduce((sum, p) => {
        if (!p.checked || !p.combos) return sum;
        return sum + p.combos.reduce((cSum, c) => c.checked ? cSum + c.price : cSum, 0);
    }, 0);

    const finalPrice = productFinalPrice + comboPrice;
    const totalDiscount = Math.max(0, totalPrice - productFinalPrice);

    const purchasableProducts = products.filter(p => p.stockQuantity > 0);
    const isAllChecked = purchasableProducts.length > 0 && purchasableProducts.every(p => p.checked);
    const selectedCount = products.filter(p => p.checked).length;
    const isRemoveDisabled = selectedCount === 0;

    const handleCheckout = () => {
        const selectedItems = products.filter(p => p.checked);
        if (selectedItems.length === 0) {
            setAlertState({ isOpen: true, message: "Vui lòng chọn ít nhất 1 sản phẩm!", onConfirm: () => {} });
            return;
        }

        const itemsToCheckout = selectedItems.map(item => ({
            ...item,
            combos: item.combos ? item.combos.filter(c => c.checked) : []
        }));

        const checkoutPayload: CheckoutPayload = {
            idsForBackend: itemsToCheckout.map(item => ({
                variantId: item.productVariantId,
                quantity: item.quantity,
                comboIds: item.combos?.map(c => c.id) || []
            })),
            uiData: {
                items: itemsToCheckout,
                summary: { totalPrice: totalPrice + comboPrice, totalDiscount, finalPrice }
            }
        };

        localStorage.setItem('CHECKOUT_PAYLOAD', JSON.stringify(checkoutPayload));
        navigate('/checkout');
    };

    return {
        products, loading, alertState, setAlertState,
        isAllChecked, isRemoveDisabled, purchasableProducts, selectedCount,
        totalPrice, comboPrice, totalDiscount, finalPrice,
        updateQuantity, removeProduct, handleRemoveSelected,
        toggleCheck, toggleAll, toggleCombo, handleCheckout
    };
};