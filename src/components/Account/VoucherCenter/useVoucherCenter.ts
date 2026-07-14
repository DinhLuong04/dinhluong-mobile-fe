import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { voucherService } from '../../../service/voucherService';
import type { Voucher, UserVoucher } from '../../../types/voucher.types';

export const useVoucherCenter = () => {
    const [availableVouchers, setAvailableVouchers] = useState<Voucher[]>([]);
    const [myVouchers, setMyVouchers] = useState<UserVoucher[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchVouchers = useCallback(async () => {
        let isMounted = true;
        try {
            if (isMounted) setLoading(true);
            const [availableData, myData] = await Promise.all([
                voucherService.getAvailableVouchers(),
                voucherService.getMyVouchers()
            ]);

            if (isMounted) {
                setAvailableVouchers(availableData);
                setMyVouchers(myData);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu voucher:", error);
            if (isMounted) message.error("Không thể tải thông tin voucher.");
        } finally {
            if (isMounted) setLoading(false);
        }
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        const cleanup = fetchVouchers();
        return () => {
            cleanup.then(fn => fn());
        };
    }, [fetchVouchers]);

    const handleCollect = async (voucherId: number) => {
        try {
            const data = await voucherService.collectVoucher(voucherId);
            message.success(data.message || "Thu thập voucher thành công!");
            fetchVouchers(); 
        } catch (error: any) {
            console.error("Lỗi thu thập voucher:", error);
            message.warning(error?.message || "Không thể thu thập voucher lúc này.");
        }
    };

    const handleCopy = (code?: string) => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        message.success(`Đã sao chép mã: ${code}`);
    };

    return {
        availableVouchers, myVouchers, loading,
        handleCollect, handleCopy
    };
};