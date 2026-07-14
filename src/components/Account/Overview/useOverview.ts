// src/components/Overview/useOverview.ts
import { useState, useEffect } from 'react';
import { message } from 'antd';
import { orderService } from '../../../service/orderService';
import type { OrderResponse } from '../../../types/order.types'; 

export interface Banner {
    id: number;
    src: string;
}

const STATUS_LABEL_MAP: Record<string, string> = {
    PENDING: "Chờ xác nhận", PROCESSING: "Đang xử lý", SHIPPED: "Đang giao hàng",
    DELIVERED: "Đã giao hàng", RETURNED: "Chuyển hoàn", CANCELLED: "Đã huỷ"
};

export const useOverview = () => {
    const [recentOrders, setRecentOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const banners: Banner[] = [
        { id: 2, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/edu-uu-dai-sinh-vien.jpg" },
        { id: 3, src: "https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/dac-quyen-online-home.jpg" },
    ];

    useEffect(() => {
        let isMounted = true; // Cờ an toàn

        const fetchRecentOrders = async () => {
            if (isMounted) setLoading(true);
            try {
                const data = await orderService.getRecentOrders();
                if (isMounted) setRecentOrders(data || []);
            } catch (error: any) {
                console.error("Lỗi tải đơn hàng gần đây:", error);
                if (isMounted) message.error(error.message || "Không thể tải danh sách đơn hàng gần đây.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchRecentOrders();

        return () => {
            isMounted = false; 
        };
    }, []);

    const formatCurrency = (amount: number) => {
        return Number(amount).toLocaleString('vi-VN') + 'đ';
    };

    const getStatusLabel = (status: string) => {
        return STATUS_LABEL_MAP[status] || status;
    };

    return { recentOrders, loading, banners, formatCurrency, getStatusLabel };
};