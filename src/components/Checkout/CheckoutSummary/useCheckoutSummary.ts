import { useState } from 'react';
import { voucherService } from '../../../service/voucherService';

export const useCheckoutSummary = (summary: any, onVoucherApply: (v: any) => void) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [vouchers, setVouchers] = useState<any[]>([]);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
    
    const { 
        totalPrice = 0, 
        totalDiscount = 0, 
        finalPrice = 0, 
        appliedVoucher = null 
    } = summary || {};

    const openVoucherModal = async () => {
        try {
          
            const data = await voucherService.getMyVouchers();
            
            const usableVouchers = (data || [])
                .filter((item: any) => item.isUsed === false) 
                .map((item: any) => item.voucher);            

            setVouchers(usableVouchers); 
            setIsVoucherModalOpen(true);
        } catch (error) {
            console.error("Lỗi lấy voucher", error);
            setVouchers([]);
            setIsVoucherModalOpen(true); 
        }
    };

    const handleSelectVoucher = (voucher: any) => {
        let calcDiscount = 0;
        
        // Tính toán số tiền được giảm
        if (voucher.discountType === 'FIXED') {
            calcDiscount = voucher.discount;
        } else if (voucher.discountType === 'PERCENT') {
            calcDiscount = (totalPrice * voucher.discount) / 100;
        }

        // Đảm bảo không giảm quá số tiền khách cần trả
        if (calcDiscount > finalPrice) {
            calcDiscount = finalPrice;
        }

        // Đóng gói lại voucher kèm theo số tiền giảm thực tế để hiển thị
        const processedVoucher = { ...voucher, discountValue: calcDiscount };
        
        onVoucherApply(processedVoucher); 
        setIsVoucherModalOpen(false);
    };

    const finalCalculatedPrice = Math.max(0, finalPrice - (appliedVoucher?.discountValue || 0));

    return {
        isOptionsOpen, setIsOptionsOpen,
        vouchers, isVoucherModalOpen, setIsVoucherModalOpen,
        totalPrice, totalDiscount, finalPrice, appliedVoucher,
        finalCalculatedPrice,
        openVoucherModal, handleSelectVoucher
    };
};