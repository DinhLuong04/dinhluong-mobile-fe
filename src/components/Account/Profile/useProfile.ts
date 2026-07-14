// useProfile.ts
import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { userService } from '../../../service/userService';
import { addressService } from '../../../service/addressService';

export const useProfile = () => {
  const [addressList, setAddressList] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState(() => {
    const userStr = localStorage.getItem('user');
    const localUser = userStr ? JSON.parse(userStr) : null;
    
    return {
      avatar: localUser?.avatarUrl || localUser?.avatar || "https://cdn-static.smember.com.vn/_next/static/media/avata-ant.b574f3e9.svg", 
      name: localUser?.name || "Người dùng",
      phone: localUser?.phone || "Chưa cập nhật",
      email: localUser?.email || "Chưa cập nhật",
      address: "Chưa có địa chỉ mặc định",
      typeAccount: localUser?.typeAccount || "NORMAL" 
    };
  });

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile();
      
      if (response.code === 200 && response.data) {
        const profileData = response.data;
        setUserInfo(prev => ({
          ...prev,
          name: profileData.name || "Người dùng",
          email: profileData.email || "Chưa cập nhật",
          phone: profileData.phone || "Chưa cập nhật",
          avatar: profileData.avatarUrl || prev.avatar
        }));
        
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const localUser = JSON.parse(userStr);
          localStorage.setItem('user', JSON.stringify({ ...localUser, ...profileData }));
        }
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin cá nhân", error);
    }
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await addressService.getAddresses();
      
      if (response.code === 200) {
        const data = response.data || [];
        setAddressList(data);
        const defaultAddr = data.find((a: any) => a.isDefault);
        if (defaultAddr) {
          const fullAddrString = [defaultAddr.street, defaultAddr.city, defaultAddr.province, defaultAddr.country]
                                  .filter(Boolean).join(", ");
          setUserInfo(prev => ({ ...prev, address: fullAddrString }));
        }
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách địa chỉ", error);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchUserProfile();
      await fetchAddresses();
    };
    loadInitialData();
  }, [fetchUserProfile, fetchAddresses]);

  const handleSetDefault = async (addressId: number) => {
    try {
      const response = await addressService.setDefault(addressId);
      if (response.code === 200) {
        message.success("Đã đặt làm địa chỉ mặc định");
        fetchAddresses(); 
      } else {
         message.error(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi set địa chỉ mặc định", error);
      message.error("Lỗi kết nối máy chủ");
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const response = await addressService.deleteAddress(addressId);
      if (response.code === 200) {
        message.success("Đã xóa địa chỉ");
        fetchAddresses(); 
      } else {
        message.error(response.message || "Có lỗi xảy ra khi xóa");
      }
    } catch (error) {
      console.error("Lỗi xóa địa chỉ", error);
      message.error("Lỗi kết nối máy chủ");
    }
  };

  return {
    userInfo,
    addressList,
    fetchUserProfile,
    fetchAddresses,
    handleSetDefault,
    handleDeleteAddress
  };
};