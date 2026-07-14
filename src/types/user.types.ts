export interface UserProfileResponse {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
}

export interface ChangePasswordRequest {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export interface UserProfileStatsResponse {
    name?: string;
    phone?: string;
    rank?: string;
    updateDate?: string;
    orders?: number;
    money?: number;
    nextRankMoney?: string;
    nextRankName?: string;
    startDate?: string;
}