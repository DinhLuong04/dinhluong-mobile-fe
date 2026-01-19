// src/components/ProductDetail/ProductReviews/ProductReviewsData.ts

export const ratingSummary = {
    average: 4.9,
    totalCount: 179,
    breakdown: [
        { star: 5, count: 173, percent: 97 },
        { star: 4, count: 4, percent: 2 },
        { star: 3, count: 0, percent: 0 },
        { star: 2, count: 0, percent: 0 },
        { star: 1, count: 2, percent: 1 },
    ]
};

export const filters = [
    { label: "Tất cả", value: "all", active: true },
    { label: "5 sao", value: 5, count: 173 },
    { label: "4 sao", value: 4, count: 4 },
    { label: "3 sao", value: 3, count: 0 },
    { label: "2 sao", value: 2, count: 0 },
    { label: "1 sao", value: 1, count: 2 },
];

export const comments = [
    {
        id: 1,
        user: "Hoàng trang",
        avatar: "H",
        time: "6 phút trước",
        content: "Iph 15pro max lên 17pro max thì cap thêm bnhieu vậy shop",
        replies: [
            {
                id: 101,
                user: "Đông Chí Linh",
                avatar: "https://cdn2.fptshop.com.vn/unsafe/48x0/filters:format(webp):quality(75)/estore-v2/img/comment-avatar-admin.png",
                isAdmin: true,
                time: "vài giây trước",
                content: "Chào chị Trang,<br/>Dạ Điện thoại iPhone 15 Pro Max 256GB bên em thu với giá lên đến 16.060.000đ, trợ giá dự kiến 3.000.000đ ạ. Sản phẩm iPhone 17 Pro Max 256GB hiện đang được tặng túi lộc 300,000đ áp dụng đến 15/01... Nếu cần thêm thông tin khác chị gọi tổng đài miễn phí 18006601."
            }
        ]
    },
    {
        id: 2,
        user: "Trang",
        avatar: "T",
        time: "15 giờ trước",
        content: "mình muốn đổi ip 13prm 512gb lên 17prm thì phải thêm bao nhiêu tiền ạ",
        replies: [
            {
                id: 102,
                user: "Đông Chí Linh",
                avatar: "https://cdn2.fptshop.com.vn/unsafe/48x0/filters:format(webp):quality(75)/estore-v2/img/comment-avatar-admin.png",
                isAdmin: true,
                time: "5 giờ trước",
                content: "Chào chị Trang,<br/>Dạ iPhone 13 Pro Max 512GB hiện bên em thu lên đến 9.660.000đ, hỗ trợ trợ giá thêm 1.500.000đ ạ..."
            }
        ]
    }
];