
import { IconOverview, IconProfile, IconWarranty, IconSupport, IconTerms } from './AccountNavIcons';

export const navItems = [
    {
        label: "Tổng quan",
        href: "/member",
        elementIcon: <IconOverview />,
        isMobileOnly: true
    },
    {
        label: "Thông tin tài khoản",
        href: "/member/profile",
        elementIcon: <IconProfile />,
        isMobileOnly: true
    },
    {
        label: "Mã giảm giá",
        href: "/member/voucher",
        imgIcon: "https://cdn-static.smember.com.vn/_next/static/media/promotion-icon.99af272d.svg",
        isMobileOnly: false
    },
    {
        label: "Lịch sử mua hàng",
        href: "/member/order",
        imgIcon: "https://cdn-static.smember.com.vn/_next/static/media/history-icon.2ebe1813.svg",
        isMobileOnly: false
    },
    {
        label: "Sổ địa chỉ",
        href: "/member/profile", 
        imgIcon: "https://cdn-static.smember.com.vn/_next/static/media/address-icon.169a4d95.svg",
        isMobileOnly: false
    },
    {
        label: "Chính sách bảo hành",
        href: "#", 
        elementIcon: <IconWarranty />,
        isMobileOnly: true,
        external: true
    },
    {
        label: "Góp ý - Hỗ trợ",
        href: "/member/suport",
        elementIcon: <IconSupport />,
        isMobileOnly: true
    },
    {
        label: "Điều khoản sử dụng",
        href: "#", 
        elementIcon: <IconTerms />,
        isMobileOnly: true,
        external: true
    }
];