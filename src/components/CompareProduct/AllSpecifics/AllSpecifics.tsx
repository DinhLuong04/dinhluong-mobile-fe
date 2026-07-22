import React, { useState, useMemo } from 'react';
import type { ProductDetailResponse, SpecGroupDto, SpecItemDto } from '../../../types/product.types'; 
import './AllSpecifics.css';

interface Props {
  products: ProductDetailResponse[]; 
  showDiff: boolean; 
}

interface MergedItem { 
  label: string; 
  values: string[]; 
}

interface MergedGroup { 
  title: string; 
  items: MergedItem[]; 
}

const MAX_COMPARE_COLUMNS = 3; 

const AllSpecifics: React.FC<Props> = ({ products, showDiff }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2, 3, 4]); 

  const mergedGroups = useMemo<MergedGroup[]>(() => {
      if (!products || products.length === 0) return [];

      const groupMap = new Map<string, { title: string, itemsMap: Map<string, string[]> }>();

      products.forEach((product, prodIndex) => {
          const specs = product.specsData; 
          if (!specs) return;

          specs.forEach((group: SpecGroupDto) => {
              const groupTitle = group.title || "Thông số khác";
              if (!groupMap.has(groupTitle)) {
                  groupMap.set(groupTitle, { title: groupTitle, itemsMap: new Map() });
              }
              const currentGroup = groupMap.get(groupTitle)!;

              group.items?.forEach((item: SpecItemDto) => {
                  const itemLabel = item.label || "";
                  if (!itemLabel) return;

                  if (!currentGroup.itemsMap.has(itemLabel)) {
                      currentGroup.itemsMap.set(itemLabel, new Array(products.length).fill("—"));
                  }
                  const valuesArray = currentGroup.itemsMap.get(itemLabel)!;
                  valuesArray[prodIndex] = (item.value && item.value.trim() !== "") ? item.value : "—";
              });
          });
      });

      let finalGroups = Array.from(groupMap.values()).map(g => ({
          title: g.title,
          items: Array.from(g.itemsMap.entries()).map(([label, values]) => ({ label, values }))
      }));

      // --- LOGIC LỌC THÔNG SỐ KHÁC BIỆT ---
      if (showDiff) {
          finalGroups = finalGroups.map(group => {
              const filteredItems = group.items.filter(item => {
                  const firstVal = item.values[0];
                  return item.values.some(val => val !== firstVal);
              });
              return { ...group, items: filteredItems };
          })
          .filter(group => group.items.length > 0);
      }

      return finalGroups;

  }, [products, showDiff]);

  const toggleSection = (index: number) => {
    setOpenIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  if (!products || products.length === 0) return null;

  return (
    <div id="all-specifics" className="all-specifics-container">
      {mergedGroups.map((group) => {
        const groupIndex = mergedGroups.indexOf(group);
        const isOpen = openIndexes.includes(groupIndex);

        return (
          <div key={group.title} className="accordion-item">
            <div 
              className={`accordion-header ${isOpen ? 'active' : ''}`} 
              onClick={() => toggleSection(groupIndex)}
              role="button"
              tabIndex={0}
            >
              <h4 className="accordion-title">{group.title}</h4>
              <span className="accordion-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                    <path d="M3.2 5.7c.3-.3.8-.3 1.1 0L8 9.2l3.7-3.5c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-4.2 4c-.3.3-.8.3-1.1 0l-4.2-4c-.3-.3-.3-.8 0-1.1z"/>
                  </svg>
              </span>
            </div>

            <div className={`accordion-collapse ${isOpen ? 'open' : ''}`}>
              <div className="pb-4 bg-white">
                {group.items.map((spec) => (
                  <div key={spec.label} className="spec-row">
                    <div className="spec-row-header">
                      <h6 className="spec-row-title">{spec.label}</h6>
                      <div className="spec-dashed"></div>
                    </div>
                    <div className="spec-grid">
                       {spec.values.map((val, idx) => (
                           <div key={idx} className="spec-cell">{val}</div>
                       ))}
                       {/* Render các ô trống nếu số sản phẩm ít hơn số cột tối đa */}
                       {[...Array(Math.max(0, MAX_COMPARE_COLUMNS - products.length))].map((_, idx) => (
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