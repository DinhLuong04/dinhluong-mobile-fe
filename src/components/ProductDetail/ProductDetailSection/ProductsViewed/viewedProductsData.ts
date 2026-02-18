// src/components/Home/ViewedProducts/ViewedProductsData.ts
import { type Product } from "../../../../types/Product.types"; // Import type Product

export const viewedProducts: Product[] = [
    {
        id: 1,
        slug: "iPhone-17-Pro-Max-256GB",
        name: "iPhone 17 Pro Max 256GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
        price: 37690000,
        originalPrice: 37990000,
        discountNote: "Giảm 300.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/screen_6_9_0bc42d6b8c.svg", label: "Màn hình 6.9\"", subLabel: "cực lớn" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_metal_439a7cab32.svg", label: "Thiết kế nguyên khối", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "A19 Pro", subLabel: "tản nhiệt hơi" },
        ],
        variants: [],
        colors: [
            { hex: "#FA8C4A" }, { hex: "#404555" }, { hex: "#EDEDEB" }
        ],
        
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg",
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-Kredivo-1744348489666.png"
        ],
        promotionText: "Giảm 500.000đ qua thẻ Sacombank"
    },
    {
        id: 2,
        slug: "cu-sac-nhanh-1-cong-45w-usb-c-pd-pps-gann-belkin",
        name: "Củ sạc nhanh 1 cổng 45W USB-C PD/PPS GanN Belkin",
        image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/cu_sac_nhanh_1_cong_45w_usb_c_pdpps_gann_belkin_1_93f41737d4.jpg",
        price: 559000,
        originalPrice: 699000,
        discountNote: "Giảm 140.000đ",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/Check_4b15630232.svg", label: "Sạc đa thiết bị", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_usb_c_PD_cd97197214.svg", label: "Sạc nhanh 50%", subLabel: "trong 30 phút" },
            { icon: "https://cdn2.fptshop.com.vn/svg/icon_type_c_65cbfa98a4.svg", label: "Chứng nhận", subLabel: "USB-C PD 3.1" },
        ],
        colors: [],
        variants: [],
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"
        ],
        promotionText: "Chủ thẻ MB Bank: Giảm 10%"
    },
    {
        id: 3,
        slug: "Xiaomi-Poco-X7-5G-12GB-512GB",
        name: "Xiaomi Poco X7 5G 12GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/xiaomi_poco_x7_den_vang_5_9d618c2219.png",
        price: 7490000,
        originalPrice: 9350000,
        discountNote: "Giảm 1.860.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/5_G_icon_f6da8067b2.svg", label: "Kết nối 5G", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "Dimensity 7300", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_screen_2df654a803.svg", label: "Màn hình cong", subLabel: "AMOLED" },
        ],
        colors: [
            { hex: "#B3CBBD" }, { hex: "#BEBFB1" }, { hex: "#131313" }
        ],
        variants: [],
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"
        ],
        promotionText: "Giảm 300.000đ cho đơn từ 6 triệu"
    },
    {
        id: 4,
        slug: "Xiaomi-Poco-X7-5G-12GB-512GB",
        name: "Xiaomi Poco X7 5G 12GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/xiaomi_poco_x7_den_vang_5_9d618c2219.png",
        price: 7490000,
        originalPrice: 9350000,
        discountNote: "Giảm 1.860.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/5_G_icon_f6da8067b2.svg", label: "Kết nối 5G", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "Dimensity 7300", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_screen_2df654a803.svg", label: "Màn hình cong", subLabel: "AMOLED" },
        ],
        colors: [
            { hex: "#B3CBBD" }, { hex: "#BEBFB1" }, { hex: "#131313" }
        ],
        variants: [],
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"
        ],
        promotionText: "Giảm 300.000đ cho đơn từ 6 triệu"
    },
    {
        id: 5,
        slug: "Xiaomi-Poco-X7-5G-12GB-512GB",
        name: "Xiaomi Poco X7 5G 12GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/xiaomi_poco_x7_den_vang_5_9d618c2219.png",
        price: 7490000,
        originalPrice: 9350000,
        discountNote: "Giảm 1.860.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/5_G_icon_f6da8067b2.svg", label: "Kết nối 5G", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "Dimensity 7300", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_screen_2df654a803.svg", label: "Màn hình cong", subLabel: "AMOLED" },
        ],
        colors: [
            { hex: "#B3CBBD" }, { hex: "#BEBFB1" }, { hex: "#131313" }
        ],
        variants: [],
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"
        ],
        promotionText: "Giảm 300.000đ cho đơn từ 6 triệu"
    },
    {
        id: 6,
        slug: "Xiaomi-Poco-X7-5G-12GB-512GB",
        name: "Xiaomi Poco X7 5G 12GB 512GB",
        image: "https://cdn2.fptshop.com.vn/unsafe/150x0/filters:format(webp):quality(75)/xiaomi_poco_x7_den_vang_5_9d618c2219.png",
        price: 7490000,
        originalPrice: 9350000,
        discountNote: "Giảm 1.860.000đ",
        installmentText: "Trả góp 0%",
        specs: [
            { icon: "https://cdn2.fptshop.com.vn/svg/5_G_icon_f6da8067b2.svg", label: "Kết nối 5G", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_chipset_5e2f01b828.svg", label: "Dimensity 7300", subLabel: "" },
            { icon: "https://cdn2.fptshop.com.vn/svg/ic_mobile_screen_2df654a803.svg", label: "Màn hình cong", subLabel: "AMOLED" },
        ],
        colors: [
            { hex: "#B3CBBD" }, { hex: "#BEBFB1" }, { hex: "#131313" }
        ],
        variants: [],
        promotions: [
            "https://cdn2.fptshop.com.vn/promotion/unsafe/48x0/filters:format(webp):quality(75)/images-promotion/logo-MB-Bank-1763574839734.jpeg"
        ],
        promotionText: "Giảm 300.000đ cho đơn từ 6 triệu"
    }
];