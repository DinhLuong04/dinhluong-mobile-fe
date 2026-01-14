const envUrl = import.meta.env.VITE_API_URL;
export const API_CONFIG={
    BASE_URL: envUrl,

    AUTH :{
        LOGIN:'auth/login',
        REGISTER:'auth/register'
    }
} as const