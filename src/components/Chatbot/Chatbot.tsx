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

        const currentText = inputText; // Lưu lại text để gọi API

        // 1. Thêm tin nhắn User vào UI ngay lập tức
        const newUserMsg: Message = {
            id: Date.now(),
            text: currentText,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText(""); // Xóa ô input
        setIsLoading(true); // Hiện trạng thái đang gõ...

        // 2. GỌI API THẬT ĐẾN SPRING BOOT BACKEND
        try {
            const response = await fetch('http://localhost:8080/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Nếu API cần xác thực token, hãy bỏ comment dòng dưới:
                    // 'Authorization': `Bearer ${getAuthToken()}` 
                },
                body: JSON.stringify({ message: currentText }) // Truyền ChatBotRequest
            });

            const json = await response.json();

            // 3. Xử lý khi Backend trả về thành công (HTTP 200)
            if (response.ok && json.data) {
                const newBotMsg: Message = {
                    id: Date.now() + 1,
                    text: json.data.answer,           // Lấy câu trả lời từ bot
                    products: json.data.products,     // Lấy danh sách sản phẩm (nếu có)
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, newBotMsg]);
            } else {
                // Xử lý khi Backend trả về lỗi (Code 400, 500...)
                const errorMsg: Message = {
                    id: Date.now() + 1,
                    text: `⚠️ Xin lỗi, đã có lỗi xảy ra: ${json.message || "Vui lòng thử lại!"}`,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMsg]);
            }

        } catch (error) {
            // Xử lý khi sập Server hoặc lỗi mạng (Network Error)
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "⚠️ Xin lỗi, máy chủ hiện không phản hồi. Vui lòng kiểm tra lại kết nối mạng.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false); // Tắt trạng thái đang gõ...
        }
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