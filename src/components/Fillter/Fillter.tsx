import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import './Fillter.css'; 

// 1. IMPORT TYPE (Đảm bảo đường dẫn đúng)
import type { ProductFilterParams } from "../../types/Product.types"
const extractNumber = (str: string): number | undefined => {
      const match = str.match(/\d+(\.\d+)?/); // Tìm số nguyên hoặc số thập phân
      return match ? parseFloat(match[0]) : undefined;
  };
// --- Icons (Giữ nguyên) ---
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.2 5.7C3.5 5.4 4 5.4 4.3 5.7L8 9.2L11.7 5.7C12 5.4 12.5 5.4 12.8 5.7C13.1 6 13.1 6.5 12.8 6.8L8.5 10.8C8.2 11.1 7.8 11.1 7.5 10.8L3.2 6.8C2.9 6.5 2.9 6 3.2 5.7Z" fill="#090D14"/>
  </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.9 1.9C6 2 6 2.2 5.9 2.4L2.3 5.7C2.1 5.8 1.9 5.8 1.7 5.7L0.5 4.5C0.4 4.3 0.4 4.1 0.5 4C0.6 3.9 0.9 3.9 1 4L2 5L5.4 1.9C5.6 1.8 5.8 1.8 5.9 1.9Z" fill="white" stroke="white" strokeWidth="0.4" strokeLinecap="round"></path>
    </svg>
);

