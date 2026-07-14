import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { orderService } from '../../../service/orderService';
import type { OrderResponse } from '../../../types/order.types';

export const STATUS_LABEL_MAP: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    PROCESSING: "Đang xử lý",
    SHIPPED: "Đang giao hàng",
    DELIVERED: "Đã giao hàng",
    RETURNED: "Chuyển hoàn",
    CANCELLED: "Đã huỷ"
};

export const useOrderDetail = () => {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isCancelModalVisible, setIsCancelModalVisible] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState<string>('');

    useEffect(() => {
        let isMounted = true; 

        const fetchOrderDetail = async () => {
            if (!id) return;
            
            if (isMounted) setLoading(true);
            try {
                const data = await orderService.getOrderDetail(Number(id));
                if (isMounted) setOrder(data);
            } catch (err: any) {
                console.error("Lỗi lấy chi tiết đơn hàng:", err);
                if (isMounted) setError(err.message || "Không thể tải chi tiết đơn hàng.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchOrderDetail();

        return () => {
            isMounted = false; 
        };
    }, [id]);

    const showCancelModal = () => {
        setCancelReason('');
        setIsCancelModalVisible(true);
    };

    const confirmCancelOrder = async () => {
        if (!order || !order.id) return;
        
        if (!cancelReason.trim()) {
            message.warning("Vui lòng nhập lý do hủy đơn!");
            return;
        }

        try {
            await orderService.cancelOrder(order.id, cancelReason);
            message.success("Hủy đơn hàng thành công!"); 
            setOrder({ ...order, status: 'CANCELLED' }); 
            setIsCancelModalVisible(false);
        } catch (err: any) {
            console.error("Lỗi hủy đơn hàng:", err);
            message.error(err.message || "Lỗi kết nối máy chủ."); 
        }
    };

    return {
        order, loading, error, navigate,
        isCancelModalVisible, setIsCancelModalVisible, cancelReason, setCancelReason,
        showCancelModal, confirmCancelOrder
    };
};