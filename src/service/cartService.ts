// Định nghĩa kiểu dữ liệu cho Payload gửi lên
export interface AddToCartPayload {
    productVariantId: number | string;
    quantity: number;
    comboVariantIds?: (number | string)[];
}

const API_BASE_URL = 'http://localhost:8080/api/cart';

// Hàm helper để lấy Header chứa Token
// Sửa lại hàm này trong file cartService.ts
const getAuthHeaders = (): Record<string, string> => {
    // Khởi tạo headers mặc định với Content-Type
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            // Chỉ gán thêm Authorization nếu có token
            if (user.token) {
                headers['Authorization'] = `Bearer ${user.token}`;
            }
        } catch (error) {
            console.error('Lỗi parse user từ localStorage', error);
        }
    }
    
    return headers;
};

// Hàm helper để lấy thông tin User (dùng khi cần lấy user.id)
const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const cartService = {
    /**
     * Thêm sản phẩm (và combo) vào giỏ hàng
     */
    addToCart: async (payload: AddToCartPayload) => {
        const user = getCurrentUser();
        
        if (!user) {
            throw new Error('Vui lòng đăng nhập để thực hiện chức năng này!');
        }

        // Tùy thuộc vào thiết kế API Backend của bạn, URL có thể cần /add hoặc /add/{userId}
        // Ở đây tôi giả sử endpoint là POST http://localhost:8080/api/cart/add
        const response = await fetch(`${API_BASE_URL}/add/${user.id}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...payload,
                userId: user.id // Gửi kèm userId nếu Backend yêu cầu trong body
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Lỗi khi thêm vào giỏ hàng');
        }

        // Dựa vào PromotionCombo, API này cần trả về cấu trúc có chứa: { data: { mainCartItemId: 123 } }
        return await response.json(); 
    },

    /**
     * Lấy danh sách giỏ hàng
     */
    getCart: async () => {
        const user = getCurrentUser();
        if (!user) throw new Error('Chưa đăng nhập');

        const response = await fetch(`${API_BASE_URL}/${user.id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!response.ok) throw new Error('Lỗi lấy dữ liệu giỏ hàng');
        return await response.json();
    },

    /**
     * Cập nhật số lượng sản phẩm
     */
    updateQuantity: async (cartItemId: number | string, quantity: number) => {
        const response = await fetch(`${API_BASE_URL}/update/${cartItemId}?quantity=${quantity}`, {
            method: 'PUT',
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('Lỗi cập nhật số lượng');
        return await response.json();
    },

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    removeCartItem: async (cartItemId: number | string) => {
        const response = await fetch(`${API_BASE_URL}/remove/${cartItemId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('Lỗi xóa sản phẩm');
        return response; // DELETE có thể không trả về JSON
    }
};