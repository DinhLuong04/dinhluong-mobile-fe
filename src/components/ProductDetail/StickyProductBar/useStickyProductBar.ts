import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { cartService } from '../../../service/cartService'; 

interface UseStickyProductBarProps {
    image?: string;
    name?: string;
    price: number;
    originalPrice: number;
    productVariantId?: number | null;
    stock: number;
    colorName: string;
    rom: string;
}

export const useStickyProductBar = ({
    image, name, price, originalPrice, productVariantId, stock, colorName, rom
}: UseStickyProductBarProps) => {
    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const DEFAULT_IMAGE = "https://placehold.co/100x100?text=No+Image";
    const displayImage = image && image.trim() !== "" ? image : DEFAULT_IMAGE;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const discountPercent = useMemo(() => {
        if (originalPrice > price && originalPrice > 0) {
            return Math.round(((originalPrice - price) / originalPrice) * 100);
        }
        return 0;
    }, [price, originalPrice]);

    const handleAddToCart = async () => {
        if (!productVariantId) return message.warning("Vui lòng chọn phiên bản sản phẩm!");
        if (stock <= 0) return message.warning("Sản phẩm này hiện đang tạm hết hàng!");

        const userStr = localStorage.getItem('user'); 
        if (!userStr) {
            setLoginMessage("Vui lòng đăng nhập để thêm sản phẩm này vào giỏ hàng nhé!");
            setShowLoginModal(true);
            return;
        }

        try {
            await cartService.addToCart({
                productVariantId: productVariantId,
                quantity: 1,
                comboVariantIds: []
            });

            message.success("Đã thêm sản phẩm vào giỏ hàng!");
            window.dispatchEvent(new Event('cartUpdated')); 
        } catch (error: any) {
            console.error("Lỗi:", error);
            message.error(error.message || "Có lỗi xảy ra khi thêm vào giỏ hàng!");
        }
    };

    const handleBuyNow = () => {
        if (!productVariantId) return message.warning("Vui lòng chọn phiên bản sản phẩm trước khi mua!");
        if (stock <= 0) return message.warning("Sản phẩm này hiện đang tạm hết hàng!");

        const userStr = localStorage.getItem('user'); 
        if (!userStr) {
            setLoginMessage("Vui lòng đăng nhập để tiến hành thanh toán!");
            setShowLoginModal(true);
            return;
        }

        const buyNowItem = {
            id: `buy_now_${productVariantId}`, 
            productVariantId: productVariantId,
            name: name,
            colorName: colorName,
            rom: rom,
            price: price,
            originalPrice: originalPrice > 0 ? originalPrice : price,
            quantity: 1, 
            thumbnail: displayImage, 
            checked: true,
            combos: [] 
        };

        const checkoutPayload = {
            idsForBackend: [{ variantId: productVariantId, quantity: 1, comboIds: [] }],
            uiData: {
                items: [buyNowItem],
                summary: {
                    totalPrice: buyNowItem.originalPrice,
                    totalDiscount: Math.max(0, buyNowItem.originalPrice - buyNowItem.price),
                    finalPrice: buyNowItem.price
                }
            }
        };

        localStorage.setItem('CHECKOUT_PAYLOAD', JSON.stringify(checkoutPayload));
        navigate('/Checkout'); 
    };
    
    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate('/login');
    };
    return {
        showLoginModal, setShowLoginModal, loginMessage,
        displayImage, formatCurrency, discountPercent,
        handleAddToCart, handleBuyNow, handleLoginRedirect
    };
};