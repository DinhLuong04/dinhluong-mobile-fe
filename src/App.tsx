import useRouteElements from "./routes/useRouteElements";

// 1. Import Provider và Component So sánh
import { CompareProvider } from "./contexts/CompareProvider"; 
import StickyCompareBar from "./components/StickyCompareBar/StickyCompareBar";

function App() {
  const routeElements = useRouteElements();

  return (
    // 2. Bọc Provider ở ngoài cùng
    <CompareProvider>
      
      {/* Nội dung các trang (Router) */}
      <div>{routeElements}</div>

      {/* 3. Đặt thanh so sánh ở đây để nó luôn hiển thị đè lên mọi trang */}
      <StickyCompareBar />
      
    </CompareProvider>
  );
}

export default App;