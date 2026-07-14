
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { reviewService } from '../../../../service/reviewService';
import type { ReviewResponse} from '../../../../types/review.types'; 

export const useProductReviews = (slug: string) => {
  
    const [reviewData, setReviewData] = useState<ReviewResponse>({ summary: undefined, comments: [] });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const [page, setPage] = useState<number>(1);
    const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
    const limit = 10;
    const [commentContent, setCommentContent] = useState<string>("");
    const [commentFiles, setCommentFiles] = useState<File[]>([]); 
    const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [replyingToId, setReplyingToId] = useState<number | null>(null);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const hasPurchased = reviewData.summary?.currentUserHasPurchased || false;

    const fetchReviews = useCallback(async () => {
        if (!slug) return;
        setIsLoading(true);
        try {
            const data = await reviewService.getReviewsByProduct(slug, page, limit, selectedFilter);
            setReviewData(data);
        } catch (error: any) {
            console.error("Lỗi lấy bình luận:", error);
            message.error(error.message || "Không thể tải đánh giá.");
        } finally {
            setIsLoading(false);
        }
    }, [slug, page, selectedFilter]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleFilterClick = (value: number | null) => {
        setSelectedFilter(value);
        setPage(1); 
    };

    const handleCommentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setCommentFiles(prev => [...prev, ...files].slice(0, 6));
    };

    const handleSubmitComment = async () => {
        if (!commentContent.trim()) return message.warning("Vui lòng nhập nội dung!");
        if (!user) return message.warning("Bạn cần đăng nhập để gửi bình luận!");

        setIsSubmittingComment(true);
        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('content', commentContent);
            commentFiles.forEach(file => formData.append('files', file));
            await reviewService.createReview(formData);
            message.success("Gửi bình luận thành công!");
            setCommentContent(""); 
            setCommentFiles([]);
            setPage(1); 
            setSelectedFilter(null);
            fetchReviews();
        } catch (error: any) {
            message.error(error?.message || "Có lỗi xảy ra khi gửi bình luận.");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleModalSubmit = async (rating: number, content: string, files: File[]) => {
        if (!user) return message.warning("Bạn cần đăng nhập để đánh giá!");

        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('rating', String(rating));
            formData.append('content', content);
            files.forEach(file => formData.append('files', file));

            await reviewService.createReview(formData);
            
            message.success("Đánh giá thành công!");
            setIsModalOpen(false);
            setPage(1); 
            setSelectedFilter(null);
            fetchReviews();
        } catch (error: any) {
            message.error(error?.message || "Có lỗi xảy ra khi đánh giá.");
        }
    };

    const handleReplySubmit = async (commentId: number, content: string) => {
        if (!user) return message.warning("Bạn cần đăng nhập để trả lời!");
        if (!content.trim()) return message.warning("Vui lòng nhập nội dung trả lời!");

        try {
            const formData = new FormData();
            formData.append('product_slug', slug);
            formData.append('content', content);
            formData.append('parent_id', String(commentId)); 

            await reviewService.createReview(formData);
            
            message.success("Đã gửi phản hồi thành công!");
            setReplyingToId(null); 
            fetchReviews(); 
        } catch (error: any) {
            message.error(error?.message || "Có lỗi xảy ra khi gửi phản hồi.");
        }
    };

    return {
        reviewData, isLoading, page, setPage, selectedFilter,
        commentContent, setCommentContent, commentFiles, setCommentFiles,
        isSubmittingComment, isModalOpen, setIsModalOpen,
        replyingToId, setReplyingToId, hasPurchased, limit,
        handleFilterClick, handleCommentFileChange,
        handleSubmitComment, handleModalSubmit, handleReplySubmit
    };
};