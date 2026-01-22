import React, { useState, useMemo } from 'react';
import type { ProductDetail, SpecGroup, SpecItem } from '../../../types/Product.types'; 
import './AllSpecifics.css';

interface Props {
  products: ProductDetail[];
  showDiff: boolean; // Nhận prop mới
}

interface MergedItem { label: string; values: string[]; }
interface MergedGroup { title: string; items: MergedItem[]; }

const AllSpecifics: React.FC<Props> = ({ products, showDiff }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2, 3, 4]); // Mở sẵn nhiều hơn tí cho dễ nhìn

  const mergedGroups = useMemo<MergedGroup[]>(() => {
      if (!products || products.length === 0) return [];

      const groupMap = new Map<string, { title: string, itemsMap: Map<string, string[]> }>();

      products.forEach((product, prodIndex) => {
          const specs = product.specsData; 
          if (!specs) return;

          specs.forEach((group: SpecGroup) => {
              if (!groupMap.has(group.title)) {
                  groupMap.set(group.title, { title: group.title, itemsMap: new Map() });
              }
              const currentGroup = groupMap.get(group.title)!;

              group.items.forEach((item: SpecItem) => {
                  if (!currentGroup.itemsMap.has(item.label)) {
                      currentGroup.itemsMap.set(item.label, new Array(products.length).fill("—"));
                  }
                  const valuesArray = currentGroup.itemsMap.get(item.label)!;
                  valuesArray[prodIndex] = (item.value && item.value.trim() !== "") ? item.value : "—";
              });
          });
      });

      let finalGroups = Array.from(groupMap.values()).map(g => ({
          title: g.title,
          items: Array.from(g.itemsMap.entries()).map(([label, values]) => ({ label, values }))
      }));

      // --- LOGIC LỌC ---
      if (showDiff) {
          finalGroups = finalGroups.map(group => {
              // 1. Lọc các items bên trong nhóm
              const filteredItems = group.items.filter(item => {
                  const firstVal = item.values[0];
                  // Giữ lại nếu có sự khác biệt
                  return item.values.some(val => val !== firstVal);
              });
              
              // Trả về nhóm mới với items đã lọc
              return { ...group, items: filteredItems };
          })
          // 2. Loại bỏ các nhóm không còn item nào sau khi lọc
          .filter(group => group.items.length > 0);
      }

      return finalGroups;

  }, [products, showDiff]); // Chạy lại khi showDiff thay đổi

  const toggleSection = (index: number) => {
    setOpenIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  if (!products || products.length === 0) return null;

  return (
    <div id="all-specifics" className="all-specifics-container"> {/* QUAN TRỌNG: ID đã có sẵn */}
      {mergedGroups.map((group, groupIndex) => {
        const isOpen = openIndexes.includes(groupIndex);

        return (
          <div key={groupIndex} className="accordion-item">
            <div className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={() => toggleSection(groupIndex)}>
              <h4 className="accordion-title">{group.title}</h4>
              <span className="accordion-icon">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3.2 5.7c.3-.3.8-.3 1.1 0L8 9.2l3.7-3.5c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-4.2 4c-.3.3-.8.3-1.1 0l-4.2-4c-.3-.3-.3-.8 0-1.1z"/></svg>
              </span>
            </div>
            <div className={`accordion-collapse ${isOpen ? 'open' : ''}`}>
              <div className="pb-4 bg-white">
                {group.items.map((spec, specIndex) => (
                  <div key={specIndex} className="spec-row">
                    <div className="spec-row-header">
                      <h6 className="spec-row-title">{spec.label}</h6>
                      <div className="spec-dashed"></div>
                    </div>
                    <div className="spec-grid">
                       {spec.values.map((val, idx) => (
                           <div key={idx} className="spec-cell">{val}</div>
                       ))}
                       {[...Array(Math.max(0, 3 - products.length))].map((_, idx) => (
                           <div key={`empty-${idx}`} className="spec-cell empty"></div>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AllSpecifics;