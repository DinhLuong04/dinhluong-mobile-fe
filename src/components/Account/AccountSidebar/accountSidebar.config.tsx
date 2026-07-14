// src/components/AccountSidebar/accountSidebar.config.tsx
import { 
    IconOverview, IconHistory, IconProfile, IconVoucher, 
    IconWarranty, IconSupport, IconTerms 
} from './AccountSidebarIcons';

export const sidebarItems = [
    {
        label: "Tổng quan",
        href: "/member",
        icon: <IconOverview />,
        exact: true 
    },
    {
        label: "Lịch sử mua hàng",
        href: "/member/order",
        icon: <IconHistory />
    },
    {
        label: "Thông tin tài khoản",
        href: "/member/profile",
        icon: <IconProfile />
    },
    {
        label: "Trung tâm voucher",
        href: "/member/voucher",
        icon: <IconVoucher />
    },
    {
        label: "Chính sách bảo hành",
        href: "#",
        icon: <IconWarranty />,
        external: true
    },
    {
        label: "Góp ý - Phản hồi - Hỗ trợ",
        href: "#", 
        icon: <IconSupport />
    },
    {
        label: "Điều khoản sử dụng",
        href: "#",
        icon: <IconTerms />,
        external: true
    }
];