
const envUrl = import.meta.env.VITE_API_URL;
const WS_BASE_URL = import.meta.env.VITE_WS_URL;
export const API_CONFIG = {
    BASE_URL: envUrl,

    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        LOGIN_GOOGLE: 'auth/google-login',
        LOGIN_FACEBOOK: 'auth/facebook-login',
        FORGOT_PASSWORD: 'auth/forgot-password',
        RESET_PASSWORD: 'auth/reset-password',
        LOGOUT: 'auth/logout',            
        REFRESH_TOKEN: 'auth/refresh-token',
        RESEND_VERIFICATION: 'auth/resend-verification',
        VERIFY_EMAIL: 'auth/verify'
    },

    USER: {
        PROFILE: 'users/profile',
        CHANGE_PASSWORD: 'users/change-password',
        PROFILE_STATS: 'users/profile-stats'
    },

    PRODUCTS: {
        GET_LIST: 'products',
        GET_FEATURED: 'products/featured',
        GET_BATCH: 'products/batch',
        UPDATE_KEYWORD_SEARCH: 'products/update-keywordSearch',
        GET_DETAIL: (slug: string) => `products/${slug}`,
        GET_COMBOS: (slug: string) => `products/${slug}/combos`
    },

    CART: {
        GET_CART: (userId: number | string) => `cart/${userId}`,
        ADD: (userId: number | string) => `cart/add/${userId}`,
        UPDATE: (cartItemId: number| string) => `cart/update/${cartItemId}`,
        REMOVE: (cartItemId: number| string) => `cart/remove/${cartItemId}`
    },

    ORDERS: {
        PLACE_ORDER: 'orders/place',
        MY_ORDERS: 'orders/my-orders',
        RECENT_ORDERS: 'orders/recent',
        VNPAY_RETURN: 'orders/vnpay-return',
        GET_DETAIL: (orderId: number) => `orders/${orderId}`,
        CANCEL: (orderId: number) => `orders/${orderId}/cancel`
    },

    VOUCHERS: {
        AVAILABLE: 'vouchers/available',
        MY_VOUCHERS: 'vouchers/my-vouchers',
        COLLECT: (voucherId: number) => `vouchers/${voucherId}/collect`
    },

    ADDRESSES: {
        BASE: 'addresses', 
        UPDATE: (id: number) => `addresses/${id}`,
        DELETE: (id: number) => `addresses/${id}`,
        SET_DEFAULT: (id: number) => `addresses/${id}/default`
    },

    REVIEWS: {
        CREATE: 'reviews',
        GET_BY_PRODUCT: (slug: string) => `reviews/products/${slug}`
    },

    NOTIFICATIONS: {
        GET_ALL: 'notifications',
        UNREAD_COUNT: 'notifications/unread-count',
        MARK_READ: (id: number) => `notifications/${id}/read`,
        MARK_ALL_READ: 'notifications/read-all'
    },

    CHAT: {
        CHATBOT: 'chatbot',
        CONVERSATIONS: 'chat/conversations',
        HISTORY: (adminId: number) => `chat/history/${adminId}`,
        MARK_READ: (senderId: number) => `chat/read/${senderId}`
    },
    WS: {
        BASE_URL: `${WS_BASE_URL}/ws`,
        TOPICS: {
            NOTIFICATIONS: '/user/queue/notifications',
            CHAT_MESSAGES: '/user/queue/messages',     // Kênh nhận tin nhắn
            SEND_MESSAGE: '/app/chat.sendMessage'      // Kênh gửi tin nhắn
        }
    },
} as const;