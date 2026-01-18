import React, { useState, useEffect, useRef, useCallback } from 'react'; // 1. Import useCallback
import { specsData, specImages } from './specsData';
import "./ProductSpecsModal.css";

interface ProductSpecsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProductSpecsModal: React.FC<ProductSpecsModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState(specsData[0].id);
    const bodyRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const isClickingRef = useRef(false);

    // 2. KHAI BÁO HÀM NÀY TRƯỚC useEffect VÀ DÙNG useCallback
    // Hàm cuộn thanh menu ngang để nút active luôn hiển thị
    const scrollNavToActive = useCallback((id: string) => {
        if (!navRef.current) return;
        
        const activeButton = navRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
        
        if (activeButton) {
            const navWidth = navRef.current.offsetWidth;
            const itemLeft = activeButton.offsetLeft;
            const itemWidth = activeButton.offsetWidth;

            // Tính toán vị trí để nút nằm giữa
            const scrollLeft = itemLeft - (navWidth / 2) + (itemWidth / 2);
            
            navRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, []); // Dependency array rỗng vì nó không phụ thuộc state nào thay đổi liên tục

    // Hàm cuộn đến section khi click menu
    const scrollToSection = (id: string) => {
        isClickingRef.current = true;
        setActiveTab(id);
        scrollNavToActive(id); // Gọi hàm cuộn menu ngay khi click

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

    // 3. useEffect GIỜ ĐÃ CÓ THỂ GỌI scrollNavToActive VÌ NÓ ĐƯỢC KHAI BÁO BÊN TRÊN
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
                            scrollNavToActive(group.id); // <--- Hết lỗi tại đây
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
    }, [activeTab, isOpen, scrollNavToActive]); // Thêm scrollNavToActive vào dependency

    if (!isOpen) return null;

    return (
        <>
            <div className={`specs-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>

            <div className={`specs-drawer ${isOpen ? 'open' : ''}`}>
                <div className="specs-header">
                    <h3 className="specs-title">Thông số nổi bật</h3>
                    <button className="specs-close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="specs-body" ref={bodyRef}>
                    <div className="specs-images">
                        <img src={specImages[0]} alt="Info 1" className="specs-main-img" />
                        <img src={specImages[1]} alt="Info 2" className="specs-main-img" />
                    </div>

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
                                        <div className="specs-value">{item.value}</div>
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