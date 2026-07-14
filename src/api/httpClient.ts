
import { API_CONFIG } from '../config/api.config';

interface ApiError {
    message?: string;
    code?: number;
    [key: string]: unknown;
}

export interface RequestConfig {
    params?: any;
    headers?: Record<string, string>;
    paramsSerializer?: (params: any) => string;
}

// Biến cục bộ để quản lý hàng đợi Refresh Token
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// ==========================================
// HÀM BỌC FETCH: TỰ ĐỘNG GẮN TOKEN VÀ REFRESH
// ==========================================
const fetchWithAuth = async (url: string, options: RequestInit, isRetry = false): Promise<Response> => {
    const authDataString = localStorage.getItem('user');
    const authData = authDataString ? JSON.parse(authDataString) : null;
    
    if (authData?.token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${authData.token}`
        };
    }

    let response = await fetch(url, options);

    // Nếu dính lỗi 401 và chưa từng retry
    if (response.status === 401 && !isRetry && authData?.refreshToken) {
        if (isRefreshing) {
            // Nếu đang có một request khác đi lấy token rồi, thì request này tạm chờ
            try {
                const token = await new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
                
                // Sau khi được resolve token mới, gọi lại request
                options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
                return await fetch(url, options);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        isRefreshing = true;

        try {
            console.log("Token hết hạn, đang âm thầm lấy token mới...");
            const refreshUrl = `${API_CONFIG.BASE_URL}/${API_CONFIG.AUTH.REFRESH_TOKEN}`;
            const refreshRes = await fetch(refreshUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: authData.refreshToken })
            });

            const refreshData = await refreshRes.json();

            if (refreshRes.ok && refreshData.code === 200) {
                const newToken = refreshData.data.accessToken || refreshData.data.token;
                authData.token = newToken;
                localStorage.setItem('user', JSON.stringify(authData));

                processQueue(null, newToken);

                options.headers = { ...options.headers, 'Authorization': `Bearer ${newToken}` };
                response = await fetch(url, options);
            } else {
                throw new Error("Refresh token bị từ chối");
            }
        } catch (error) {
            processQueue(error, null);
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth_expired'));
            
            const privatePages = ['/member', '/cart/checkout'];
            if (privatePages.some(page => window.location.pathname.startsWith(page))) {
                window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
            }
        } finally {
            isRefreshing = false;
        }
    }

    return response;
};

// ==========================================
// HÀM XỬ LÝ CHUNG CHO POST/PUT/DELETE
// ==========================================
const requestMutation = async <TResponse, TBody = unknown>(
    method: string, 
    endpoint: string, 
    data?: TBody, 
    config?: RequestConfig
): Promise<TResponse> => {
    
    // Tự động nhận diện FormData để điều chỉnh Header và Body
    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = { ...config?.headers };
    
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const body = isFormData ? (data as unknown as BodyInit) : JSON.stringify(data);

    const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}/${endpoint}`, {
        method,
        headers,
        body: data ? body : undefined,
    });

    const responseData = await response.json();

    if (!response.ok || (responseData.code && responseData.code !== 200)) {
        const errorData = responseData as ApiError;
        throw new Error(errorData.message || `${method} request failed`);
    }

    return responseData as TResponse;
}

// ==========================================
// MODULE HTTP CLIENT CHÍNH
// ==========================================
const httpClient = {
    get: async <TResponse>(endpoint: string, config?: RequestConfig): Promise<TResponse> => {
        let url = `${API_CONFIG.BASE_URL}/${endpoint}`;

        if (config?.params) {
            let queryString = "";
            if (config.paramsSerializer) {
                queryString = config.paramsSerializer(config.params);
            } else {
                const validParams: Record<string, string> = {};
                Object.keys(config.params).forEach(key => {
                    const value = config.params[key];
                    if (value !== undefined && value !== null && value !== '') {
                        validParams[key] = String(value);
                    }
                });
                queryString = new URLSearchParams(validParams).toString();
            }
            if (queryString) {
                url += `?${queryString}`;
            }
        }

        const response = await fetchWithAuth(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers, 
            },
        });

        const responseData = await response.json();

        if (!response.ok || (responseData.code && responseData.code !== 200)) {
            const errorData = responseData as ApiError;
            throw new Error(errorData.message || 'Get data failed');
        }

        return responseData as TResponse;
    },

    post: <TResponse, TBody = unknown>(endpoint: string, data: TBody, config?: RequestConfig) => 
        requestMutation<TResponse, TBody>('POST', endpoint, data, config),

    put: <TResponse, TBody = unknown>(endpoint: string, data: TBody, config?: RequestConfig) => 
        requestMutation<TResponse, TBody>('PUT', endpoint, data, config),

    delete: <TResponse>(endpoint: string, config?: RequestConfig) => 
        requestMutation<TResponse>('DELETE', endpoint, undefined, config),
};

export default httpClient;