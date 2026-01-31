export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthData {
    token: string;
    id: number;
    email: string;
    name: string;
    avatar: string | null;
    typeAccount: string;
}

export interface ApiResponse<T> {
    status: string;
    code: number;
    message: string;
    timestamp: string;
    data: T;
}
export interface User {
    name: string;
    token?: string;
}


export type LoginResponse = ApiResponse<AuthData>;