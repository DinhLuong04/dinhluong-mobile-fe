import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { addressService } from '../../../../service/addressService';
import { locationService } from '../../../../service/locationService';

interface LocationItem {
    code: number | string;
    name: string;
}

interface UseAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveSuccess: () => void;
    initialData?: {
        id?: number;
        province?: string;
        city?: string;
        street?: string;
        isDefault?: boolean;
    };
}

export const useAddressModal = ({ isOpen, onClose, onSaveSuccess, initialData }: UseAddressModalProps) => {
    const [provinces, setProvinces] = useState<LocationItem[]>([]);
    const [districts, setDistricts] = useState<LocationItem[]>([]);
    const [wards, setWards] = useState<LocationItem[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<LocationItem>({ code: '', name: '' });
    const [selectedDistrict, setSelectedDistrict] = useState<LocationItem>({ code: '', name: '' });
    const [selectedWard, setSelectedWard] = useState<LocationItem>({ code: '', name: '' });
    
    const [streetDetail, setStreetDetail] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Load Tỉnh/Thành phố và đổ dữ liệu Edit nếu có
    useEffect(() => {
        let isMounted = true;

        const initModalData = async () => {
            if (!isOpen) {
                // Reset form khi đóng
                setSelectedProvince({ code: '', name: '' });
                setSelectedDistrict({ code: '', name: '' });
                setSelectedWard({ code: '', name: '' });
                setDistricts([]);
                setWards([]);
                setStreetDetail('');
                setIsDefault(false);
                return;
            }

            try {
                const provs = await locationService.getProvinces();
                if (!isMounted) return;
                setProvinces(provs);
                
                if (initialData) {
                    setIsDefault(initialData.isDefault || false);
                    
                    const p = provs.find((x: LocationItem) => x.name === initialData.province);
                    if (p) {
                        setSelectedProvince({ code: p.code, name: p.name });
                        
                        const dists = await locationService.getDistrictsByProvince(p.code);
                        if (!isMounted) return;
                        setDistricts(dists);
                        
                        const d = dists.find((x: LocationItem) => x.name === initialData.city);
                        if (d) {
                            setSelectedDistrict({ code: d.code, name: d.name });
                            
                            const wrds = await locationService.getWardsByDistrict(d.code);
                            if (!isMounted) return;
                            setWards(wrds);
                            
                            const w = wrds.find((x: LocationItem) => initialData.street?.includes(x.name));
                            if (w) {
                                setSelectedWard({ code: w.code, name: w.name });
                                const streetOnly = initialData.street!.replace(`, ${w.name}`, '').trim();
                                setStreetDetail(streetOnly);
                            } else {
                                setStreetDetail(initialData.street || '');
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Lỗi khởi tạo dữ liệu địa chỉ:", err);
            }
        };

        initModalData();

        return () => {
            isMounted = false;
        };
    }, [isOpen, initialData]);

    const handleProvinceChange = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        
        setSelectedProvince({ code, name: code ? name : '' });
        setSelectedDistrict({ code: '', name: '' });
        setSelectedWard({ code: '', name: '' });
        setWards([]);

        if (code) {
            const dists = await locationService.getDistrictsByProvince(code);
            setDistricts(dists);
        } else {
            setDistricts([]);
        }
    }, []);

    const handleDistrictChange = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        
        setSelectedDistrict({ code, name: code ? name : '' });
        setSelectedWard({ code: '', name: '' });

        if (code) {
            const wrds = await locationService.getWardsByDistrict(code);
            setWards(wrds);
        } else {
            setWards([]);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProvince.name || !selectedDistrict.name || !selectedWard.name || !streetDetail) {
            message.warning("Vui lòng điền đầy đủ địa chỉ!");
            return;
        }

        try {
            setIsLoading(true);

            const addressPayload = {
                province: selectedProvince.name,
                city: selectedDistrict.name,
                street: `${streetDetail}, ${selectedWard.name}`, 
                country: "Việt Nam",
                zipCode: "",
                isDefault: isDefault
            };

            const isEditing = !!initialData?.id;
            let response;

            if (isEditing) {
                response = await addressService.updateAddress(initialData.id!, addressPayload);
            } else {
                response = await addressService.addAddress(addressPayload);
            }

            if (response.code === 200 || response.status === 'success') {
                message.success(isEditing ? "Cập nhật địa chỉ thành công!" : "Thêm địa chỉ thành công!");
                onSaveSuccess();
                onClose(); 
            } else {
                message.error(response.message || "Lỗi khi lưu địa chỉ");
            }
        } catch (error: any) {
            console.error("Lỗi:", error);
            message.error(error?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        provinces, districts, wards,
        selectedProvince, selectedDistrict, selectedWard,
        streetDetail, setStreetDetail,
        isDefault, setIsDefault,
        isLoading,
        handleProvinceChange, handleDistrictChange, setSelectedWard,
        handleSubmit
    };
};