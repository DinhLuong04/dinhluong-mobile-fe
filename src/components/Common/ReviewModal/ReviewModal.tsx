import React, { useState } from 'react';
import '../../../components/ProductDetail/ProductDetailSection/ProductReviews/ProductReviews.css'; 

// Tái sử dụng lại StarIcon từ file của bạn
const StarIcon = ({ fill = "#FBBF24", size = 16, onClick, onMouseEnter, onMouseLeave, style }: any) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
         onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} 
         style={{ cursor: onClick ? 'pointer' : 'default', transition: 'fill 0.2s', ...style }}>
        <path d="M7.6939 2.10179C8.02403 1.43287 8.97789 1.43287 9.30802 2.10179L10.8291 5.18384L14.2304 5.67807C14.9685 5.78534 15.2633 6.69251 14.7291 7.2132L12.268 9.61224L12.849 12.9997C12.9751 13.735 12.2034 14.2956 11.5431 13.9485L8.50096 12.3491L5.45879 13.9485C4.79853 14.2956 4.02684 13.735 4.15294 12.9997L4.73394 9.61224L2.27277 7.2132C1.73861 6.69251 2.03336 5.78534 2.77156 5.67807L6.17281 5.18384L7.6939 2.10179Z" fill={fill}></path>
    </svg>
);

interface ReviewModalProps {
    isOpen: boolean;
    hasPurchased: boolean; // Flag xác định xem user đã mua hàng chưa
    onClose: () => void;
    onSubmitReview: (rating: number, content: string, files: File[]) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, hasPurchased, onClose, onSubmitReview }) => {
    // States cho Form Đánh Giá
    const [rating, setRating] = useState<number>(5);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files].slice(0, 6)); // Tạm giới hạn 6 files
    };

    const submitForm = () => {
        if(!content) {
            alert("Vui lòng nhập nội dung!"); return;
        }
        onSubmitReview(rating, content, selectedFiles);
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '20px', position: 'relative' }}>
                
                {/* Header Modal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                        {hasPurchased ? "Đánh giá sản phẩm" : "Thông báo"}
                    </h3>
                    <div onClick={onClose} style={{ cursor: 'pointer' }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="#090d14" xmlns="http://www.w3.org/2000/svg"><path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path></svg>
                    </div>
                </div>

                {/* Body Modal */}
                <div>
                    {!hasPurchased ? (
                        /* GIAO DIỆN CHƯA MUA HÀNG (Mẫu FPT) */
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img alt="reject-rating" width="291" height="180" src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:format(webp):quality(75)/estore-v2/img/reject-rating.png" />
                            <div style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', color: '#111827', textAlign: 'center' }}>
                                Gửi đánh giá không thành công!
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6B7280', fontSize: '14px', marginBottom: '20px' }}>
                                <span>Quý khách vui lòng mua hàng để tham gia</span>
                                <span>đánh giá sản phẩm.</span>
                            </div>
                            <button 
                                onClick={onClose}
                                style={{ width: '100%', height: '48px', backgroundColor: '#CB1C22', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                                Đã hiểu
                            </button>
                        </div>
                    ) : (
                        /* GIAO DIỆN ĐÃ MUA HÀNG (Form Review) */
                        <div className="pr-input-section" style={{ padding: 0, border: 'none' }}>
                            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 'bold' }}>Chất lượng:</span>
                                <div style={{ display: 'flex' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <StarIcon 
                                            key={star} size={28} 
                                            fill={(hoverRating || rating) >= star ? "#FBBF24" : "#E5E7EB"}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <textarea 
                                className="pr-text-input" 
                                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..." 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical', marginBottom: '10px' }}
                            />
                            
                            {/* Khu vực up file & Nút gửi */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <label htmlFor="modal-upload" style={{ cursor: 'pointer', color: '#1250DC', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        📷 Thêm ảnh/video
                                    </label>
                                    <input id="modal-upload" type="file" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFileChange} />
                                </div>
                                <button 
                                    onClick={submitForm}
                                    style={{ padding: '10px 24px', backgroundColor: '#CB1C22', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;