// --- Data Constants (Giữ nguyên) ---
const BRANDS = [
  { id: 1, name: "iPhone", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_iphone_ngang_eac93ff477.png" },
  { id: 2, name: "Samsung", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_samsung_ngang_1624d75bd8.png"},
  { id: 3, name: "Honor", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_honor_ngang_814fca59e4.png" },
  { id: 4, name: "Tecno", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_tecno_ngang_c587e5f1fa.png" },
  { id: 5, name: "Nokia", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_nokia_ngang_15416db151.png" },
  { id: 6, name: "Viettel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_viettel_ngang_95c33a2faa.png" },
  { id: 7, name: "Realme", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_realme_ngang_0185815a13.png" },
  { id: 8, name: "Mobell", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_mobell_ngang_27f930cc0a.png" },
  { id: 9, name: "Xiaomi", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_xiaomi_ngang_0faf267234.png" },
  { id: 10, name: "Oppo", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_oppo_ngang_68d31fcd73.png" },
  { id: 11, name: "RedMagic", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_redmagic_ngang_505d29c537.png" },
  { id: 12, name: "ZTE Nubia", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_zte_ngang_2e0d8b4de1.png" },
  { id: 13, name: "Masstel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_masstel_ngang_2a96b9898c.png" },
  { id: 14, name: "TCL", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_tcl_ngang_0ed4175607.png" },
  { id: 15, name: "Benco", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_benco_ngang_d31d9c3b77.png" },
  { id: 16, name: "Inoi", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_inoi_ngang_61080bdeb9.png" },
  { id: 17, name: "Itel", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_itel_ngang_acd1031b09.png" },
  { id: 18, name: "Vivo", image: "https://cdn2.fptshop.com.vn/unsafe/256x0/filters:format(webp):quality(75)/small/logo_vivo_ngang_45494ff733.png" },
];

const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'under-2m', label: 'Dưới 2 triệu' },
  { id: '2m-4m', label: 'Từ 2 - 4 triệu' },
  { id: '4m-7m', label: 'Từ 4 - 7 triệu' },
  { id: '7m-13m', label: 'Từ 7 - 13 triệu' },
  { id: '13m-20m', label: 'Từ 13 - 20 triệu' },
  { id: 'over-20m', label: 'Trên 20 triệu' },
];

const OS_TAGS = ['iOS', 'Android'];
const ROM_TAGS = ['128 GB', '256 GB', '512 GB', '1 TB'];
const BATTERY_TAGS = ['Tất cả', 'Dưới 3000 mAh', 'Pin từ 3000 - 4000 mAh', 'Pin từ 4000 - 5500 mAh', 'Pin trâu: trên 5500 mAh'];
const NETWORK_TAGS = ['5G', '4G'];
const RAM_TAGS = ['3 GB', '4 GB', '6 GB', '8 GB', '12 GB', '16 GB'];
const SCREEN_TAGS = ['Tất cả', 'Màn hình nhỏ', 'Từ 5 - 6.5 inch', 'Từ 6.5 - 6.8 inch', 'Trên 6.8 inch'];
const REFRESH_RATE_TAGS = ['Trên 144 Hz', '120 Hz', '90 Hz', '60 Hz'];


// --- Sub-Components (Giữ nguyên) ---
const AccordionSection: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className={`adv-filter__accordion-item ${isOpen ? 'open' : ''}`}>
    <div className="adv-filter__accordion-header" onClick={onToggle}>
      <span className="adv-filter__accordion-title">{title}</span>
      <div className="adv-filter__accordion-icon"><ChevronDownIcon /></div>
    </div>
    <div className="adv-filter__accordion-content">
      {children}
    </div>
  </div>
);

const TagFilterGroup: React.FC<{
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
}> = ({ items, selectedItems, onToggle }) => (
  <div className="adv-filter__tag-list">
    {items.map(item => (
      <button 
        key={item}
        className={`adv-filter__tag ${selectedItems.includes(item) ? 'active' : ''}`}
        onClick={() => onToggle(item)}
      >
        {item}
        {selectedItems.includes(item) && <CheckIcon />}
      </button>
    ))}
  </div>
);

const CheckboxFilterGroup: React.FC<{
    items: string[];
    selectedItems: string[];
    onToggle: (item: string) => void;
}> = ({ items, selectedItems, onToggle }) => (
    <div className="adv-filter__checkbox-list">
        {items.map(item => (
            <label key={item} className="adv-filter__checkbox-item">
                <input 
                    type="checkbox" 
                    checked={selectedItems.includes(item)}
                    onChange={() => onToggle(item)}
                />
                <span>{item}</span>
            </label>
        ))}
    </div>
);

// 2. CẬP NHẬT PROPS INTERFACE
interface AdvanceFilterProps {
  isOpen?: boolean;
  onClose?: () => void;
  // Callback để truyền dữ liệu lên cha (ProductSection)
  onApply: (filters: ProductFilterParams) => void; 
}

// --- Main Component ---
const AdvanceFilter: React.FC<AdvanceFilterProps> = ({ isOpen, onClose, onApply }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    os: false,
    rom: false,
    battery: false,
    network: false,
    ram: false,
    screen: false,
    refreshRate: false,
  });

  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(['all']);
  const [priceRangeValue, setPriceRangeValue] = useState<[number, number]>([0, 100]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);
  const [selectedROM, setSelectedROM] = useState<string[]>([]);
  const [selectedBattery, setSelectedBattery] = useState<string[]>(['Tất cả']);
  const [selectedNetwork, setSelectedNetwork] = useState<string[]>([]);
  const [selectedRAM, setSelectedRAM] = useState<string[]>([]);
  const [selectedScreen, setSelectedScreen] = useState<string[]>(['Tất cả']);
  const [selectedRefreshRate, setSelectedRefreshRate] = useState<string[]>([]);
  const [isBrandExpanded, setIsBrandExpanded] = useState(false);

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSelection = <T,>(item: T, list: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const toggleRadioLikeSelection = (item: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (item === 'Tất cả') {
          setter(['Tất cả']);
      } else {
          let newList = list.filter(i => i !== 'Tất cả');
          if (newList.includes(item)) {
              newList = newList.filter(i => i !== item);
          } else {
              newList = [...newList, item];
          }
          if (newList.length === 0) newList = ['Tất cả'];
          setter(newList);
      }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 3. HÀM XỬ LÝ NÚT "ÁP DỤNG"
  const handleApplyClick = () => {
    const filters: ProductFilterParams = {};

    // A. Brands (Chuyển ID -> Tên để gửi backend)
    if (selectedBrands.length > 0) {
        // Tìm tên hãng dựa vào ID đã chọn
        filters.brands = BRANDS
            .filter(b => selectedBrands.includes(b.id))
            .map(b => b.name);
    }

    // B. OS
    if (selectedOS.length > 0) filters.os = selectedOS;

    // C. ROM
    if (selectedROM.length > 0) filters.roms = selectedROM;

    // D. RAM
    if (selectedRAM.length > 0) filters.rams = selectedRAM;

    // E. Network
    if (selectedNetwork.length > 0) filters.networks = selectedNetwork;

    // F. Price (Logic ưu tiên Checkbox, nếu không chọn checkbox thì lấy Slider)
    let minP: number | undefined;
    let maxP: number | undefined;

    if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes('all')) {
        // Lấy checkbox đầu tiên (đơn giản hóa)
        const rangeId = selectedPriceRanges[0];
        if (rangeId === 'under-2m') maxP = 2000000;
        else if (rangeId === '2m-4m') { minP = 2000000; maxP = 4000000; }
        else if (rangeId === '4m-7m') { minP = 4000000; maxP = 7000000; }
        else if (rangeId === '7m-13m') { minP = 7000000; maxP = 13000000; }
        else if (rangeId === '13m-20m') { minP = 13000000; maxP = 20000000; }
        else if (rangeId === 'over-20m') minP = 20000000;
    } else {
        // Lấy giá trị từ Slider (đơn vị triệu)
        if (priceRangeValue[0] > 0) minP = priceRangeValue[0] * 1000000;
        if (priceRangeValue[1] < 100) maxP = priceRangeValue[1] * 1000000;
    }

    if (minP !== undefined) filters.minPrice = minP;
    if (maxP !== undefined) filters.maxPrice = maxP;

    // G. Battery (Sửa logic để bắt "Dưới 3000")
    if (selectedBattery.length > 0 && !selectedBattery.includes('Tất cả')) {
        const txt = selectedBattery[0];
        if (txt.includes('Dưới 3000')) {
            filters.maxBattery = 3000; // Tìm pin <= 3000
        } else if (txt.includes('3000 - 4000')) {
            filters.minBattery = 3000;
            filters.maxBattery = 4000;
        } else if (txt.includes('4000 - 5500')) {
            filters.minBattery = 4000;
            filters.maxBattery = 5500;
        } else if (txt.includes('trên 5500')) {
            filters.minBattery = 5500;
        }
    }

    // H. Screen Size (Sửa logic để bắt "Màn hình nhỏ")
    if (selectedScreen.length > 0 && !selectedScreen.includes('Tất cả')) {
        const txt = selectedScreen[0];
        if (txt.includes('Màn hình nhỏ')) {
            filters.maxScreenSize = 5.0; // Giả sử nhỏ là <= 5 inch
        } else if (txt.includes('5 - 6.5')) {
            filters.minScreenSize = 5.0;
            filters.maxScreenSize = 6.5;
        } else if (txt.includes('6.5 - 6.8')) {
            filters.minScreenSize = 6.5;
            filters.maxScreenSize = 6.8;
        } else if (txt.includes('Trên 6.8')) {
            filters.minScreenSize = 6.8;
        }
    }

    // I. Refresh Rate (Sửa lỗi "Trên 144")
    if (selectedRefreshRate.length > 0) {
        const txt = selectedRefreshRate[0];
        const rate = extractNumber(txt); // Dùng hàm regex ở trên để lấy số chuẩn xác

        if (rate !== undefined) {
            if (txt.includes('Trên')) {
                filters.minRefreshRate = rate; // >= 144
            } else {
                // Với các lựa chọn cụ thể như "120 Hz", "90 Hz"
                // Bạn muốn tìm chính xác hay tìm >= ? 
                // Thường là tìm chính xác hoặc >=. Ở đây để >= cho linh hoạt
                filters.minRefreshRate = rate; 
                // Nếu muốn tìm chính xác tuyệt đối thì uncomment dòng dưới:
                // filters.maxRefreshRate = rate; 
            }
        }
    }

    // Gửi dữ liệu ra ngoài & Đóng popup
    onApply(filters);
  };

  return (
    <>
      <div 
        className={`adv-filter__overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      ></div>

      <div className={`adv-filter__container ${isOpen ? 'open' : ''}`}>
        <div className="adv-filter__header">
          <span className="flex items-center gap-2">
              Bộ lọc tìm kiếm
          </span>
          <span className="adv-filter__close-btn" onClick={onClose}>✕</span>
        </div>

        <div className="adv-filter__body">
          {/* ... (Phần render AccordionSection giữ nguyên không đổi) ... */}
          
          {/* Ví dụ Brand Section */}
          <AccordionSection title="Hãng sản xuất" isOpen={openSections.brand} onToggle={() => toggleSection('brand')}>
            <div className="adv-filter__brand-grid">
              {(isBrandExpanded ? BRANDS : BRANDS.slice(0, 8)).map(brand => (
                <div 
                  key={brand.id} 
                  className={`adv-filter__brand-item ${selectedBrands.includes(brand.id) ? 'active' : ''}`}
                  onClick={() => toggleSelection(brand.id, selectedBrands, setSelectedBrands)}
                >
                  <img src={brand.image} alt={brand.name} />
                  <div className="adv-filter__check-corner"><CheckIcon /></div>
                </div>
              ))}
            </div>
            <button className="adv-filter__btn-toggle-text" onClick={() => setIsBrandExpanded(!isBrandExpanded)}>
              {isBrandExpanded ? 'Thu gọn' : `Xem thêm ${BRANDS.length - 8} hãng`}
            </button>
          </AccordionSection>

          {/* ... (Các section Price, OS, ROM, RAM... giữ nguyên code cũ) ... */}
          <AccordionSection title="Mức giá" isOpen={openSections.price} onToggle={() => toggleSection('price')}>
              <div className="adv-filter__checkbox-list">
                  {PRICE_RANGES.map(price => (
                      <label key={price.id} className="adv-filter__checkbox-item">
                          <input 
                              type="checkbox" 
                              checked={selectedPriceRanges.includes(price.id)}
                              onChange={() => toggleRadioLikeSelection(price.id, selectedPriceRanges, setSelectedPriceRanges)}
                          />
                          <span>{price.label}</span>
                      </label>
                  ))}
              </div>
              <p className="mt-3 text-sm font-medium" style={{marginBottom: '8px', marginTop: '12px'}}>Hoặc nhập khoảng giá:</p>
              <div className="adv-filter__price-range">
                  <div className="adv-filter__price-wrapper">
                      <input type="text" value={priceRangeValue[0]} readOnly />
                      <span className="adv-filter__price-unit">.tr</span>
                  </div>
                  <span>~</span>
                  <div className="adv-filter__price-wrapper">
                      <input type="text" value={priceRangeValue[1]} readOnly />
                      <span className="adv-filter__price-unit">.tr</span>
                  </div>
              </div>
              <div className="adv-filter__slider-wrapper" style={{ padding: '0 8px' }}>
                  <Slider 
                      range 
                      min={0} 
                      max={100} 
                      defaultValue={[0, 100]} 
                      value={priceRangeValue}
                      onChange={(val) => setPriceRangeValue(val as [number, number])}
                      trackStyle={{ backgroundColor: '#555', height: 4 }}
                      handleStyle={{ borderColor: '#555', backgroundColor: '#fff', opacity: 1, boxShadow: 'none' }}
                      railStyle={{ backgroundColor: '#ddd', height: 4 }}
                  />
              </div>
          </AccordionSection>

          <AccordionSection title="Hệ điều hành" isOpen={openSections.os} onToggle={() => toggleSection('os')}>
              <TagFilterGroup items={OS_TAGS} selectedItems={selectedOS} onToggle={(item) => toggleSelection(item, selectedOS, setSelectedOS)} />
          </AccordionSection>

          <AccordionSection title="Dung lượng ROM" isOpen={openSections.rom} onToggle={() => toggleSection('rom')}>
              <TagFilterGroup items={ROM_TAGS} selectedItems={selectedROM} onToggle={(item) => toggleSelection(item, selectedROM, setSelectedROM)} />
          </AccordionSection>

          <AccordionSection title="Hiệu năng và Pin" isOpen={openSections.battery} onToggle={() => toggleSection('battery')}>
              <CheckboxFilterGroup items={BATTERY_TAGS} selectedItems={selectedBattery} onToggle={(item) => toggleRadioLikeSelection(item, selectedBattery, setSelectedBattery)} />
          </AccordionSection>

          <AccordionSection title="Hỗ trợ mạng" isOpen={openSections.network} onToggle={() => toggleSection('network')}>
              <TagFilterGroup items={NETWORK_TAGS} selectedItems={selectedNetwork} onToggle={(item) => toggleSelection(item, selectedNetwork, setSelectedNetwork)} />
          </AccordionSection>

          <AccordionSection title="RAM" isOpen={openSections.ram} onToggle={() => toggleSection('ram')}>
              <TagFilterGroup items={RAM_TAGS} selectedItems={selectedRAM} onToggle={(item) => toggleSelection(item, selectedRAM, setSelectedRAM)} />
          </AccordionSection>

          <AccordionSection title="Màn hình" isOpen={openSections.screen} onToggle={() => toggleSection('screen')}>
              <CheckboxFilterGroup items={SCREEN_TAGS} selectedItems={selectedScreen} onToggle={(item) => toggleRadioLikeSelection(item, selectedScreen, setSelectedScreen)} />
          </AccordionSection>

          <AccordionSection title="Tần số quét" isOpen={openSections.refreshRate} onToggle={() => toggleSection('refreshRate')}>
              <TagFilterGroup items={REFRESH_RATE_TAGS} selectedItems={selectedRefreshRate} onToggle={(item) => toggleSelection(item, selectedRefreshRate, setSelectedRefreshRate)} />
          </AccordionSection>

        </div>

        <div className="adv-filter__footer">
          <button className="adv-filter__btn-reset" onClick={() => window.location.reload()}>
              Thiết lập lại
          </button>
          
          {/* 4. SỬA NÚT ÁP DỤNG ĐỂ GỌI HÀM XỬ LÝ */}
          <button className="adv-filter__btn-apply" onClick={handleApplyClick}>
              Áp dụng
          </button>
        </div>
      </div>
    </>
  );
};

export default AdvanceFilter;