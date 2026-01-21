// HighlightSpecs.tsx
import React, { useMemo } from 'react';
import type { ProductDetail } from '../../../types/Product.types';
import './HighlightSpecs.css';

interface Props {
  products: ProductDetail[];
}

const HighlightSpecs: React.FC<Props> = ({ products }) => {
  
  // Logic Transform Data:
  // Gom tất cả các label thông số nổi bật lại thành 1 danh sách duy nhất (Unique)
  const specData = useMemo(() => {
      // 1. Lấy tất cả label có thể có
      const allLabels = new Set<string>();
      products.forEach(p => {
          p.highlightSpecs?.forEach(spec => allLabels.add(spec.label));
      });

      // 2. Với mỗi label, tìm giá trị tương ứng của từng sản phẩm
      return Array.from(allLabels).map(label => {
          const values = products.map(p => {
              const found = p.highlightSpecs?.find(s => s.label === label);
              return found ? found.value : "—";
          });
          return { label, values };
      });
  }, [products]);

  if (products.length === 0) return null;

  return (
    <div className='container'>
      <div className="highlight-section">
        <div className="highlight-header">
           {/* SVG Icon Star */}
           <h3>Thông số nổi bật</h3>
        </div>

        <div className="highlight-body">
          {specData.map((spec, index) => (
            <div key={index} className="spec-group">
              <div className="spec-label-row">
                <span className="spec-label">{spec.label}</span>
                <div className="spec-dashed-line"></div>
              </div>
              <div className="spec-values-grid">
                {/* Render giá trị cho các sản phẩm hiện có */}
                {products.map((_, idx) => (
                    <div key={idx} className="spec-value-item">
                        {spec.values[idx]}
                    </div>
                ))}
                {/* Render ô trống cho đủ 3 cột nếu thiếu sản phẩm */}
                {[...Array(3 - products.length)].map((_, idx) => (
                    <div key={`empty-${idx}`} className="spec-value-item"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightSpecs;