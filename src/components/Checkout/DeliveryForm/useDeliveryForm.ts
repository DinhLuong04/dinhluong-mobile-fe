import { useState, useEffect, useCallback } from 'react';
import { addressService } from '../../../service/addressService';
import { type CheckoutFormData } from '../../../types/order.types'
import { type Address } from '../../../types/address.types'


export const useDeliveryForm = (
    formData: CheckoutFormData, 
    onChange: (field: keyof CheckoutFormData, value: string) => void
) => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getFullAddressString = (addr: Address) => {
        return [addr.street, addr.city, addr.province, addr.country].filter(Boolean).join(", ");
    };

    const fetchAddresses = useCallback(async (isMounted: boolean = true) => {
        try {
            if (isMounted) setIsLoading(true);
            const response = await addressService.getAddresses();
            
            const addressList: Address[] = response.data || [];
            
            if (isMounted) {
                setAddresses(addressList);
                
                if (!formData.receiverAddress && addressList.length > 0) {
                    const defaultAddr = addressList.find((a) => a.isDefault) || addressList[0];
                    const fullAddrString = getFullAddressString(defaultAddr);
                    onChange('receiverAddress', fullAddrString);
                }
            }
        } catch (error) {
            console.error("Lỗi lấy danh sách địa chỉ", error);
        } finally {
            if (isMounted) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return {
        addresses,
        isAddressModalOpen, setIsAddressModalOpen,
        isLoading,
        fetchAddresses: () => fetchAddresses(true),
        getFullAddressString
    };
};