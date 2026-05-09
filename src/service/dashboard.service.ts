// src/services/dashboard.service.ts

// Hàm hỗ trợ lấy Token
const getAuthToken = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
};

// Cấu hình Header mặc định
const getHeaders = () => ({
    'Authorization': `Bearer ${getAuthToken()}`,
});

const BASE_URL = 'http://localhost:8080/api/admin/dashboard';

export const dashboardService = {
    // 1. Hàm lấy dữ liệu thống kê
    getDashboardData: async (timeFilter: string) => {
        const response = await fetch(`${BASE_URL}?time=${timeFilter}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        
        const json = await response.json();
        if (response.ok && json.status === 'success') {
            return json.data;
        } else {
            throw new Error(json.message || "Lỗi từ server");
        }
    },

    // 2. Hàm gọi API lấy file Excel (luồng byte)
    exportExcel: async (timeFilter: string) => {
        const response = await fetch(`${BASE_URL}/export?time=${timeFilter}`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error("Lỗi tải file từ server");
        }
        
        // Trả về dữ liệu dạng Blob (File)
        return await response.blob();
    }
};