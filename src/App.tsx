import useRouteElements from "./routes/useRouteElements";

// 1. Import AuthProvider vừa tạo
import { AuthProvider } from "./provider/AuthProvider"; 

// Import Provider và Component So sánh cũ
import { CompareProvider } from "./provider/CompareProvider"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from "./components/ScrollToTop";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
function App() {
  const routeElements = useRouteElements();
 
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
      
      {/* 3. Sau đó đến CompareProvider */}
      <CompareProvider>
        <ScrollToTop />
        {/* Nội dung các trang (Router) */}
        <div>{routeElements}</div>

        {/* Thanh so sánh đè lên mọi trang */}
       
        
      </CompareProvider>

    </AuthProvider>
    </GoogleOAuthProvider>
  );
    
    
    
}

export default App;