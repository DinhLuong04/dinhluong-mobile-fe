import React from "react";

interface Props {
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
}

export const OrderSummary: React.FC<Props> = ({ totalPrice, totalDiscount, finalPrice }) => {
  return (
    <div className="sticky top-4 h-fit space-y-4">
      {/* Box Quà tặng */}
      <div className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
           <span className="text-sm">Quà tặng</span>
        </div>
        <span className="cursor-pointer text-sm font-medium text-blue-600">Xem quà (7)</span>
      </div>

      {/* Box Ưu đãi */}
      <div className="flex items-center justify-between rounded bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
           <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
           <span className="text-sm">Chọn hoặc nhập ưu đãi</span>
        </div>
        <span className="text-gray-400">›</span>
      </div>

      {/* Box Đăng nhập điểm */}
      <div className="flex items-center gap-2 rounded border border-yellow-200 bg-yellow-50 p-3">
        <span className="text-yellow-600">●</span>
        <span className="text-sm text-gray-700">Đăng nhập để sử dụng điểm thưởng</span>
      </div>

      {/* Box Thông tin thanh toán */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-base font-semibold">Thông tin đơn hàng</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Tổng tiền</span>
            <span className="font-medium text-gray-900">{totalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tổng khuyến mãi</span>
            <span className="font-medium text-red-500">-{totalDiscount.toLocaleString("vi-VN")}đ</span>
          </div>
          <div className="border-b border-dashed border-gray-200 py-2"></div>
          <div className="flex justify-between text-base font-medium">
            <span>Cần thanh toán</span>
            <span className="font-bold text-red-600">{finalPrice.toLocaleString("vi-VN")}đ</span>
          </div>
          <div className="flex justify-between text-xs text-yellow-600">
             <span>Điểm thưởng</span>
             <span>+26,064</span>
          </div>
        </div>

        <button className="mt-4 w-full rounded bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-700">
          XÁC NHẬN ĐƠN
        </button>
        
        {/* SVG Decorative Wave Footer */}
        <div className="mt-2 w-full overflow-hidden text-gray-200">
            <svg viewBox="0 0 403 28" fill="none" className="w-full"><path fillRule="evenodd" clipRule="evenodd" d="M0 0H403V18.8171C403 21.7846 403 23.2683 402.487 24.4282C401.883 25.7925 400.792 26.8829 399.428 27.4867C398.268 28 396.785 28 393.817 28C391.534 28 390.392 28 389.652 27.808C388.208 27.4337..." fill="currentColor"/></svg>
        </div>
      </div>
    </div>
  );
};