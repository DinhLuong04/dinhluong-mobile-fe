import React, { useRef, useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCompare } from '../../../contexts/CompareContext';
import type { Product } from '../../../types/Product.types';
import './ProductHot.css';
import ProductCard from '../ProductCard/ProductCard';

// 1. IMPORT SERVICE Y HỆT BÊN PRODUCT LIST
import { productService } from '../../../service/productService'; 

const ProductHot: React.FC = () => {
    const { addToCompare } = useCompare();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 2. FETCH VÀ MAP DATA THEO CHUẨN MỚI
    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                // Gọi qua service
                const responseData = await productService.getFeaturedProducts(10);

                // Map y hệt như bên màn ProductList
                const cleanData: Product[] = responseData.map((item: any) => ({
                    ...item,
                    // Fix dự phòng: Nhỡ DTO backend vẫn trả thumbnailUrl thì map qua image cho thẻ Card
                    image: item.image || item.thumbnailUrl, 
                    price: item.price || item.displayPrice, 
                    
                    discountNote: item.discountNote ?? undefined,
                    installmentText: item.installmentText ?? undefined,
                    promotionText: item.promotionText ?? undefined,
                    originalPrice: item.originalPrice ?? 0,
                }));

                setProducts(cleanData);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm Hot Sale:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotProducts();
    }, []);

    const handleCompare = (product: Product) => {
        console.log('Đã thêm so sánh:', product.name);
        addToCompare(product);
    };

    // --- CÁC HÀM XỬ LÝ SCROLL (Giữ nguyên không đổi) ---
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        isDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        isDown.current = false;
        setTimeout(() => setIsDragging(false), 0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDown.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; 
        if (Math.abs(x - startX.current) > 5) {
            if (!isDragging) setIsDragging(true);
            scrollRef.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="section-hot-sale">
            <div className="container">
                <div className="hot-sale-banner">
                    <img src="https://res.cloudinary.com/dhujtl4cm/image/upload/v1768385656/N%E1%BB%81n_SP_pd4b6i.jpg" alt="Hot Sale Banner" />
                </div>

                <div className="hot-sale-slider-container">
                    <button className="nav-btn prev" onClick={() => scroll('left')}>❮</button>
                    <button className="nav-btn next" onClick={() => scroll('right')}>❯</button>

                    <div 
                        className={`scroll-wrapper ${isDragging ? 'dragging' : ''}`} 
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {loading ? (
                            <p style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>Đang tải sản phẩm Hot...</p>
                        ) : products.length > 0 ? (
                            products.map((prod) => (
                                <div key={prod.id} className="scroll-item">
                                    <div style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
                                        <ProductCard 
                                            product={prod} 
                                            onCompare={handleCompare} 
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>Chưa có sản phẩm nổi bật nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHot;