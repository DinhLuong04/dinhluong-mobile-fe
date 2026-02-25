import React, { useState, useEffect, useCallback } from 'react';
import ReviewModal from '../../../Common/ReviewModal/ReviewModal'; 
import ReplyBox from '../../../Common/ReplyBox/ReplyBox';       
import './ProductReviews.css';

// --- ĐỊNH NGHĨA CÁC INTERFACES ---
interface StarIconProps { fill?: string; size?: number; style?: React.CSSProperties; }
interface BreakdownItem { star: number; percent: number; count: number; }
interface ReviewSummary { average: number; totalCount: number; breakdown: BreakdownItem[]; currentUserHasPurchased?: boolean; }
interface ReviewMedia { id: number; image_url: string; is_video: boolean | number; }
interface ReviewReply { id: number; author_name: string; author_avatar?: string | null; is_admin_reply: boolean | number; created_at: string; content: string; is_mine?: boolean; }
interface ReviewComment { id: number; author_name: string; author_avatar?: string | null; rating: number; content: string; created_at: string; images?: ReviewMedia[]; replies?: ReviewReply[]; is_mine?: boolean; is_purchased?: boolean; }
interface ReviewData { summary: ReviewSummary | null; comments: ReviewComment[]; }
interface ProductReviewsProps { slug: string; }

// --- COMPONENT ICON ---
const StarIcon: React.FC<StarIconProps> = ({ fill = "#FBBF24", size = 16, style }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M7.6939 2.10179C8.02403 1.43287 8.97789 1.43287 9.30802 2.10179L10.8291 5.18384L14.2304 5.67807C14.9685 5.78534 15.2633 6.69251 14.7291 7.2132L12.268 9.61224L12.849 12.9997C12.9751 13.735 12.2034 14.2956 11.5431 13.9485L8.50096 12.3491L5.45879 13.9485C4.79853 14.2956 4.02684 13.735 4.15294 12.9997L4.73394 9.61224L2.27277 7.2132C1.73861 6.69251 2.03336 5.78534 2.77156 5.67807L6.17281 5.18384L7.6939 2.10179Z" fill={fill}></path>
    </svg>
);

const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const filterOptions = [
    { label: 'Tất cả', value: null },
    { label: '5 Sao', value: 5 },
    { label: '4 Sao', value: 4 },
    { label: '3 Sao', value: 3 },
    { label: '2 Sao', value: 2 },
    { label: '1 Sao', value: 1 },
];

