import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { orderService } from "../../service/orderService";
import type { PlaceOrderRequest } from "../../types/order.types";

export const useCheckout = () => {
  const navigate = useNavigate();

  const [checkoutItems] = useState<any[]>(() => {
    const payloadStr = localStorage.getItem("CHECKOUT_PAYLOAD");
    return payloadStr ? JSON.parse(payloadStr).uiData.items : [];
  });

  const [orderSummary, setOrderSummary] = useState(() => {
    const payloadStr = localStorage.getItem("CHECKOUT_PAYLOAD");
    return payloadStr
      ? { ...JSON.parse(payloadStr).uiData.summary, appliedVoucher: null }
      : {
          totalPrice: 0,
          totalDiscount: 0,
          finalPrice: 0,
          appliedVoucher: null,
        };
  });

  const [idsForBackend] = useState<any[]>(() => {
    const payloadStr = localStorage.getItem("CHECKOUT_PAYLOAD");
    return payloadStr ? JSON.parse(payloadStr).idsForBackend : [];
  });

  const [formData, setFormData] = useState(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : {};

    return {
      receiverName: user.name || "",
      receiverPhone: user.phone || "",
      receiverEmail: user.email || "",
      deliveryType: "shipping",
      receiverAddress: "",
      note: "",
      paymentMethod: "cod",
    };
  });

  
  useEffect(() => {
    const payloadStr = localStorage.getItem("CHECKOUT_PAYLOAD");
    if (!payloadStr) {
      navigate("/cart");
    }
  }, [navigate]);

 
  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVoucherApply = (voucher: any) => {
    setOrderSummary((prev) => ({ ...prev, appliedVoucher: voucher }));
  };

  
  const handlePlaceOrder = async () => {
    if (
      !formData.receiverName ||
      !formData.receiverPhone ||
      !formData.receiverAddress
    ) {
      return message.warning(
        "Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!",
      );
    }

    const userStr = localStorage.getItem("user");
    if (!userStr) return message.error("Vui lòng đăng nhập!");
    const user = JSON.parse(userStr);

    const requestBody: PlaceOrderRequest = {
      userId: user.id,
      receiverName: formData.receiverName,
      receiverPhone: formData.receiverPhone,
      receiverAddress: formData.receiverAddress,
      note: formData.note,
      paymentMethod: formData.paymentMethod,
      items: idsForBackend,
      voucherCode: orderSummary.appliedVoucher
        ? orderSummary.appliedVoucher.code
        : undefined,
    };

    const hideLoading = message.loading(
      "Hệ thống đang xử lý đơn hàng của bạn...",
      0,
    );

    try {
            const response = await orderService.placeOrder(requestBody);
            
            hideLoading();
            localStorage.removeItem('CHECKOUT_PAYLOAD');
                
            // Kiểm tra trạng thái thành công từ chuẩn ApiResponse của backend
            if (response.status === 'success' || response.code === 200) {
                
                // Nếu backend trả về kèm paymentUrl (dành cho VNPAY/Momo) thì redirect
                if (response?.paymentUrl) {
                    window.location.href = response.paymentUrl; 
                } else {
                    // Nếu là COD (paymentUrl = null) thì chuyển hướng trang kết quả COD
                    navigate('/payment/result?type=cod&status=success'); 
                }
            }

        } catch (error: any) {
            hideLoading();
            
            // 👉 KHỐI CATCH NÀY MỚI LÀ NƠI BẮT LỖI THỰC SỰ (Sập mạng, hết hàng 409, v.v.)
            console.error("Lỗi đặt hàng thực tế:", error);
            
            if (error?.code === 409 || error?.code === 400) {
                Modal.error({
                    title: 'Thông báo cập nhật giỏ hàng',
                    content: error.message || 'Một số sản phẩm trong đơn hàng vừa thay đổi tồn kho. Vui lòng kiểm tra lại!',
                    okText: 'Quay lại giỏ hàng',
                    onOk: () => {
                        localStorage.removeItem('CHECKOUT_PAYLOAD');
                        navigate('/cart');
                    }
                });
            } else {
                message.error(`Lỗi: ${error?.message || 'Có lỗi xảy ra khi tạo đơn'}`);
            }
        }
  };

  return {
    checkoutItems,
    orderSummary,
    formData,
    handleFormChange,
    handleVoucherApply,
    handlePlaceOrder,
  };
};
