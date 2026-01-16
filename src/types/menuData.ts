// menuData.ts

// 1. Định nghĩa kiểu dữ liệu (Interface)
export interface TrendIcon {
  id: number;
  name: string;
  img: string;
  path: string;
}

export interface SubMenuColumn {
  title: string;
  items: string[];
}

export interface MegaMenuData {
  trendIcons: TrendIcon[];
  brands: string[];
  columns: SubMenuColumn[];
}

export interface CategoryItem {
  id: number;
  label: string;
  hasMegaMenu: boolean;
  path: string;
  // --- THÊM DÒNG NÀY ---
  bannerImages?: string[]; // Dấu ? nghĩa là không bắt buộc, có danh mục có, có danh mục không
}

// 2. Dữ liệu mẫu
export const phoneMegaData: MegaMenuData = {
  trendIcons: [
    { id: 1, name: "Điện thoại 5G", img: "https://cdn-icons-png.flaticon.com/512/545/545245.png", path: "/dt-5g" },
    { id: 2, name: "Điện thoại AI", img: "https://cdn-icons-png.flaticon.com/512/1693/1693746.png", path: "/dt-ai" },
    { id: 3, name: "Điện thoại gập", img: "https://cdn-icons-png.flaticon.com/512/545/545245.png", path: "/dt-gap" },
    { id: 4, name: "Gaming phone", img: "https://cdn-icons-png.flaticon.com/512/808/808439.png", path: "/gaming" },
    { id: 5, name: "Phổ thông 4G", img: "https://cdn-icons-png.flaticon.com/512/644/644458.png", path: "/pho-thong" },
  ],
  brands: [
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_iphone_ngang_eac93ff477.png",
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_samsung_ngang_1624d75bd8.png",
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_xiaomi_ngang_0f845d43e5.png",
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_oppo_ngang_e042784347.png",
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_honor_ngang_814fca59e4.png",
    "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_tecno_ngang_c587e5f1fa.png"
  ],
  columns: [
    {
      title: "Apple (iPhone)",
      items: ["iPhone 16 Series", "iPhone 15 Series", "iPhone 14 Series", "iPhone 13 Series"]
    },
    {
      title: "Samsung",
      items: ["Galaxy S Series", "Galaxy Z Series", "Galaxy A Series", "Galaxy M Series"]
    },
    {
      title: "Xiaomi",
      items: ["Xiaomi 14", "Redmi Note 13", "Poco Series", "Xiaomi Series"]
    },
    {
      title: "Mức giá",
      items: ["Dưới 2 triệu", "Từ 2 - 4 triệu", "Từ 4 - 7 triệu", "Trên 20 triệu"]
    }
  ]
};

export const mainCategories: CategoryItem[] = [
  { 
    id: 1, 
    label: "Điện Thoại", 
    hasMegaMenu: true, 
    path: "/dien-thoai",
    // --- THÊM DỮ LIỆU BANNER Ở ĐÂY ---
    bannerImages: [
        "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/RC_1_83129d2313.png",
        "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/opt1_36152d3691.png"
    ]
  },
  { id: 2, label: "Phụ Kiện", hasMegaMenu: false, path: "/phu-kien" }, // Các mục khác không có banner thì thôi
  { id: 3, label: "Máy cũ giá rẻ", hasMegaMenu: false, path: "/may-cu" },
  { id: 4, label: "Tin tức", hasMegaMenu: false, path: "/tin-tuc" },
];