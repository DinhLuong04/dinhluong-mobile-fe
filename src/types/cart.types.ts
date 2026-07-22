export interface CartComboItem {
    id: number | string;
    productVariantId?: number | string;
    image?: string;
    name?: string;
    price: number;
    originalPrice?: number;
    checked?: boolean;
    thumbnail?: string;
}

export interface CartItemType {
    id: number | string;
    productVariantId: number;
    sku?: string;         
    name: string;
    slug?: string;          
    image?: string;        
    colorName?: string;
    rom?: string;
    
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