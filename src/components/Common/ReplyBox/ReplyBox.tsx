import React, { useState } from 'react';
import { message } from 'antd'; 
import '../../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews.css'; 

interface ReplyBoxProps {
    replyToName: string;
    onClose: () => void;
    onSubmit: (content: string) => void;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ replyToName, onClose, onSubmit }) => {
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!content.trim()) {
            message.warning("Vui lòng nhập nội dung trả lời!");
            return;
        }
        onSubmit(content);
        setContent(""); 
    };

    return (
        <div className="reply-box-wrapper" style={{ backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '12px', display: 'flex', gap: '12px', marginTop: '10px' }}>
            <div className="reply-avatar">
                Q
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M3.87106 8.67721L6.55315 11.3597C6.74841 11.555 6.74841 11.8716 6.55315 12.0668C6.37958 12.2404 6.11016 12.2597 5.91529 12.1247L5.84604 12.0668L2.2801 8.49804L2.23046 8.4269L2.20281 8.37109L2.18004 8.30345L2.17515 8.28273C2.16789 8.24905 2.16406 8.21384 2.16406 8.17775L2.16952 8.25166L2.16586 8.22023L2.16586 8.13522L2.18085 8.04891L2.20185 7.98671L2.24125 7.91074L2.29575 7.83959L5.84604 4.28866C6.04131 4.0934 6.35789 4.0934 6.55315 4.28866C6.72672 4.46222 6.746 4.73165 6.61101 4.92652L6.55315 4.99577L3.87106 7.67721L8.16406 7.67775C11.6858 7.67775 14.0495 9.65355 14.16 12.4702L14.1641 12.6777C14.1641 12.9539 13.9402 13.1777 13.6641 13.1777C13.3879 13.1777 13.1641 12.9539 13.1641 12.6777C13.1641 10.4046 11.3566 8.77316 8.42558 8.68179L8.16406 8.67775L3.87106 8.67721L6.55315 11.3597L3.87106 8.67721Z" fill="#212121"></path></svg>
                        <div style={{ color: '#6B7280', fontSize: '14px' }}>Đang trả lời:</div>
                        <div style={{ color: '#111827', fontWeight: '600', fontSize: '14px' }}>{replyToName}</div>
                    </div>
                    <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Đóng">
                        ✕
                    </button>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <textarea 
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', resize: 'none', minHeight: '60px', outline: 'none' }}
                            maxLength={3000} 
                            placeholder="Nhập nội dung bình luận" 
                            rows={2} 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '12px', color: '#9CA3AF' }}>
                            {content.length}/3000
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            style={{ height: '44px', padding: '0 22px', backgroundColor: '#CB1C22', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}> 
                            Gửi 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyBox;