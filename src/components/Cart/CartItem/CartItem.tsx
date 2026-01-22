import React from "react";
import type { CartItem as CartItemType, CartComboItem } from "../../../types/Product.types";
import { QuantityInput } from "../QuantityInput/QuantityInput";

interface Props {
  product: CartItemType;
  onUpdateQuantity: (id: number | string, val: number) => void;
  onToggleCheck: (id: number | string) => void;
  onRemove: (id: number | string) => void;
  onToggleCombo: (productId: number | string, comboId: number | string) => void;
}

const ComboItem = ({ item, onToggle }: { item: CartComboItem, onToggle: () => void }) => (
  <div className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
    <input 
        type="checkbox" 
        checked={item.checked} 
        onChange={onToggle}
        className="mt-1 h-4 w-4 cursor-pointer accent-red-600" 
    />
    <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
    <div className="flex flex-1 flex-col justify-between sm:flex-row">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{item.name}</p>
      </div>
      <div className="text-right">
        <span className="block text-sm font-bold text-gray-900">
          {item.price.toLocaleString("vi-VN")}đ
        </span>
        {item.originalPrice && item.originalPrice > item.price && (
          <span className="block text-xs text-gray-400 line-through">
            {item.originalPrice.toLocaleString("vi-VN")}đ
          </span>
        )}
      </div>
    </div>
  </div>
);

export const CartItem: React.FC<Props> = ({ 
    product, 
    onUpdateQuantity, 
    onToggleCheck, 
    onRemove, 
    onToggleCombo 
}) => {
  return (
    <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      
      {/* Container chính: Flex để chia cột trái (Info) và phải (Action) */}
      <div className="flex gap-4">
        
        {/* 1. Checkbox chọn sản phẩm */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => onToggleCheck(product.id)}
            className="h-5 w-5 cursor-pointer accent-red-600"
          />
        </div>
        
        {/* 2. Ảnh sản phẩm */}
        <div className="h-20 w-20 flex-shrink-0 rounded-lg border border-gray-200 p-1">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
        </div>

        {/* 3. Thông tin & Giá & Số lượng */}
        <div className="flex flex-1 flex-col justify-between">
          
          {/* Hàng 1: Tên SP + Nút Xóa (Luôn hiện) */}
          <div className="flex justify-between items-start">
            <div className="pr-4">
              <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                <a href={`/product/${product.slug}`} className="hover:text-red-600">{product.name}</a>
              </h3>
              <div className="mt-1">
                 <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    Màu: {product.colorName} <span className="text-[10px]">▼</span>
                 </span>
              </div>
            </div>

            {/* Nút Xóa (Trash Icon) - Luôn hiển thị */}
            <button 
                onClick={() => onRemove(product.id)} 
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Xóa sản phẩm"
            >
                
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 4H11.5C11.5 3.17157 10.8284 2.5 10 2.5C9.17157 2.5 8.5 3.17157 8.5 4ZM7.5 4C7.5 2.61929 8.61929 1.5 10 1.5C11.3807 1.5 12.5 2.61929 12.5 4H17.5C17.7761 4 18 4.22386 18 4.5C18 4.77614 17.7761 5 17.5 5H16.4456L15.2521 15.3439C15.0774 16.8576 13.7957 18 12.2719 18H7.72813C6.20431 18 4.92256 16.8576 4.7479 15.3439L3.55437 5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H7.5ZM5.74131 15.2292C5.85775 16.2384 6.71225 17 7.72813 17H12.2719C13.2878 17 14.1422 16.2384 14.2587 15.2292L15.439 5H4.56101L5.74131 15.2292ZM8.5 7.5C8.77614 7.5 9 7.72386 9 8V14C9 14.2761 8.77614 14.5 8.5 14.5C8.22386 14.5 8 14.2761 8 14V8C8 7.72386 8.22386 7.5 8.5 7.5ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5C11.2239 7.5 11 7.72386 11 8V14C11 14.2761 11.2239 14.5 11.5 14.5C11.7761 14.5 12 14.2761 12 14V8Z" fill="inherit"></path></svg>
              
            </button>
          </div>

          {/* Hàng 2: Giá & Bộ đếm số lượng */}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            
            {/* Giá tiền */}
            <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-start sm:gap-0">
              <span className="text-base font-bold text-red-600">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            {/* Bộ tăng giảm số lượng */}
            <div className="flex items-center">
              <QuantityInput
                value={product.quantity}
                onChange={(val) => onUpdateQuantity(product.id, val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phần Combo ưu đãi */}
      {/* Chỉ hiển thị Combo khi: Sản phẩm được chọn VÀ Có danh sách combo */}
      {product.checked && product.combos && product.combos.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pl-4 pt-4 lg:pl-12">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M12.4155 5.12246C12.3089 5.01889 12.0131 4.99589 12.0131 4.99589..." fill="#FF5C00"/></svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">Combo ưu đãi</span>
          </div>
          <div className="grid gap-3">
            {product.combos.map((combo) => (
              <ComboItem 
                key={combo.id} 
                item={combo} 
                onToggle={() => onToggleCombo(product.id, combo.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};