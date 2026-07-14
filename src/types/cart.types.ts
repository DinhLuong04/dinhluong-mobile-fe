export interface CartComboItem {
    id: number | string;
    productVariantId?: number | string;
    name?: string;
    price: number;
    originalPrice?: number;
    checked?: boolean;
}

export interface CartItemType {
    id: number | string;
    productVariantId: number;
    name: string;
    colorName?: string;
    rom?: string;
    thumbnail?: string;
    
    price: number;
    originalPrice: number;
    quantity: number;
    stockQuantity: number;
    
    checked?: boolean;
    combos?: CartComboItem[];
}

export interface CheckoutSummary {
    totalPrice: number;
    totalDiscount: number;
    finalPrice: number;
}

export interface CheckoutPayload {
    idsForBackend: {
        variantId: number;
        quantity: number;
        comboIds: (number | string)[];
    }[];
    uiData: {
        items: CartItemType[];
        summary: CheckoutSummary;
    };
}