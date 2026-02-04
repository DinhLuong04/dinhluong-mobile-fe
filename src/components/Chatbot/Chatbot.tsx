import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot.css';

// 1. Định nghĩa kiểu dữ liệu khớp với JSON của bạn
interface ChatProductDto {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
    originalPrice?: number;
    discountLabel?: string;
    configSummary?: string;
}

interface Message {
    id: number;
    text: string;
    products?: ChatProductDto[];
    sender: 'user' | 'bot';
    timestamp: Date;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! Mình là trợ lý ảo DLM Store. 👋\nMình có thể giúp gì cho bạn? (Ví dụ: *Tìm điện thoại 10 triệu*, *So sánh iPhone 15 và S24*...)",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        // 1. Thêm tin nhắn User
        const newUserMsg: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");
        setIsLoading(true);

        // 2. GIẢ LẬP GỌI API (FIX CỨNG DỮ LIỆU TẠI ĐÂY)
        setTimeout(() => {
            // --- DỮ LIỆU MOCK BẠN GỬI ---
            const MOCK_DATA = {
                status: "success",
                code: 200,
                message: "Trả lời thành công",
                data: {
                    "answer": "Chào bạn, rất vui được hỗ trợ bạn so sánh hai siêu phẩm này! Xiaomi 15T và iPhone 17 Pro Max là hai lựa chọn cực kỳ hấp dẫn nhưng lại nằm ở hai phân khúc hoàn toàn khác biệt. Dưới đây là bảng so sánh chi tiết để bạn dễ hình dung:\n\n| Tiêu chí | Xiaomi 15T 5G 12GB 512GB | iPhone 17 Pro Max |\n| :------- | :----------------------- | :------------------ |\n| **Giá bán** | **14.490.000đ** (sau KM còn 13.990.000đ) ✅ | **37.690.000đ** (sau KM còn 37.390.000đ) |\n| **Chipset/Hiệu năng** | Dimensity 8400 Ultra | A19 Pro (có tản nhiệt hơi) 🏆 |\n| **Camera** | Ống kính Leica Summilux nổi bật | Hệ thống camera đỉnh cao (chuẩn Flagship) |\n| **Màn hình** | Màn hình chất lượng cao (phân khúc cận cao cấp) | 6.9 inch cực lớn, chất lượng hiển thị vượt trội 🏆 |\n| **Sạc nhanh** | Sạc nhanh 67W ✅ | (Thông thường chậm hơn, không công bố rõ) |\n| **Hệ điều hành** | Android (tùy biến cao) | iOS (Hệ sinh thái Apple tối ưu) 🏆 |\n| **Thiết kế** | Hiện đại, sang trọng | Nguyên khối cao cấp, bền bỉ 🏆 |\n\n**Kết luận:**\n\n*   **Bạn nên chọn Xiaomi 15T 5G** nếu bạn ưu tiên một chiếc điện thoại có mức giá cực kỳ phải chăng, sạc nhanh vượt trội và trải nghiệm chụp ảnh độc đáo với ống kính Leica. Đây là lựa chọn tuyệt vời trong phân khúc cận cao cấp.\n*   **Bạn nên chọn iPhone 17 Pro Max** nếu bạn có ngân sách thoải mái, mong muốn hiệu năng mạnh mẽ nhất thị trường, màn hình lớn tuyệt đẹp, trải nghiệm hệ điều hành iOS mượt mà cùng hệ sinh thái Apple, và một thiết kế, camera thuộc hàng đỉnh cao không giới hạn.",
                    //answer:"Tuyệt vời! 🔥 Bạn đã có một lựa chọn vô cùng thông minh khi quan tâm đến chiếc **Xiaomi 15T 5G 12GB 512GB** tại DLM Store! ✨ Đây thực sự là một \"quái vật hiệu năng\" với nhiều điểm nhấn cực kỳ đáng giá, hứa hẹn sẽ mang đến cho bạn những trải nghiệm đỉnh cao. Hãy cùng tôi đi sâu vào phân tích từng chi tiết nhé! 🚀\n\nĐầu tiên, phải kể đến trái tim của chiếc máy này: **Chipset Dimensity 8400 Ultra**! Đây không chỉ là một con chip mạnh mẽ mà còn là phiên bản \"Ultra\" được tối ưu đặc biệt. Với sức mạnh vượt trội này, Xiaomi 15T 5G có thể cân mọi tác vụ từ cơ bản đến nặng nhất một cách mượt mà và ổn định.\n*   **Chơi game:** Bạn là một game thủ ư? Vậy thì Dimensity 8400 Ultra chính là dành cho bạn! Máy này có thể \"chiến\" tốt tất cả các tựa game đồ họa khủng nhất hiện nay như **Genshin Impact, PUBG Mobile, Liên Quân Mobile hay Call of Duty Mobile** ở mức cài đặt đồ họa cao nhất mà vẫn duy trì khung hình ổn định, không giật lag. Tản nhiệt cũng được tối ưu để bạn có thể thỏa sức giải trí hàng giờ liền!\n*   **Đa nhiệm:** Với **12GB RAM**, bạn hoàn toàn có thể mở cùng lúc hàng chục ứng dụng, chuyển đổi qua lại mượt mà mà không lo tình trạng tải lại hay giật lag. Dung lượng **512GB bộ nhớ trong** cũng là một con số khổng lồ, cho phép bạn thoải mái lưu trữ hàng ngàn bức ảnh, video, cài đặt vô số game và ứng dụng mà không cần lo nghĩ về không gian.\n\nVề khả năng chụp ảnh, Xiaomi 15T 5G thực sự là một \"studio di động\" với **Ống kính Leica Summilux** danh tiếng! 📸\n*   **Chất lượng ảnh chuyên nghiệp:** Ống kính Leica Summilux mang đến chất lượng hình ảnh sắc nét đến từng chi tiết, màu sắc sống động và độ tương phản tuyệt vời. Dù là chụp phong cảnh hùng vĩ, chân dung xóa phông nghệ thuật hay những bức ảnh đời thường, bạn sẽ luôn có được những tác phẩm ấn tượng với hiệu ứng bokeh tự nhiên và khả năng xử lý ánh sáng đỉnh cao.\n*   **Chụp đêm ấn tượng:** Với công nghệ của Leica, máy cũng thể hiện xuất sắc trong điều kiện thiếu sáng, giúp bạn ghi lại những khoảnh khắc đêm rực rỡ mà không bị nhiễu hạt nhiều. Đây chắc chắn là lựa chọn lý tưởng cho những ai đam mê nhiếp ảnh và muốn sở hữu những bức ảnh chất lượng chuyên nghiệp!\n\nKhả năng sạc của máy cũng cực kỳ ấn tượng với **Sạc nhanh 67W**! ⚡\n*   Bạn sẽ không bao giờ phải lo lắng về việc hết pin giữa chừng. Với công suất sạc 67W, chỉ cần một khoảng thời gian ngắn cắm sạc là máy đã có đủ năng lượng để tiếp tục đồng hành cùng bạn cả ngày dài. Dù dung lượng pin cụ thể không được nêu, nhưng với công nghệ sạc nhanh này, bạn có thể tự tin sử dụng máy cho một ngày làm việc và giải trí cường độ cao, và nhanh chóng \"nạp đầy\" năng lượng khi cần.\n\nTóm lại, **Xiaomi 15T 5G 12GB 512GB** là một lựa chọn hoàn hảo cho:\n*   **Game thủ chuyên nghiệp** muốn trải nghiệm game mượt mà nhất.\n*   **Những người yêu thích nhiếp ảnh** muốn sở hữu những bức ảnh chất lượng Leica đỉnh cao.\n*   **Người dùng cần hiệu năng cao** để làm việc, giải trí đa nhiệm không giới hạn.\n\n**Tình trạng kho hàng hiện tại:**\nTại DLM Store, chiếc Xiaomi 15T 5G 12GB 512GB này đang có sẵn với hai tùy chọn màu sắc cực kỳ sang trọng: **Xám Titan và Be**. Cả hai phiên bản đều đang **còn hàng** để bạn lựa chọn đó ạ! ✨\n\n**Đặc biệt hơn nữa, DLM Store đang có chương trình khuyến mãi cực hấp dẫn dành cho sản phẩm này:**\n*   Bạn sẽ được **GIẢM NGAY 500.000đ** vào giá niêm yết!\n*   Thêm vào đó, chúng tôi còn hỗ trợ chương trình **TRẢ GÓP 0% LÃI SUẤT** để bạn có thể dễ dàng sở hữu siêu phẩm này mà không cần quá lo lắng về tài chính! 🎁\n\nĐừng chần chừ nữa! Hãy đến ngay DLM Store để trải nghiệm và rinh về chiếc Xiaomi 15T 5G 12GB 512GB đỉnh cao này nhé! Chúng tôi luôn sẵn lòng hỗ trợ bạn! 🎉",
                    //answer: "Chào bạn, DLM Store rất vui được tư vấn cho bạn một chiếc máy \"ngon\" đúng chuẩn yêu cầu tầm giá từ 10 triệu trở lên nhé! Với ngân sách này, bạn hoàn toàn có thể sở hữu những siêu phẩm công nghệ hàng đầu thế giới với hiệu năng vượt trội, camera đỉnh cao và thiết kế sang trọng. ✨\n\nDưới đây là một số lựa chọn \"cực phẩm\" mà DLM Store muốn giới thiệu đến bạn, đảm bảo bạn sẽ hài lòng:\n\n---\n\n### 👑 **Dành cho tín đồ công nghệ & muốn trải nghiệm sự khác biệt:**\n\n* **Samsung Galaxy Z Fold7 5G** (Giá chỉ còn từ **32.190.000đ** sau khi giảm khủng! 💥)\n    * **Điểm nhấn:** Bạn muốn một chiếc điện thoại \"độc nhất vô nhị\"? Z Fold7 chính là câu trả lời! Với **màn hình gập 8 inch Dynamic AMOLED 2X** siêu lớn, bạn có thể biến chiếc điện thoại thành một chiếc máy tính bảng mini trong tích tắc để làm việc, giải trí đa nhiệm cực đã. 🚀\n    * **Hiệu năng:** Chip **Snapdragon 8 Elite for Galaxy** mạnh mẽ nhất, cân mọi tác vụ nặng.\n    * **Camera:** **Camera AI 200MP** cho bạn những bức ảnh sắc nét, chuyên nghiệp.\n    * **Ưu đãi:** Đang có chương trình **GIẢM NGAY 7.400.000đ** siêu hời! Đừng bỏ lỡ cơ hội sở hữu flagship gập với giá tốt nhất!\n    * **Màu sắc/Bộ nhớ:** Đa dạng lựa chọn màu Xám Bạc, Đen Tuyền, Xanh Navy với các phiên bản 256GB và 512GB.\n\n### 🍎 **Dành cho Fan \"Táo\" & tìm kiếm hiệu năng đỉnh cao nhất:**\n\n* **iPhone 17 Pro Max** (Giá chỉ từ **37.390.000đ** sau giảm)\n    * **Điểm nhấn:** Mẫu iPhone mới nhất, mạnh nhất và được mong chờ nhất! 💪 Sở hữu chip **A19 Pro tản nhiệt hơi** siêu khủng, giúp máy luôn mát mẻ khi xử lý các tác vụ đồ họa nặng hay chơi game.\n    * **Màn hình:** **6.9 inch cực lớn** cho trải nghiệm hình ảnh mãn nhãn.\n    * **Thiết kế:** Nguyên khối sang trọng, đẳng cấp.\n    * **Ưu đãi:** Giảm 300.000đ và đặc biệt **HỖ TRỢ TRẢ GÓP 0%** hấp dẫn!\n    * **Màu sắc/Bộ nhớ:** Đa dạng các phiên bản Cam Vũ Trụ, Xanh Đậm, Bạc, Titan Sa Mạc, Titan Tự Nhiên, Titan Xanh với dung lượng từ 256GB đến 1TB.\n\n* **iPhone 17 Pro 256GB** (Giá chỉ từ **33.790.000đ** sau giảm)\n    * **Điểm nhấn:** Phiên bản nhỏ gọn hơn nhưng vẫn giữ nguyên sức mạnh của chip **A19 Pro tản nhiệt hơi** và **hệ thống Camera Pro đỉnh cao**, cho phép bạn chụp ảnh và quay video chuyên nghiệp không thua kém bất kỳ thiết bị nào. 📸\n    * **Ưu đãi:** Giảm 600.000đ và **TRẢ GÓP 0%** cực kỳ linh hoạt!\n    * **Màu sắc/Bộ nhớ:** Hiện có sẵn phiên bản Cam Vũ Trụ 256GB.\n\n* **iPhone 16 Pro Max 256GB** (Giá chỉ từ **28.890.000đ** sau khi giảm sốc! 💰)\n    * **Điểm nhấn:** Dù là thế hệ trước, **Chip A18 Pro** vẫn cực kỳ mạnh mẽ, xử lý mượt mà mọi ứng dụng và game nặng. Màn hình **6.9 inch cực lớn** và **Nút Camera Control mới** độc đáo mang lại trải nghiệm tiện lợi hơn bao giờ hết.\n    * **Ưu đãi:** Đang có **CHƯƠNG TRÌNH GIẢM SÂU TỚI 2.700.000đ** kèm **TRẢ GÓP 0%**! Đây là lựa chọn cực kỳ kinh tế cho một chiếc flagship iPhone cao cấp!\n    * **Màu sắc/Bộ nhớ:** Hiện có sẵn phiên bản Titan Sa Mạc 256GB.\n\n* **iPhone Air 256GB** (Giá chỉ còn **19.790.000đ** sau khi giảm cực mạnh! 🎈)\n    * **Điểm nhấn:** Nếu bạn yêu thích sự **mỏng nhẹ và tinh tế**, iPhone Air là sự lựa chọn hoàn hảo! Đây là chiếc iPhone mỏng nhẹ nhất từ trước đến nay, cầm nắm cực kỳ thoải mái.\n    * **Hiệu năng:** Vẫn trang bị chip **A19 Pro tản nhiệt hơi** mạnh mẽ.\n    * **Camera:** **Camera 48MP Fusion Main** cho chất lượng ảnh tuyệt vời.\n    * **Ưu đãi:** Mức giá cực kỳ hấp dẫn sau khi **GIẢM TỚI 6.100.000đ**, kèm **TRẢ GÓP 0%**! Đây là cơ hội vàng để sở hữu iPhone cấu hình cao với giá siêu tốt!\n    * **Màu sắc/Bộ nhớ:** Hiện có sẵn phiên bản Xanh Bầu Trời 256GB.\n\n### 🌟 **Dành cho SamFan & muốn sức mạnh bền bỉ:**\n\n* **Samsung Galaxy S25 Ultra 5G** (Giá chỉ còn từ **21.780.000đ** sau khi giảm cực sâu! 🤩)\n    * **Điểm nhấn:** \"Khủng long\" hiệu năng của nhà Samsung! Với chip **Snapdragon 8 Elite** mới nhất, **khung Titan** bền bỉ và **màn hình 6.9 inch Dynamic AMOLED 2X 2K** sắc nét đến từng chi tiết, S25 Ultra mang lại trải nghiệm không giới hạn.\n    * **Ưu đãi:** Đang có chương trình **GIẢM SỐC LÊN ĐẾN 5.800.000đ**!\n    * **Màu sắc/Bộ nhớ:** Đa dạng màu sắc như Xanh dương, Đen, Xám, Bạc với dung lượng từ 256GB đến 1TB.\n\n---\n\n**Lời khuyên từ DLM Store:**\n\nĐể chọn được chiếc máy ưng ý nhất, bạn hãy cân nhắc các yếu tố sau:\n* **Thiết kế:** Bạn thích màn hình gập độc đáo của Z Fold7, vẻ ngoài sang trọng của iPhone, hay sự bền bỉ của S25 Ultra?\n* **Hệ điều hành:** Bạn là fan của iOS hay Android?\n* **Nhu cầu sử dụng:** Nếu bạn cần máy để làm việc đa nhiệm, Z Fold7 là một lựa chọn tuyệt vời. Nếu bạn ưu tiên hiệu năng gaming và chụp ảnh đỉnh cao, các dòng Pro Max của iPhone hay S25 Ultra sẽ không làm bạn thất vọng. Nếu bạn muốn sự mỏng nhẹ, iPhone Air là lựa chọn số 1.\n* **Ngân sách:** Dù đều trên 10 triệu, mỗi máy có mức giá cuối cùng khác nhau sau khuyến mãi, bạn có thể cân nhắc để tối ưu chi phí.\n\nMời bạn ghé thăm cửa hàng DLM Store gần nhất để trực tiếp trải nghiệm các siêu phẩm này và nhận tư vấn chi tiết hơn từ các chuyên viên của chúng tôi nhé! Chúng tôi cam kết sẽ giúp bạn tìm được chiếc điện thoại hoàn hảo nhất!\n\nChúc bạn sớm tìm được \"người bạn đồng hành\" ưng ý! ✨",
                    products: [
                        {
                            id: 27,
                            name: "Samsung Galaxy Z Fold7 5G",
                            slug: "samsung-galaxy-z-fold7-5g",
                            image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/samsung_galaxy_z_fold7_xam_1_de1fb8f431.png",
                            price: 39590000.00,
                            originalPrice: 46990000.00,
                            discountLabel: "Giảm 7,400,000đ",
                            configSummary: "256 GB"
                        },
                        {
                            id: 1,
                            name: "iPhone 17 Pro Max",
                            slug: "iphone-17-pro-max",
                            image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_max_silver_1_7b25d56e26.png",
                            price: 37690000.00,
                            originalPrice: 37990000.00,
                            discountLabel: "Giảm 300,000đ",
                            configSummary: "256GB"
                        },
                        {
                            id: 4,
                            name: "iPhone 17 Pro 256GB",
                            slug: "iphone-17-pro",
                            image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_17_pro_cosmic_orange_1_12e8ea1358.png",
                            price: 34390000.00,
                            originalPrice: 34990000.00,
                            discountLabel: "Giảm 600,000đ",
                            configSummary: "256GB"
                        },
                        {
                            id: 3,
                            name: "iPhone 16 Pro Max 256GB",
                            slug: "iphone-16-pro-max",
                            image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_16_pro_max_desert_titan_3552a28ae0.png",
                            price: 31590000.00,
                            originalPrice: 34290000.00,
                            discountLabel: "Giảm 2,700,000đ",
                            configSummary: "256GB"
                        },
                        {
                            id: 30,
                            name: "Samsung Galaxy S25 Ultra 5G",
                            slug: "samsung-galaxy-s25-ultra-5g",
                            image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/galaxy_s25_ultra_titan_silver_blue_1_8225f9e1f4.png",
                            price: 27580000.00,
                            originalPrice: 33380000.00,
                            discountLabel: "Giảm 5,800,000đ",
                            configSummary: "256 GB"
                        },
                        {
                            id: 6,
                            name: "iPhone Air 256GB",
                            slug: "iphone-air",
                            image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/iphone_sky_blue_1_b2a2ebc3ed.png",
                            price: 25890000.00,
                            originalPrice: 31990000.00,
                            discountLabel: "Giảm 6,100,000đ",
                            configSummary: "256GB"
                        }
                    ]
                }
            };
            // ---------------------------------

            const newBotMsg: Message = {
                id: Date.now() + 1,
                text: MOCK_DATA.data.answer,
                products: MOCK_DATA.data.products,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, newBotMsg]);
            setIsLoading(false);

        }, 1000); // Giả lập chờ 1 giây
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-wrapper">
            <button 
                className={`chatbot-toggle-btn ${isOpen ? 'hide' : ''}`}
                onClick={() => setIsOpen(true)}
            >
                <span className="chatbot-tooltip">Chat hỗ trợ</span>
                <img src="https://res.cloudinary.com/dhujtl4cm/image/upload/v1770127899/Chatbot_rejsct.jpg" alt="Icon" className="chatbot-icon-img" />
            </button>

            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div className="chatbot-title">
                        <span className="chatbot-avatar">🤖</span>
                        <div>
                            <h4>Trợ lý DLM</h4>
                            <span className="chatbot-status">Đang hoạt động</span>
                        </div>
                    </div>
                    <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="chatbot-body">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.sender}`}>
                            
                            <div className="message-bubble">
                                {msg.sender === 'bot' ? (
                                    <div className="markdown-content">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>

                            {/* --- PHẦN RENDER SẢN PHẨM TRƯỢT NGANG --- */}
                            {msg.sender === 'bot' && msg.products && msg.products.length > 0 && (
                                <div className="bot-products-container">
                                    {msg.products.map(product => (
                                        <a 
                                            key={product.id} 
                                            href={`/product/${product.slug}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="product-card-chat"
                                        >
                                            <div className="img-wrapper">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                            <h5>{product.name}</h5>
                                            
                                            <p className="price">
                                                {formatCurrency(product.price)}
                                            </p>
                                            
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <span className="original-price">
                                                    {formatCurrency(product.originalPrice)}
                                                </span>
                                            )}

                                            {product.discountLabel && (
                                                <span className="discount-badge">
                                                    {product.discountLabel}
                                                </span>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            )}
                            {/* -------------------------------------- */}
                            
                            <div className="message-time">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="message-row bot">
                            <div className="typing-indicator"><span></span><span></span><span></span></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-footer">
                    <input
                        type="text"
                        placeholder="Nhập câu hỏi..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()}>
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;