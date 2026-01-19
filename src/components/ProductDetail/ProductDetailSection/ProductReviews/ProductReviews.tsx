import React from 'react';
import { ratingSummary, filters, comments } from './ProductReviewsData';
import './ProductReviews.css';

const StarIcon = ({ fill = "#FBBF24", size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.6939 2.10179C8.02403 1.43287 8.97789 1.43287 9.30802 2.10179L10.8291 5.18384L14.2304 5.67807C14.9685 5.78534 15.2633 6.69251 14.7291 7.2132L12.268 9.61224L12.849 12.9997C12.9751 13.735 12.2034 14.2956 11.5431 13.9485L8.50096 12.3491L5.45879 13.9485C4.79853 14.2956 4.02684 13.735 4.15294 12.9997L4.73394 9.61224L2.27277 7.2132C1.73861 6.69251 2.03336 5.78534 2.77156 5.67807L6.17281 5.18384L7.6939 2.10179Z" fill={fill}></path>
    </svg>
);

const ProductReviews = () => {
    return (
        <div className="container pr-wrapper">
            <div className=" pr-container">
                <h2 className="pr-title">Đánh giá và bình luận</h2>

                {/* 1. KHỐI TỔNG QUAN ĐÁNH GIÁ */}
                <div className="pr-summary">
                    {/* Cột trái: Điểm số + Nút đánh giá */}
                    <div className="pr-summary-left">
                        <div className="pr-score-num">{ratingSummary.average}</div>
                        <div className="pr-score-stars">
                            {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} size={20} />)}
                        </div>
                        <div className="pr-score-count">{ratingSummary.totalCount} lượt đánh giá</div>
                        
                        <button className="pr-btn-rate">Đánh giá sản phẩm</button>
                    </div>

                    {/* Cột phải: Thanh tiến trình */}
                    <div className="pr-summary-right">
                        {ratingSummary.breakdown.map((item) => (
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

                {/* 2. BỘ LỌC & NHẬP LIỆU */}
                <div className="pr-filter-section">
                    <h3 className="pr-filter-title">534 Bình luận</h3>
                    <div className="pr-filters">
                        {filters.map((filter, idx) => (
                            <div key={idx} className={`pr-filter-pill ${filter.active ? 'active' : ''}`}>
                                {filter.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pr-input-section">
                    <div className="pr-input-wrapper">
                        <input type="text" className="pr-text-input" placeholder="Nhập nội dung bình luận..." />
                        <button className="pr-btn-submit">Gửi bình luận</button>
                    </div>
                    <div className="pr-upload-action">
                        <svg width="20" height="20" viewBox="0 0 20 21" fill="none">
                            <path d="M6.78288 3.50417C7.03751 2.9975 7.55609 2.67773 8.12314 2.67773H11.8873C12.4556 2.67773 12.975 2.99879 13.229 3.50704L13.814 4.67713H15.5039C16.8846 4.67713 18.0039 5.79642 18.0039 7.17713V10.9388C17.0523 10.1511 15.831 9.67773 14.4992 9.67773C14.2905 9.67773 14.0845 9.68936 13.8818 9.712C13.4498 7.96941 11.8754 6.67773 9.99921 6.67773C7.79007 6.67773 5.99921 8.4686 5.99921 10.6777C5.99921 12.5539 7.29088 14.1284 9.03347 14.5604C9.01083 14.763 8.99921 14.969 8.99921 15.1777C8.99921 16.078 9.21549 16.9277 9.59892 17.6777H4.50391C3.12319 17.6777 2.00391 16.5584 2.00391 15.1777V7.17713C2.00391 5.79642 3.1232 4.67713 4.50391 4.67713H6.19339L6.78288 3.50417ZM9.99921 7.67773C11.392 7.67773 12.5631 8.62683 12.901 9.91354C11.1487 10.4449 9.76633 11.8272 9.23501 13.5795C7.9483 13.2416 6.99921 12.0705 6.99921 10.6777C6.99921 9.02088 8.34235 7.67773 9.99921 7.67773ZM18.9992 15.1777C18.9992 17.663 16.9845 19.6777 14.4992 19.6777C12.0139 19.6777 9.99921 17.663 9.99921 15.1777C9.99921 12.6925 12.0139 10.6777 14.4992 10.6777C16.9845 10.6777 18.9992 12.6925 18.9992 15.1777ZM14.9992 13.1777C14.9992 12.9016 14.7753 12.6777 14.4992 12.6777C14.2231 12.6777 13.9992 12.9016 13.9992 13.1777V14.6777H12.4992C12.2231 14.6777 11.9992 14.9016 11.9992 15.1777C11.9992 15.4539 12.2231 15.6777 12.4992 15.6777H13.9992V17.1777C13.9992 17.4539 14.2231 17.6777 14.4992 17.6777C14.7753 17.6777 14.9992 17.4539 14.9992 17.1777V15.6777H16.4992C16.7753 15.6777 16.9992 15.4539 16.9992 15.1777C16.9992 14.9016 16.7753 14.6777 16.4992 14.6777H14.9992V13.1777Z" fill="#1250DC"/>
                        </svg>
                        Thêm tối đa 5 ảnh và 1 video
                    </div>
                </div>

                <div className="pr-divider"></div>

                {/* 3. DANH SÁCH BÌNH LUẬN */}
                <div className="pr-comment-list">
                    {comments.map(comment => (
                        <div key={comment.id} className="pr-comment-item">
                            <div className="pr-avatar">{comment.avatar}</div>
                            <div className="pr-comment-body">
                                <div className="pr-user-meta">
                                    <span className="pr-username">{comment.user}</span>
                                    <span className="pr-dot">•</span>
                                    <span className="pr-time">{comment.time}</span>
                                </div>
                                <div className="pr-content">{comment.content}</div>
                                
                                <div className="pr-actions">
                                    <button className="pr-action-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                        0
                                    </button>
                                    <button className="pr-action-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        Trả lời
                                    </button>
                                </div>

                                {/* ADMIN REPLY */}
                                {comment.replies && comment.replies.map(reply => (
                                    <div key={reply.id} className="pr-reply-box">
                                        <div className="pr-avatar-img">
                                            <img src={reply.avatar} alt="Admin" />
                                        </div>
                                        <div className="pr-reply-content">
                                            <div className="pr-user-meta">
                                                <span className="pr-username">{reply.user}</span>
                                                {reply.isAdmin && <span className="pr-badge-admin">Quản trị viên</span>}
                                                <span className="pr-dot">•</span>
                                                <span className="pr-time">{reply.time}</span>
                                            </div>
                                            <div className="pr-content" dangerouslySetInnerHTML={{__html: reply.content}}></div>
                                            <div className="pr-actions">
                                                <button className="pr-action-btn">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                                    0
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION (Đơn giản hóa) */}
                <div className="pr-pagination">
                    <span className="pr-page-item active">1</span>
                    <span className="pr-page-item">2</span>
                    <span className="pr-page-item">3</span>
                    <span className="pr-page-item">...</span>
                    <span className="pr-page-item">89</span>
                    <span className="pr-page-item">&gt;</span>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;