import { useState, useEffect, useCallback } from 'react';
import { addressService } from '../../../service/addressService';

export const useDeliveryForm = (formData: any, onChange: (field: string, value: any) => void) => {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getFullAddressString = (addr: any) => {
        return [addr.street, addr.city, addr.province, addr.country].filter(Boolean).join(", ");
    };

    const fetchAddresses = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await addressService.getAddresses();
            
            const addressList = response.data || [];
            setAddresses(addressList);
            
            if (!formData.receiverAddress && addressList.length > 0) {
                const defaultAddr = addressList.find((a: any) => a.isDefault) || addressList[0];
                const fullAddrString = getFullAddressString(defaultAddr);
                onChange('receiverAddress', fullAddrString);
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách địa chỉ", error);
        } finally {
            setIsLoading(false);
        }
    }, [formData.receiverAddress, onChange]);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return {
        addresses,
        isAddressModalOpen, setIsAddressModalOpen,
        isLoading,
        fetchAddresses,
        getFullAddressString
    };
};