import useRouteElements from "./routes/useRouteElements";

// 1. Import AuthProvider vừa tạo
import { AuthProvider } from "./provider/AuthProvider"; 

// Import Provider và Component So sánh cũ
import { CompareProvider } from "./provider/CompareProvider"; 

import ScrollToTop from "./components/ScrollToTop";
function App() {
  const routeElements = useRouteElements();

  return (
    
    // 2. Bọc AuthProvider ở vòng ngoài cùng (để toàn bộ app đều biết user là ai)
    <AuthProvider>
      
      {/* 3. Sau đó đến CompareProvider */}
      <CompareProvider>
        <ScrollToTop />
        {/* Nội dung các trang (Router) */}
        <div>{routeElements}</div>

        {/* Thanh so sánh đè lên mọi trang */}
       
        
      </CompareProvider>

    </AuthProvider>
  );
}

export default App;