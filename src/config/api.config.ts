const envUrl = import.meta.env.VITE_API_URL;
export const API_CONFIG={
    BASE_URL: envUrl,

    AUTH :{
        LOGIN:'auth/login',
        REGISTER:'auth/register',
        LOGIN_GOOGLE:'auth/google-login',
        LOGIN_FACEBOOK:'auth/facebook-login'
        
    },
    PRODUCTS :{
        GET_LIST: 'products', 
        GET_DETAIL: (slug: string) => `products/${slug}`,
        GET_BATCH: 'products/batch'
    }
} as const