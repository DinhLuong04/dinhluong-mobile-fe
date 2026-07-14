import React from 'react';
import ReviewModal from '../../../Common/ReviewModal/ReviewModal'; 
import ReplyBox from '../../../Common/ReplyBox/ReplyBox';      
import { useProductReviews } from './useProductReviews';
import './ProductReviews.css';

interface StarIconProps { fill?: string; size?: number; style?: React.CSSProperties; }
interface ProductReviewsProps { slug: string; }

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
    const {
        reviewData, isLoading, page, setPage, selectedFilter,
        commentContent, setCommentContent, commentFiles, setCommentFiles,
        isSubmittingComment, isModalOpen, setIsModalOpen,
        replyingToId, setReplyingToId, hasPurchased, limit,
        handleFilterClick, handleCommentFileChange,
        handleSubmitComment, handleModalSubmit, handleReplySubmit
    } = useProductReviews(slug);

    if (isLoading && !reviewData.summary) return <div className="pr-container">Đang tải đánh giá...</div>;
    
    const summary = reviewData.summary || { average: 0, totalCount: 0, breakdown: [] };
    const comments = reviewData.comments || [];
    const totalPages = Math.ceil(summary.totalCount ?? 0 / limit);

    return (
        <div className="container pr-wrapper">
            <div className="pr-container">
                <h2 className="pr-title">Đánh giá và bình luận</h2>

                {/* 1. KHỐI TỔNG QUAN */}
                <div className="pr-summary">
                    <div className="pr-summary-left">
                        <div className="pr-score-num">{(summary.average || 0).toFixed(1)}</div>
                        <div className="pr-score-stars">
                            {[1, 2, 3, 4, 5].map(i => (
                                <StarIcon key={i} size={20} fill={i <= Math.round(summary.average || 0) ? "#FBBF24" : "#E5E7EB"} />
                            ))}
                        </div>
                        <div className="pr-score-count">{summary.totalCount || 0} lượt đánh giá</div>
                        
                        <button className="pr-btn-rate" onClick={() => setIsModalOpen(true)}>
                            Đánh giá sản phẩm
                        </button>
                    </div>

                    <div className="pr-summary-right">
                        {summary.breakdown?.map((item) => (
                            <div key={item.star} className="pr-progress-item">
                                <span className="pr-star-label">{item.star} <StarIcon size={12}/></span>
                                <div className="pr-progress-track">
                                    <div className="pr-progress-fill" style={{ width: `${item.percent || 0}%` }}></div>
                                </div>
                                <span className="pr-count-label">{item.count || 0}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pr-divider"></div>

                {/* 2. BỘ LỌC */}
                <div className="pr-filter-section">
                    <h3 className="pr-filter-title">{summary.totalCount || 0} Bình luận</h3>
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
                    {comments.length === 0 && <p style={{color: '#666'}}>Chưa có đánh giá nào phù hợp.</p>}
                    {comments.map((comment: any) => (
                        <div key={comment.id} className="pr-comment-item">
                            <div className="pr-avatar">
                                {comment.author_avatar ? <img src={comment.author_avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : comment.author_name?.charAt(0)}
                            </div>
                            <div className="pr-comment-body">
                                <div className="pr-user-meta">
                                    <span className="pr-username">{comment.author_name}</span>
                                    {comment.is_mine && <span style={{ marginLeft: '6px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>(Của bạn)</span>}
                                    <span className="pr-dot">•</span>
                                    <span className="pr-time">{formatDate(comment.created_at)}</span>
                                </div>
                                
                                {comment.rating > 0 && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '6px' }}>
                                        {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} fill={i < comment.rating ? "#FBBF24" : "#E5E7EB"} />)}
                                    </div>
                                )}

                                {comment.is_purchased && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', color: '#10B981', fontSize: '13px' }}>
                                        <span style={{ fontWeight: 500 }}>Đã mua hàng</span>
                                    </div>
                                )}

                                <div className="pr-content">{comment.content}</div>
                                
                                {comment.images && comment.images.length > 0 && (
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        {comment.images.map((media: any) => (
                                            media.is_video ? 
                                            <video key={media.id} src={media.image_url} controls style={{ height: '80px', borderRadius: '4px' }}></video> :
                                            <img key={media.id} src={media.image_url} alt="review media" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }}/>
                                        ))}
                                    </div>
                                )}

                                <div className="pr-actions">
                                    <button className="pr-action-btn" onClick={() => setReplyingToId(comment.id)}>
                                        Trả lời
                                    </button>
                                </div>

                                {replyingToId === comment.id && (
                                    <ReplyBox 
                                        replyToName={comment.author_name}
                                        onClose={() => setReplyingToId(null)}
                                        onSubmit={(content) => handleReplySubmit(comment.id, content)}
                                    />
                                )}

                                {comment.replies && comment.replies.map((reply: any) => (
                                    <div key={reply.id} className="pr-reply-box">
                                        <div className="pr-avatar-img">
                                            <img src={reply.author_avatar || 'default_admin.png'} alt="Avatar" />
                                        </div>
                                        <div className="pr-reply-content">
                                            <div className="pr-user-meta">
                                                <span className="pr-username">{reply.author_name}</span>
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