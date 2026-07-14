export interface PlaceOrderItemRequest {
    variantId?: number;
    quantity?: number;
    comboIds?: number[];
}

export interface PlaceOrderRequest {
    userId?: number;
    receiverName?: string;
    receiverPhone?: string;
    receiverAddress?: string;
    note?: string;
    paymentMethod?: string;
    voucherCode?: string;
    items?: PlaceOrderItemRequest[];
}

export interface ComboItemDetail {
    variantId?: number;
    name?: string;
    imageUrl?: string;
    price?: number;
}

export interface OrderItemResponse {
    id?: number;
    productVariantId?: number;
    slug?: string;
    productName?: string;
    variantName?: string;
    imageUrl?: string;
    quantity?: number;
    priceAtPurchase?: number;
    comboItems?: ComboItemDetail[];
    available?: boolean;
}

export interface OrderResponse {
    id?: number;
    totalAmount?: number;
    status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'RETURNED' | 'CANCELLED';
    createdAt?: string;
    receiverName?: string;
    receiverPhone?: string;
    receiverAddress?: string;
    paymentMethod?: string;
    paymentStatus?: string;
    reason?: string;
    userNote?: string;
    deliveredAt?: string;
    discountAmount?: number;
    cancelledBy?: string;
    items?: OrderItemResponse[];
}