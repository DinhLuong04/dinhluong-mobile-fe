import React, { useMemo } from 'react';
import type { ProductDetailResponse } from '../../../types/product.types';
import './HighlightSpecs.css';

interface Props {
  products: ProductDetailResponse[]; 
  showDiff: boolean; 
}
const MAX_COMPARE_COLUMNS = 3; 
const HighlightSpecs: React.FC<Props> = ({ products, showDiff }) => {
  
  const specData = useMemo(() => {
      const allLabels = new Set<string>();
      products.forEach(p => {
          p.highlightSpecs?.forEach(spec => {
              if (spec.label) allLabels.add(spec.label);
          });
      });

      let result = Array.from(allLabels).map(label => {
          const values = products.map(p => {
              const found = p.highlightSpecs?.find(s => s.label === label);
              return (found && found.value && found.value.trim() !== "") ? found.value : "—";
          });
          return { label, values };
      });

      // --- LOGIC LỌC ĐIỂM KHÁC BIỆT ---
      if (showDiff) {
          result = result.filter(item => {
              const firstVal = item.values[0];
              return item.values.some(val => val !== firstVal);
          });
      }

      return result;
  }, [products, showDiff]);

  if (!products || products.length === 0) return null;
  if (showDiff && specData.length === 0) return null; 

  return (
    <div className='container' id="highlight-specs">
      <div className="highlight-section">
        <div className="highlight-header">
           <h3>Thông số nổi bật</h3>
        </div>
        <div className="highlight-body">
          {specData.map((spec) => (
            <div key={spec.label} className="spec-group">
              <div className="spec-label-row">
                <span className="spec-label">{spec.label}</span>
                <div className="spec-dashed-line"></div>
              </div>
              <div className="spec-values-grid">
                {spec.values.map((val, idx) => (
                    <div key={idx} className="spec-value-item">{val}</div>
                ))}
                {/* Giữ nguyên số 3 khớp với layout cột hiện tại */}
                {[...Array(Math.max(0, MAX_COMPARE_COLUMNS - products.length))].map((_, idx) => (
                    <div key={`empty-${idx}`} className="spec-value-item empty"></div>
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