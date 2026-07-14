// src/components/OrderHistory/useOrderHistory.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { orderService } from '../../../service/orderService';
import type { OrderResponse } from '../../../types/order.types';

export const STATUS_MAP: Record<string, string> = {
    "Tất cả": "ALL", "Chờ xác nhận": "PENDING", "Đang chuẩn bị": "PROCESSING",
    "Chờ giao hàng": "SHIPPED", "Đã giao hàng": "DELIVERED", "Đã huỷ": "CANCELLED"
};

export const STATUS_LABEL_MAP: Record<string, string> = {
    PENDING: "Chờ xác nhận", PROCESSING: "Đang xử lý", SHIPPED: "Đang giao hàng",
    DELIVERED: "Đã giao hàng", RETURNED: "Chuyển hoàn", CANCELLED: "Đã huỷ"
};

export const useOrderHistory = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<string>("Tất cả");
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [isCancelModalVisible, setIsCancelModalVisible] = useState<boolean>(false);
    const [cancelingOrderId, setCancelingOrderId] = useState<number | null>(null);
    const [cancelReason, setCancelReason] = useState<string>('');

    const tabs = Object.keys(STATUS_MAP);

    useEffect(() => {
        let isMounted = true; // Cờ an toàn

        const fetchOrders = async () => {
            if (isMounted) setLoading(true);
            try {
                const statusParam = STATUS_MAP[activeTab];
                const data = await orderService.getMyOrders(statusParam !== "ALL" ? statusParam : undefined);
                if (isMounted) setOrders(data || []);
            } catch (error: any) {
                if (isMounted) message.error(error.message || "Không thể tải danh sách đơn hàng.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchOrders();

        return () => {
            isMounted = false;
        };
    }, [activeTab]);

    const showCancelModal = (orderId: number) => {
        setCancelingOrderId(orderId);
        setCancelReason('');
        setIsCancelModalVisible(true);
    };

    const confirmCancelOrder = async () => {
        if (!cancelingOrderId) return;
        
        // Ghi chú: Hãy đảm bảo Backend đã mở khóa nhận param cancelReason nhé!
        if (!cancelReason.trim()) {
            message.warning("Vui lòng nhập lý do hủy đơn!");
            return;
        }

        try {
            await orderService.cancelOrder(cancelingOrderId, cancelReason);
            message.success("Hủy đơn hàng thành công!");
            setOrders(prev => prev.map(o => o.id === cancelingOrderId ? { ...o, status: 'CANCELLED' } : o));
            setIsCancelModalVisible(false);
        } catch (error: any) {
            message.error(error.message || "Không thể hủy đơn hàng lúc này.");
        }
    };

    const handleGoToDetail = (orderId: number) => {
        navigate(`/member/order/${orderId}`);
    };

    const handleGoToProductDetail = (order: OrderResponse) => {
        const firstItem = order.items?.[0];
        
        if (firstItem && firstItem.available === false) {
            message.warning("Sản phẩm này hiện đã ngừng kinh doanh.");
            navigate(`/member/order/${order.id}`);
            return;
        }

        if (firstItem && firstItem.slug) {
            navigate(`/product/${firstItem.slug}`);
        } else {
            message.info("Không tìm thấy thông tin sản phẩm.");
            navigate(`/member/order/${order.id}`);
        }
    };

    return {
        tabs, activeTab, setActiveTab,
        orders, loading,
        isCancelModalVisible, setIsCancelModalVisible, cancelReason, setCancelReason,
        showCancelModal, confirmCancelOrder,
        handleGoToDetail, handleGoToProductDetail
    };
};