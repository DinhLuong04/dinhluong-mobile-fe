import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./ProductSpecsModal.css";

// 1. Import Type
import type { SpecGroup } from '../../../types/Product.types';

// 2. Định nghĩa Props
interface ProductSpecsModalProps {
    isOpen: boolean;
    onClose: () => void;
    specsData: SpecGroup[];     // Dữ liệu thông số kỹ thuật
    productImages?: string[];   // Dữ liệu ảnh sản phẩm (để hiển thị trang trí đầu modal)
}

const ProductSpecsModal: React.FC<ProductSpecsModalProps> = ({ 
    isOpen, 
    onClose, 
    specsData = [],
    productImages = []
}) => {
    // 3. Khởi tạo activeTab an toàn (nếu chưa có data thì để rỗng)
   
    
    const bodyRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const isClickingRef = useRef(false);

   const [activeTab, setActiveTab] = useState<string | number>(
        specsData.length > 0 ? specsData[0].id : ""
    );

    // Hàm cuộn thanh menu ngang
    const scrollNavToActive = useCallback((id: string | number) => {
        if (!navRef.current) return;
        
        const activeButton = navRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        
        if (activeButton) {
            const navWidth = navRef.current.offsetWidth;
            const itemLeft = activeButton.offsetLeft;
            const itemWidth = activeButton.offsetWidth;

            const scrollLeft = itemLeft - (navWidth / 2) + (itemWidth / 2);
            
            navRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, []);

    // Hàm cuộn đến section khi click menu
    const scrollToSection = (id: string | number) => {
        isClickingRef.current = true;
        setActiveTab(id);
        scrollNavToActive(id);

        const element = document.getElementById(`spec-group-${id}`);
        const bodyElement = bodyRef.current;

        if (element && bodyElement) {
            const offsetTop = element.offsetTop - bodyElement.offsetTop; 
            
            bodyElement.scrollTo({
                top: offsetTop - 10,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isClickingRef.current = false;
            }, 600);
        }
    };

    // Scroll Spy: Tự động active tab khi cuộn nội dung
    useEffect(() => {
        const handleScroll = () => {
            if (isClickingRef.current || !bodyRef.current) return;

            const bodyScrollTop = bodyRef.current.scrollTop;
            const bodyOffsetTop = bodyRef.current.offsetTop;
            
            for (const group of specsData) {
                const element = document.getElementById(`spec-group-${group.id}`);
                if (element) {
                    const elementTop = element.offsetTop - bodyOffsetTop;
                    const elementBottom = elementTop + element.offsetHeight;

                    // Kiểm tra vùng nhìn thấy
                    if (bodyScrollTop >= elementTop - 100 && bodyScrollTop < elementBottom) {
                        if (activeTab !== group.id) {
                            setActiveTab(group.id);
                            scrollNavToActive(group.id);
                        }
                        break;
                    }
                }
            }
        };

        const bodyElement = bodyRef.current;
        if (bodyElement) {
            bodyElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (bodyElement) {
                bodyElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [activeTab, isOpen, scrollNavToActive, specsData]); // Thêm specsData vào dependency

    if (!isOpen) return null;

    return (
        <>
            <div className={`specs-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

            <div className={`specs-drawer ${isOpen ? 'open' : ''}`}>
                <div className="specs-header">
                    <h3 className="specs-title">Thông số kỹ thuật</h3>
                    <button className="specs-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="specs-body" ref={bodyRef}>
                    {/* Hiển thị 2 ảnh đầu tiên nếu có */}
                    {productImages.length > 0 && (
                        <div className="specs-images">
                            {productImages.slice(0, 2).map((img, idx) => (
                                <img key={idx} src={img} alt={`Product spec ${idx}`} className="specs-main-img" />
                            ))}
                        </div>
                    )}

                    <div className="specs-nav" ref={navRef}>
                        {specsData.map((group) => (
                            <button
                                key={group.id}
                                data-id={group.id}
                                className={`specs-nav-item ${activeTab === group.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(group.id)}
                            >
                                {group.title}
                            </button>
                        ))}
                    </div>

                    <div className="specs-content">
                        {specsData.map((group) => (
                            <div key={group.id} id={`spec-group-${group.id}`} className="specs-group">
                                <h4 className="specs-group-title">{group.title}</h4>
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="specs-row">
                                        <div className="specs-label">{item.label}</div>
                                        {/* Thêm style pre-line để nhận ký tự \n xuống dòng */}
                                        <div className="specs-value" style={{ whiteSpace: 'pre-line' }}>
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductSpecsModal;