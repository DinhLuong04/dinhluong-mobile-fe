import React, { useState } from 'react';
import './AllSpecifics.css';

// --- DỮ LIỆU GIẢ LẬP (Mô phỏng lại HTML bạn gửi) ---
const SPEC_GROUPS = [
  {
    title: "Thông tin hàng hóa",
    items: [
      { label: "Xuất xứ", values: ["Trung Quốc", "Trung Quốc", "Trung Quốc"] },
      { label: "Thời điểm ra mắt", values: ["09/2025", "11/2025", "10/2025"] },
      { label: "Thời gian bảo hành", values: ["12 Tháng", "12 Tháng", "24 Tháng"] },
      { label: "Hướng dẫn bảo quản", values: ["", "", "Để nơi khô ráo, nhẹ tay, dễ vỡ."] },
      { label: "Hướng dẫn sử dụng", values: ["", "", "Xem trong sách hướng dẫn sử dụng"] },
    ]
  },
  {
    title: "Thiết kế & Trọng lượng",
    items: [
      { label: "Kích thước", values: ["149.6 x 71.5 x 7.95 mm", "163.8 x 76.5 x 8.9 mm", "156.98 x 73.93 x 7.99 mm"] },
      { label: "Trọng lượng sản phẩm", values: ["177 g", "230 g", "203 g"] },
      { label: "Chuẩn kháng nước / Bụi", values: ["IP68", "IPX8", "IP66, IP68, IP69"] },
      { label: "Chất liệu", values: ["Khung: Nhôm, Lưng: Kính", "Khung: Nhôm, Lưng: Kính", "Khung: Nhôm, Lưng: Kính"] },
    ]
  },
  {
    title: "Bộ xử lý",
    items: [
      { label: "Phiên bản CPU", values: ["Apple A19", "Snapdragon 8 Elite Gen 5", "Dimensity 9500"] },
      { label: "Loại CPU", values: ["12-Core", "Octa-Core", "Octa-Core"] },
      { label: "Số nhân", values: ["6", "8", "8"] },
      { label: "Tốc độ tối đa", values: ["", "4.6 GHz", "4.21 GHz"] },
    ]
  },
  {
    title: "RAM",
    items: [
      { label: "RAM", values: ["8 GB", "16 GB", "16 GB"] }
    ]
  },
  {
    title: "Màn hình",
    items: [
      { label: "Kích thước màn hình", values: ["6.3 inch", "6.85 inch", "6.59 inch"] },
      { label: "Công nghệ màn hình", values: ["OLED", "AMOLED", "AMOLED"] },
      { label: "Chuẩn màn hình", values: ["Super Retina XDR", "FHD+", "1.5K+"] },
      { label: "Độ phân giải", values: ["2622 x 1206 pixel", "1216 x 2688 Pixels", "1256 x 2760 Pixels"] },
      { label: "Màu màn hình", values: ["", "1 Tỷ", "1 Tỷ"] },
      { label: "Tần số quét", values: ["120 Hz", "144 Hz", "120 Hz"] }, // Đã fix lại đơn vị cho đẹp
      { label: "Chất liệu mặt kính", values: ["Ceramic Shield 2", "Corning Gorilla Glass", ""] },
      { label: "Loại cảm ứng", values: ["", "Điện dung đa điểm", ""] },
      { label: "Mật độ điểm ảnh", values: ["460 ppi", "431 ppi", "460 ppi"] },
      { label: "Độ sáng tối đa", values: ["3000 nits", "1800 nits", "3600 nits"] },
      { label: "Độ tương phản", values: ["2.000.000:1", "", ""] },
    ]
  },
  {
    title: "Đồ họa",
    items: [
      { label: "Chip đồ hoạ (GPU)", values: ["Apple GPU 5 nhân", "Adreno 840", "ARM Mali Drage MC12"] }
    ]
  },
  // --- PHẦN MỚI THÊM VÀO (Lưu trữ, Camera) ---
  {
    title: "Lưu trữ",
    items: [
      { label: "Dung lượng (ROM)", values: ["256 GB", "512 GB", "512 GB"] },
      { label: "Danh bạ lưu trữ", values: ["", "Không giới hạn", ""] },
      { label: "Thẻ nhớ ngoài", values: ["", "Không", ""] },
    ]
  },
  {
    title: "Camera sau",
    items: [
      { label: "Số camera sau", values: ["Double rear camera", "", "Quad rear camera"] },
      
      // Camera 1
      { label: "Camera 1", values: ["Main", "Wide", "Chính"] },
      { label: "Cảm biến (Cam 1)", values: ["", "", "Sony LYT-808"] },
      { label: "Độ phân giải (Cam 1)", values: ["48.0 MP Fusion", "50.0 MP", "50.0 MP"] },
      { label: "Khẩu độ (Cam 1)", values: ["ƒ/1.6", "ƒ/1.9", "ƒ/1.6"] },
      { label: "Kích thước điểm ảnh (Cam 1)", values: ["", "1.00 µm", ""] },
      
      // Camera 2
      { label: "Camera 2", values: ["Ultra Wide", "Ultra Wide", "Góc rộng"] },
      { label: "Độ phân giải (Cam 2)", values: ["48.0 MP Fusion", "50.0 MP", "8.0 MP"] },
      { label: "Cảm biến (Cam 2)", values: ["", "", "Samsung ISOCELL JN5"] },
      { label: "Khẩu độ (Cam 2)", values: ["ƒ/2.2", "ƒ/2.2", "ƒ/2.0"] },
      { label: "Kích thước điểm ảnh (Cam 2)", values: ["", "0.61 µm", ""] },

      // Camera 3
      { label: "Camera 3", values: ["", "Ống kính phụ trợ", "Tele tiềm vọng"] },
      { label: "Độ phân giải (Cam 3)", values: ["", "", "50.0 MP"] },
      { label: "Cảm biến (Cam 3)", values: ["", "", "LYT-600"] },
      { label: "Khẩu độ (Cam 3)", values: ["", "", "ƒ/2.6"] },

      // Camera 4
      { label: "Camera 4", values: ["", "", "Multispectral"] },
      { label: "Độ phân giải (Cam 4)", values: ["", "", "2.0 MP"] },
      { label: "Khẩu độ (Cam 4)", values: ["", "", "ƒ/2.4"] },

      // Tổng quan Camera sau
      { label: "Quay phim camera sau", values: ["4K Dolby Vision @120fps, 1080p Dolby Vision @120fps", "8K@24/30fps, 4K@30fps, 1080p@30/60fps", ""] },
      { label: "Tính năng", values: [
          "Chụp chân dung, OIS, AF, Zoom quang học, Night Mode, Panorama, Macro", 
          "Flash LED, HDR, Panorama", 
          ""
        ] 
      },
    ]
  },
  {
    title: "Camera Selfie",
    items: [
      { label: "Số Camera Selfie", values: ["Single selfie camera", "", "Single selfie camera"] },
      { label: "Camera Selfie 1", values: ["18.0 MP Center Stage", "16.0 MP", "32.0 MP"] },
      { label: "Khẩu độ", values: ["ƒ/1.9", "ƒ/2.0", "ƒ/2.4"] },
      { label: "Kích thước điểm ảnh", values: ["", "1.12 µm", ""] },
      { label: "Quay phim camera seflie", values: ["4K Dolby Vision @60fps, 1080p Dolby Vision @60fps", "1080p@30/60fps", ""] },
      { label: "Tính năng", values: [
          "AF, Chế độ chân dung, Night Mode, Ảnh động, OIS", 
          "HDR", 
          ""
        ] 
      },
    ]
  },
  {
    title: "Cảm biến",
    items: [
      { 
        label: "Cảm biến", 
        values: [
          "Cảm biến khí áp kế, Con quay hồi chuyển, Cảm biến tiệm cận, Face ID, Gia tốc kế lực G cao, Hai cảm biến ánh sáng môi trường xung quanh", 
          "Cảm biến la bàn, Cảm biến gia tốc, Cảm biến tiệm cận, Cảm biến vân tay, Con quay hồi chuyển", 
          "Cảm biến vân tay"
        ] 
      }
    ]
  },
  {
    title: "Bảo mật",
    items: [
      { 
        label: "Bảo mật", 
        values: [
          "Mở khóa bằng mật mã, Mở khóa khuôn mặt", 
          "Mật khẩu, Mở khóa vân tay dưới màn hình", 
          ""
        ] 
      }
    ]
  },
  {
    title: "Tiện ích khác", // Trong HTML để là "Others", mình đổi sang tiếng Việt cho đồng bộ
    items: [
      { label: "Làm mát", values: ["", "Có", ""] }, // HTML ghi là "true", mình chuyển thành "Có" cho đẹp
      { label: "Thông báo LED", values: ["Có", "", ""] }, // HTML ghi là "true"
      { 
        label: "Tính năng đặc biệt", 
        values: [
          "Apple Intelligence, Khẩn cấp, Phát hiện va chạm (Crash Detection)", 
          "LED RGB, Sạc không dây 80W", 
          ""
        ] 
      }
    ]
  },
  {
    title: "Giao tiếp và kết nối",
    items: [
      { label: "Thẻ SIM", values: ["1 eSIM và 1 nano SIM Hoặc 2 eSIM", "2 Nano SIM", "Dual nano-SIM hoặc 1 nano-SIM + 1 thẻ nhớ"] },
      { label: "Số khe SIM", values: ["1", "2", "2"] },
      { label: "Hỗ trợ mạng", values: ["5G", "5G", "5G"] },
      { label: "Cổng giao tiếp", values: ["Type C", "Type C", "Type C"] }, // Đã rút gọn "Cổng sạc: Type C" thành "Type C" cho gọn
      { label: "Wifi", values: ["Wifi 7", "Wifi 7", "Wifi 6, Dual-band (2.4 GHz/ 5 GHz)"] },
      { label: "GPS", values: ["GLONASS, GALILEO, QZSS, BEIDOU, GPS, NavIC", "GPS, GALILEO, GLONASS, BDS", ""] },
      { label: "Bluetooth", values: ["v5.3", "v5.4", "v6.0"] },
      { label: "Kết nối khác", values: ["NFC", "NFC, OTG, Hồng ngoại, DisplayPort", "OTG, NFC"] },
    ]
  },
  {
    title: "Thông tin pin & sạc",
    items: [
      { label: "Loại PIN", values: ["Lithium-ion", "Silicon carbon", "Silicon carbon"] },
      { label: "Dung lượng pin", values: ["30 Giờ", "7500 mAh", "7025 mAh"] }, // Giữ nguyên đơn vị "Giờ" của Apple như source
      { label: "Củ sạc kèm máy", values: ["", "Sạc nhanh 80 W", "SuperVOOC 80W"] },
      { label: "Thông tin thêm", values: ["Hỗ trợ sạc không dây, Sạc pin nhanh", "Hỗ trợ sạc không dây", "Hỗ trợ sạc không dây"] },
    ]
  },
  {
    title: "Hệ điều hành",
    items: [
      { label: "OS", values: ["iOS", "Android", "Android"] },
      { label: "Version", values: ["iOS 26", "Android 16", "Android 16"] },
    ]
  },
  {
    title: "Phụ kiện trong hộp",
    items: [
      { 
        label: "Phụ kiện", 
        values: [
          "Cáp USB-C to USB-C, Que lấy SIM, Sách HDSD", 
          "Sạc, Cáp, Ốp lưng, Que lấy SIM, Sách HDSD", 
          "Que lấy SIM, Cáp Type C, Củ sạc, Sách HDSD, Vỏ bảo vệ, Miếng dán màn hình (Đã dán sẵn)"
        ] 
      }
    ]
  }
];

