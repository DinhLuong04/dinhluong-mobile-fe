export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface TokenRefreshRequest {
    refreshToken: string;
}

export interface Oauth2LoginRequest {
    id_token?: string;
}

export interface LoginResponse {
    token?: string;
    refreshToken?: string;
    id?: number;
    email?: string;
    name?: string;
    avatar?: string;
    typeAccount?: string;
}
export interface ResetPasswordRequest {
    token?: string; 
    newPassword?: string;
    confirmPassword?: string;
}