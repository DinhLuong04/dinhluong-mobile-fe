import React from 'react';
import './HighlightSpecs.css';

// Dữ liệu giả lập (thường sẽ được props truyền vào hoặc lấy từ API)
// Mỗi row tương ứng với 1 dòng thông số, 'values' là mảng 3 phần tử tương ứng 3 sản phẩm
const SPEC_DATA = [
  { label: 'Chip', values: ['Apple A19', 'Apple A19 Pro', 'Snapdragon 8 Gen 4'] },
  { label: 'Kích thước màn hình', values: ['6.3 inch', '6.85 inch', '6.59 inch'] },
  { label: 'Thời lượng pin', values: ['30 Giờ', '33 Giờ', '—'] }, // Dấu gạch ngang cho ô trống
  { label: 'Kết nối NFC', values: ['NFC', 'NFC', 'OTG'] },
  { label: 'Camera', values: ['48.0 MP', '50.0 MP', '50.0 MP'] },
  { label: 'RAM', values: ['8 GB', '12 GB', '16 GB'] },
];

const HighlightSpecs: React.FC = () => {
  return (
    <div className='container'>
      <div className="highlight-section">
      {/* Header */}
      <div className="highlight-header">
        {/* Icon Ngôi sao (lấy từ SVG gốc của bạn) */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path d="M4.9187 0.379523C5.1215 -0.0764766 5.7461 -0.0986767 5.9909 0.311123L6.0263 0.379523L6.6515 1.78652C7.19742 3.01467 8.10529 4.04688 9.2537 4.74512L9.4469 4.85852L10.5569 5.48252C10.6451 5.53192 10.7196 5.60262 10.7735 5.68818C10.8275 5.77373 10.8591 5.87142 10.8656 5.97234C10.8721 6.07326 10.8533 6.17421 10.8108 6.26597C10.7683 6.35774 10.7035 6.43741 10.6223 6.49772L10.5575 6.53972L9.4469 7.16372C8.27533 7.82273 7.33291 8.82377 6.7457 10.0329L6.6515 10.2357L6.0263 11.6427C5.8235 12.0987 5.1989 12.1209 4.9541 11.7111L4.9187 11.6427L4.2935 10.2357C3.74758 9.00757 2.83971 7.97536 1.6913 7.27712L1.4981 7.16372L0.3881 6.53972C0.299857 6.49032 0.22538 6.41962 0.171457 6.33407C0.117535 6.24851 0.0858801 6.15083 0.0793787 6.0499C0.0728773 5.94898 0.0917358 5.84804 0.134236 5.75628C0.176735 5.66451 0.241525 5.58484 0.3227 5.52452L0.3875 5.48252L1.4981 4.85852C2.66967 4.19951 3.61209 3.19848 4.1993 1.98932L4.2935 1.78652L4.9187 0.379523Z" />
        </svg>
        <h3>Thông số nổi bật</h3>
      </div>

      {/* Body List */}
      <div className="highlight-body">
        {SPEC_DATA.map((spec, index) => (
          <div key={index} className="spec-group">
            
            {/* Dòng Tiêu đề + Kẻ đứt */}
            <div className="spec-label-row">
              <span className="spec-label">{spec.label}</span>
              <div className="spec-dashed-line"></div>
            </div>

            {/* Grid 3 cột giá trị */}
            <div className="spec-values-grid">
              {/* Render 3 giá trị cho 3 cột. Nếu thiếu data thì render ô trống */}
              {[0, 1, 2].map((colIndex) => (
                <div key={colIndex} className="spec-value-item">
                  {spec.values[colIndex] || ''}
                </div>
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