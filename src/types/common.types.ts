export interface ApiResponse<T> {
    status: string;
    code: number;
    message: string;
    timestamp: string;
    data: T;
}

export interface SortObject {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface PageableObject {
    offset: number;
    sort: SortObject;
    paged: boolean;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
}