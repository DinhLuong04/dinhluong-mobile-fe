import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot.css';
import { useChatbot } from './useChatbot';
import type { ChatProductDto } from '../../types/chat.types';

const Chatbot: React.FC = () => {
    const {
        isOpen, setIsOpen,
        messages,
        inputText, setInputText,
        isLoading,
        messagesEndRef,
        handleSendMessage,
        handleKeyDown
    } = useChatbot();

    const formatCurrency = (value?: number) => {
        if (!value) return '0 đ';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
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

                            {/* --- RENDER SẢN PHẨM TRƯỢT NGANG --- */}
                            {msg.sender === 'bot' && msg.products && msg.products.length > 0 && (
                                <div className="bot-products-container">
                                    {msg.products.map((product: ChatProductDto, index: number) => (
                                        <a 
                                            key={product.id || index} 
                                            href={`/product/${product.slug}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="product-card-chat"
                                        >
                                            <div className="img-wrapper">
                                                {product.image && <img src={product.image} alt={product.name || 'Sản phẩm'} />}
                                            </div>
                                            <h5>{product.name}</h5>
                                            
                                            <p className="price">
                                                {formatCurrency(product.price)}
                                            </p>
                                            
                                            {product.originalPrice && product.price && product.originalPrice > product.price && (
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