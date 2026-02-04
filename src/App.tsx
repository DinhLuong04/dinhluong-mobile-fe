import React from 'react';
import useRouteElements from "./routes/useRouteElements";
import { AuthProvider } from "./provider/AuthProvider"; 
import { CompareProvider } from "./provider/CompareProvider"; 
// 1. Import ChatProvider
import { ChatProvider } from "./provider/ChatProvider"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from "./components/ScrollToTop";

// 2. Import các component UI chat
import Chatbot from "./components/Chatbot/Chatbot";
import LiveChat from "./components/LiveChat/LiveChat";
import ContactFloating from "./components/ContactFloating/ContactFloating";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const routeElements = useRouteElements();
 
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        {/* Bọc ChatProvider ở đây */}
        <ChatProvider>
            <CompareProvider>
                <ScrollToTop />
                <div>{routeElements}</div>

                {/* --- CÁC COMPONENT CHAT --- */}
                {/* 1. Nút Menu Liên hệ (Nút Xanh nhỏ) */}
                <ContactFloating />

                {/* 2. Box Chat Nhân viên (Mặc định ẩn) */}
                <LiveChat />

                {/* 3. Bot Chat AI (Nút Đỏ to góc phải) */}
                <Chatbot />
            
            </CompareProvider>
        </ChatProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;