import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { userService } from '../../../service/userService';
import type { UserProfileStatsResponse } from '../../../types/user.types';

export const useAccountHeader = () => {
    const { user, isLogin } = useAuth(); 
    const [userData, setUserData] = useState<UserProfileStatsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true; 

        const fetchUserData = async () => {
            if (!isLogin) {
                if (isMounted) setLoading(false);
                return;
            }

            try {
                if (isMounted) setLoading(true);
                const response = await userService.getProfileStats();
                if (isMounted) setUserData(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy thông kê hồ sơ:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [isLogin]);

    return {
        user,
        userData,
        loading
    };
};