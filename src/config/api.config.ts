const envUrl = import.meta.env.VITE_API_URL;
export const API_CONFIG={
    BASE_URL: envUrl,

    AUTH :{
        LOGIN:'auth/login',
        REGISTER:'auth/register'
    },
    PRODUCTS :{
        GET_LIST: 'products', 
        GET_DETAIL: (slug: string) => `products/${slug}`
    }
} as const