const ProductReviews: React.FC<ProductReviewsProps> = ({ slug }) => {
    const [reviewData, setReviewData] = useState<ReviewData>({ summary: null, comments: [] });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    // States Lọc & Phân trang
    const [page, setPage] = useState<number>(1);
    const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
    const limit = 10;
    
    // States cho KHUNG BÌNH LUẬN CHÍNH
    const [commentContent, setCommentContent] = useState<string>("");
    const [commentFiles, setCommentFiles] = useState<File[]>([]); 
    const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);

    // States UI Components
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyingToId, setReplyingToId] = useState<number | null>(null);

    // Lấy User từ local storage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    // Check quyền đánh giá từ Backend trả về
    const hasPurchased = reviewData.summary?.currentUserHasPurchased || false;

    // 1. GET DATA (CÓ TRUYỀN TOKEN NẾU ĐÃ LOGIN)
    const fetchReviews = useCallback(async () => {
        setIsLoading(true);
        try {
            const ratingQuery = selectedFilter ? `&rating=${selectedFilter}` : '';
            
            // Setup Headers để truyền Token xuống cho DB phân biệt "Của bạn"
            const headers: HeadersInit = {};
            if (user && user.token) {
                headers['Authorization'] = `Bearer ${user.token}`;
            }

            const response = await fetch(`http://localhost:8080/api/reviews/products/${slug}?page=${page}&limit=${limit}${ratingQuery}`, {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                const jsonResponse = await response.json(); 
                setReviewData(jsonResponse.data); 
            }
        } catch (error) {
            console.error("Lỗi lấy bình luận:", error);
        } finally {
            setIsLoading(false);
        }
    }, [slug, page, selectedFilter]); // Bỏ 'user' ra khỏi dependency để tránh re-render liên tục

    useEffect(() => {
        if (slug) fetchReviews();
    }, [fetchReviews, slug]);

    const handleFilterClick = (value: number | null) => {
        setSelectedFilter(value);
        setPage(1); 
    };

    const handleCommentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setCommentFiles(prev => [...prev, ...files].slice(0, 6));
    };

    // --- SUBMIT: BÌNH LUẬN TRỰC TIẾP ---
    const handleSubmitComment = async () => {
        if (!commentContent.trim()) return alert("Vui lòng nhập nội dung!");
        if (!user) return alert("Bạn cần đăng nhập để gửi bình luận!");

        setIsSubmittingComment(true);
        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('content', commentContent);
           
            commentFiles.forEach(file => formData.append('files', file));

            const response = await fetch(`http://localhost:8080/api/reviews`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Gửi bình luận thành công!");
                setCommentContent(""); setCommentFiles([]);
                setPage(1); setSelectedFilter(null);
                fetchReviews();
            } else {
                alert(result.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            alert("Lỗi kết nối server.");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    // --- SUBMIT: ĐÁNH GIÁ (Từ Modal) ---
    const handleModalSubmit = async (rating: number, content: string, files: File[]) => {
        if (!user) return alert("Bạn cần đăng nhập để đánh giá!");

        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('rating', String(rating));
            formData.append('content', content);
            files.forEach(file => formData.append('files', file));

            const response = await fetch(`http://localhost:8080/api/reviews`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Đánh giá thành công!");
                setIsModalOpen(false);
                setPage(1); setSelectedFilter(null);
                fetchReviews();
            } else {
                alert(result.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            alert("Lỗi kết nối server.");
        }
    };

    // --- SUBMIT: TRẢ LỜI ---
    const handleReplySubmit = async (commentId: number, content: string) => {
        if (!user) return alert("Bạn cần đăng nhập để trả lời!");
        if (!content.trim()) return alert("Vui lòng nhập nội dung trả lời!");

        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('content', content);
            formData.append('parent_id', String(commentId)); 

            const response = await fetch(`http://localhost:8080/api/reviews`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Đã gửi phản hồi thành công!");
                setReplyingToId(null); 
                fetchReviews(); 
            } else {
                alert(result.message || "Có lỗi xảy ra khi gửi phản hồi.");
            }
        } catch (error) {
            alert("Lỗi kết nối server.");
        }
    };

    if (isLoading && !reviewData.summary) return <div className="pr-container">Đang tải đánh giá...</div>;
    const summary = reviewData.summary || { average: 0, totalCount: 0, breakdown: [] };
    const comments = reviewData.comments || [];
    const totalPages = Math.ceil(summary.totalCount / limit);

    return (
        <div className="container pr-wrapper">
            <div className="pr-container">
                <h2 className="pr-title">Đánh giá và bình luận</h2>

                {/* 1. KHỐI TỔNG QUAN */}
                <div className="pr-summary">
                    <div className="pr-summary-left">
                        <div className="pr-score-num">{summary.average.toFixed(1)}</div>
                        <div className="pr-score-stars">
                            {[1, 2, 3, 4, 5].map(i => (
                                <StarIcon key={i} size={20} fill={i <= Math.round(summary.average) ? "#FBBF24" : "#E5E7EB"} />
                            ))}
                        </div>
                        <div className="pr-score-count">{summary.totalCount} lượt đánh giá</div>
                        
                        <button className="pr-btn-rate" onClick={() => setIsModalOpen(true)}>
                            Đánh giá sản phẩm
                        </button>
                    </div>

                    <div className="pr-summary-right">
                        {summary.breakdown.map((item) => (
                            <div key={item.star} className="pr-progress-item">
                                <span className="pr-star-label">{item.star} <StarIcon size={12}/></span>
                                <div className="pr-progress-track">
                                    <div className="pr-progress-fill" style={{ width: `${item.percent}%` }}></div>
                                </div>
                                <span className="pr-count-label">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pr-divider"></div>

                {/* 2. BỘ LỌC */}
                <div className="pr-filter-section">
                    <h3 className="pr-filter-title">{summary.totalCount} Bình luận</h3>
                    <div className="pr-filters">
                        {filterOptions.map((filter, idx) => (
                            <div 
                                key={idx} 
                                className={`pr-filter-pill ${selectedFilter === filter.value ? 'active' : ''}`}
                                onClick={() => handleFilterClick(filter.value)}
                            >
                                {filter.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Ô NHẬP BÌNH LUẬN */}
                <div className="fpt-main-input-section">
                    <div className="fpt-main-input-row">
                        <div className="fpt-main-input-wrapper">
                            <input 
                                type="text" 
                                className="fpt-main-input" 
                                placeholder="Nhập nội dung bình luận..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            />
                            <div className="fpt-char-count-main">{commentContent.length}/3000</div>
                        </div>
                        <button 
                            className="fpt-btn-black" 
                            onClick={handleSubmitComment}
                            disabled={isSubmittingComment}
                        >
                            {isSubmittingComment ? 'Đang gửi...' : 'Gửi bình luận'}
                        </button>
                    </div>

                    <div className="fpt-upload-wrapper">
                        <label htmlFor="upload-main-files" className="fpt-upload-link">
                            <svg width="18" height="18" viewBox="0 0 20 21" fill="none"><path d="M6.78288 3.50417C7.03751 2.9975 7.55609 2.67773 8.12314 2.67773H11.8873C12.4556 2.67773 12.975 2.99879 13.229 3.50704L13.814 4.67713H15.5039C16.8846 4.67713 18.0039 5.79642 18.0039 7.17713V10.9388C17.0523 10.1511 15.831 9.67773 14.4992 9.67773C14.2905 9.67773 14.0845 9.68936 13.8818 9.712C13.4498 7.96941 11.8754 6.67773 9.99921 6.67773C7.79007 6.67773 5.99921 8.4686 5.99921 10.6777C5.99921 12.5539 7.29088 14.1284 9.03347 14.5604C9.01083 14.763 8.99921 14.969 8.99921 15.1777C8.99921 16.078 9.21549 16.9277 9.59892 17.6777H4.50391C3.12319 17.6777 2.00391 16.5584 2.00391 15.1777V7.17713C2.00391 5.79642 3.1232 4.67713 4.50391 4.67713H6.19339L6.78288 3.50417ZM9.99921 7.67773C11.392 7.67773 12.5631 8.62683 12.901 9.91354C11.1487 10.4449 9.76633 11.8272 9.23501 13.5795C7.9483 13.2416 6.99921 12.0705 6.99921 10.6777C6.99921 9.02088 8.34235 7.67773 9.99921 7.67773Z" fill="currentColor"/></svg>
                            Thêm tối đa 5 ảnh và 1 video
                        </label>
                        <input id="upload-main-files" type="file" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={handleCommentFileChange} />
                        
                        {commentFiles.length > 0 && (
                            <div className="fpt-preview-images">
                                {commentFiles.map((file, index) => (
                                    <div key={index} className="fpt-preview-item">
                                        {file.type.startsWith('video/') ? (
                                            <video src={URL.createObjectURL(file)} />
                                        ) : (
                                            <img src={URL.createObjectURL(file)} alt="preview" />
                                        )}
                                        <button onClick={() => setCommentFiles(prev => prev.filter((_, i) => i !== index))}>&times;</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="pr-divider"></div>

                {/* 4. DANH SÁCH BÌNH LUẬN */}
                <div className="pr-comment-list">
                    {comments.length === 0 ? <p style={{color: '#666'}}>Chưa có đánh giá nào phù hợp.</p> : null}
                    {comments.map((comment: ReviewComment) => (
                        <div key={comment.id} className="pr-comment-item">
                            <div className="pr-avatar">
                                {comment.author_avatar ? <img src={comment.author_avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : comment.author_name.charAt(0)}
                            </div>
                            <div className="pr-comment-body">
                                <div className="pr-user-meta">
                                    <span className="pr-username">{comment.author_name}</span>
                                    
                                    {/* HIỆN CHỮ "CỦA BẠN" NẾU ĐÚNG USER ĐANG LOGIN */}
                                    {comment.is_mine && <span style={{ marginLeft: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>(Của bạn)</span>}

                                    <span className="pr-dot">•</span>
                                    <span className="pr-time">{formatDate(comment.created_at)}</span>
                                </div>
                                
                                {/* FIX CSS: SAO NẰM NGANG VÀ CĂN CHỈNH ĐẸP */}
                                {comment.rating > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '6px' }}>
                                        {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} fill={i < comment.rating ? "#FBBF24" : "#E5E7EB"} />)}
                                    </div>
                                )}

                                {/* HUY HIỆU ĐÃ MUA HÀNG */}
                                {comment.is_purchased && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', color: '#10B981', fontSize: '13px' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span style={{ fontWeight: 500 }}>Đã mua hàng</span>
                                    </div>
                                )}

                                <div className="pr-content">{comment.content}</div>
                                
                                {comment.images && comment.images.length > 0 && (
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        {comment.images.map(media => (
                                            media.is_video ? 
                                            <video key={media.id} src={media.image_url} controls style={{ height: '80px', borderRadius: '4px' }}></video> :
                                            <img key={media.id} src={media.image_url} alt="review media" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }}/>
                                        ))}
                                    </div>
                                )}

                                <div className="pr-actions">
                                    <button className="pr-action-btn" onClick={() => setReplyingToId(comment.id)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        Trả lời
                                    </button>
                                </div>

                                {/* BOX TRẢ LỜI */}
                                {replyingToId === comment.id && (
                                    <ReplyBox 
                                        replyToName={comment.author_name}
                                        onClose={() => setReplyingToId(null)}
                                        onSubmit={(content) => handleReplySubmit(comment.id, content)}
                                    />
                                )}

                                {/* DANH SÁCH REPLY CON */}
                                {comment.replies && comment.replies.map(reply => (
                                    <div key={reply.id} className="pr-reply-box">
                                        <div className="pr-avatar-img">
                                            <img src={reply.author_avatar || 'default_admin.png'} alt="Avatar" />
                                        </div>
                                        <div className="pr-reply-content">
                                            <div className="pr-user-meta">
                                                <span className="pr-username">{reply.author_name}</span>
                                                
                                                {/* HIỆN CHỮ "CỦA BẠN" Ở REPLY */}
                                                {reply.is_mine && <span style={{ marginLeft: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>(Của bạn)</span>}

                                                {(reply.is_admin_reply === 1 || reply.is_admin_reply === true) && <span className="pr-badge-admin">Quản trị viên</span>}
                                                <span className="pr-dot">•</span>
                                                <span className="pr-time">{formatDate(reply.created_at)}</span>
                                            </div>
                                            <div className="pr-content" dangerouslySetInnerHTML={{__html: reply.content}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. PHÂN TRANG */}
                {totalPages > 1 && (
                    <div className="pr-pagination">
                        <button 
                            className={`pr-page-item ${page === 1 ? 'disabled' : ''}`} 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Trước
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`pr-page-item ${page === i + 1 ? 'active' : ''}`}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </div>
                        ))}

                        <button 
                            className={`pr-page-item ${page === totalPages ? 'disabled' : ''}`} 
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>

            {/* MODAL ĐÁNH GIÁ (CÓ SAO) HOẶC BÁO LỖI */}
            <ReviewModal 
                isOpen={isModalOpen}
                hasPurchased={hasPurchased}
                onClose={() => setIsModalOpen(false)}
                onSubmitReview={handleModalSubmit}
            />
        </div>
    );
};

export default ProductReviews;