const AllSpecifics: React.FC = () => {
  // State lưu index của các section đang mở (Mặc định mở section đầu tiên [0])
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2]); 

  const toggleSection = (index: number) => {
    setOpenIndexes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index); // Đóng nếu đang mở
      }
      return [...prev, index]; // Mở thêm
    });
  };

  return (
    <div id="all-specifics" className="all-specifics-container">
      {SPEC_GROUPS.map((group, groupIndex) => {
        const isOpen = openIndexes.includes(groupIndex);

        return (
          <div key={groupIndex} className="accordion-item">
            
            {/* Header Clickable */}
            <div 
              className={`accordion-header ${isOpen ? 'active' : ''}`}
              onClick={() => toggleSection(groupIndex)}
            >
              <h4 className="accordion-title">{group.title}</h4>
              <span className="accordion-icon">
                {/* SVG Chevron Down */}
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill="currentColor"></path>
                </svg>
              </span>
            </div>

            {/* Collapse Body */}
            <div className={`accordion-collapse ${isOpen ? 'open' : ''}`}>
              <div className="pb-4 bg-white">
                {group.items.map((spec, specIndex) => (
                  <div key={specIndex} className="spec-row">
                    
                    {/* Tên thông số + Dòng kẻ đứt */}
                    <div className="spec-row-header">
                      <h6 className="spec-row-title">{spec.label}</h6>
                      <div className="spec-dashed"></div>
                    </div>

                    {/* Grid 3 cột giá trị */}
                    <div className="spec-grid">
                       {/* Render 3 cột (tương ứng 3 sản phẩm) */}
                       {[0, 1, 2].map((colIndex) => (
                          <div key={colIndex} className="spec-cell">
                            {/* Nếu có giá trị thì hiển thị, không thì để trống */}
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
      })}
    </div>
  );
};

export default AllSpecifics;