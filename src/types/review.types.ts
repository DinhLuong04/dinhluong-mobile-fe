export interface BreakdownItemDTO {
    star?: number;
    percent?: number;
    count?: number;
}

export interface ReviewSummaryDTO {
    average?: number;
    totalCount?: number;
    breakdown?: BreakdownItemDTO[];
    currentUserHasPurchased?: boolean;
}

export interface ReviewMediaDTO {
    id?: number;
    image_url?: string;
    is_video?: boolean;
}

export interface ReviewReplyDTO {
    id?: number;
    author_name?: string;
    author_avatar?: string;
    is_admin_reply?: boolean;
    content?: string;
    created_at?: string;
    is_mine?: boolean;
}

export interface ReviewCommentDTO {
    id?: number;
    author_name?: string;
    author_avatar?: string;
    rating?: number;
    content?: string;
    created_at?: string;
    is_mine?: boolean;
    is_purchased?: boolean;
    images?: ReviewMediaDTO[];
    replies?: ReviewReplyDTO[];
}

export interface ReviewResponse {
    summary?: ReviewSummaryDTO;
    comments?: ReviewCommentDTO[];
}