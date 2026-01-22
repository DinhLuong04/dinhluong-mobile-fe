import React, { useMemo } from 'react';
import type { ProductDetail } from '../../../types/Product.types';
import './HighlightSpecs.css';

interface Props {
  products: ProductDetail[];
  showDiff: boolean; // Nhận prop mới
}

const HighlightSpecs: React.FC<Props> = ({ products, showDiff }) => {
  
  const specData = useMemo(() => {
      const allLabels = new Set<string>();
      products.forEach(p => {
          p.highlightSpecs?.forEach(spec => allLabels.add(spec.label));
      });

      let result = Array.from(allLabels).map(label => {
          const values = products.map(p => {
              const found = p.highlightSpecs?.find(s => s.label === label);
              return found ? found.value : "—";
          });
          return { label, values };
      });

      // --- LOGIC LỌC ---
      if (showDiff) {
          result = result.filter(item => {
              // Lấy giá trị đầu tiên làm chuẩn
              const firstVal = item.values[0];
              // Giữ lại dòng nếu CÓ ÍT NHẤT 1 giá trị khác với giá trị đầu tiên
              return item.values.some(val => val !== firstVal);
          });
      }

      return result;
  }, [products, showDiff]);

  if (products.length === 0) return null;
  // Nếu bật lọc mà không có gì khác nhau thì cũng ẩn luôn section này cho gọn (tuỳ chọn)
  if (showDiff && specData.length === 0) return null; 

  return (
    <div className='container' id="highlight-specs"> {/* QUAN TRỌNG: Thêm ID để scroll tới */}
      <div className="highlight-section">
        <div className="highlight-header">
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
                {products.map((_, idx) => (
                    <div key={idx} className="spec-value-item">{spec.values[idx]}</div>
                ))}
                {[...Array(Math.max(0, 3 - products.length))].map((_, idx) => (
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