import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import type { ProductDetailResponse, VariantDetailDto, ColorOptionDto } from '../../../types/product.types';
import { cartService } from '../../../service/cartService';

export const useProductInfo = (product: ProductDetailResponse, onVariantChange?: (variantId: number | null) => void) => {
    const navigate = useNavigate();

    const [selectedStorage, setSelectedStorage] = useState<string>(() => product.storageOptions?.[0] || "");
    const [selectedColor, setSelectedColor] = useState<string>(() => product.colorOptions?.[0]?.name || "");

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");

    const selectedVariant = useMemo(() => {
        if (!product.variants || product.variants.length === 0) return null;
        return product.variants.find((v: VariantDetailDto) => {
            const variantRom = v.rom || "";
            const variantColor = v.colorName || "";
            return variantRom === selectedStorage && variantColor === selectedColor;
        });
    }, [selectedStorage, selectedColor, product.variants]);

    useEffect(() => {
        if (onVariantChange) {
            onVariantChange(selectedVariant ? Number(selectedVariant.id) : null);
        }
    }, [selectedVariant, onVariantChange]);

    const displayPrice = selectedVariant ? (selectedVariant.price || 0) : (product.price || 0);
    const currentSku = selectedVariant ? selectedVariant.sku : "---";
    const currentStock = selectedVariant?.stock ?? 0;
    const currentOriginalPrice = product.originalPrice || 0;

    const currentImage = product.colorOptions?.find((c: ColorOptionDto) => c.name === selectedColor)?.img 
                        || product.thumbnail 
                        || "https://placehold.co/100x100";

    const discountPercent = useMemo(() => {
        if (currentOriginalPrice > displayPrice && currentOriginalPrice > 0) {
            return Math.round(((currentOriginalPrice - displayPrice) / currentOriginalPrice) * 100);
        }
        return 0;
    }, [displayPrice, currentOriginalPrice]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const handleAddMainToCart = async () => {
        if (!selectedVariant) return message.warning("Vui lòng chọn phiên bản sản phẩm!");
        if (currentStock <= 0) return message.warning("Sản phẩm này hiện đang tạm hết hàng!");

        const userStr = localStorage.getItem('user'); 
        if (!userStr) {
            setLoginMessage("Vui lòng đăng nhập để thêm sản phẩm này vào giỏ hàng nhé!");
            setShowLoginModal(true);
            return;
        }

        try {
            await cartService.addToCart({
                productVariantId: selectedVariant.id!, 
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
        if (!selectedVariant) return message.warning("Vui lòng chọn phiên bản sản phẩm trước khi mua!");
        if (currentStock <= 0) return message.warning("Sản phẩm này hiện đang tạm hết hàng!");

        const userStr = localStorage.getItem('user'); 
        if (!userStr) {
            setLoginMessage("Vui lòng đăng nhập để tiến hành thanh toán!");
            setShowLoginModal(true);
            return;
        }

        const buyNowItem = {
            id: `buy_now_${selectedVariant.id}`, 
            productVariantId: selectedVariant.id,
            name: product.name,
            colorName: selectedColor,
            rom: selectedStorage,
            price: displayPrice,
            originalPrice: currentOriginalPrice > 0 ? currentOriginalPrice : displayPrice,
            quantity: 1, 
            thumbnail: currentImage,
            checked: true,
            combos: [] 
        };

        const checkoutPayload = {
            idsForBackend: [{ variantId: selectedVariant.id, quantity: 1, comboIds: [] }],
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

    return {
        selectedStorage, setSelectedStorage,
        selectedColor, setSelectedColor,
        showLoginModal, setShowLoginModal, loginMessage,
        displayPrice, currentSku, currentStock, currentOriginalPrice,
        discountPercent, formatCurrency,
        handleAddMainToCart, handleBuyNow
    };
};