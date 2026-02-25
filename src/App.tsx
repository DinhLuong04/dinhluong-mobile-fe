import React from 'react';
import { useLocation } from 'react-router-dom'; // Thêm hook này
import useRouteElements from "./routes/useRouteElements";
import { AuthProvider } from "./provider/AuthProvider"; 
import { CompareProvider } from "./provider/CompareProvider"; 
import { ChatProvider } from "./provider/ChatProvider"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from "./components/ScrollToTop";

import Chatbot from "./components/Chatbot/Chatbot";
import LiveChat from "./components/LiveChat/LiveChat";
import ContactFloating from "./components/ContactFloating/ContactFloating";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const routeElements = useRouteElements();
  
  // Kiểm tra xem URL hiện tại có phải là của Admin không
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ChatProvider>
            <CompareProvider>
                <ScrollToTop />
                <div>{routeElements}</div>

                {/* NẾU KHÔNG PHẢI TRANG ADMIN THÌ MỚI HIỂN THỊ CÁC BOX CHAT NÀY */}
                {!isAdminRoute && (
                    <>
                        <ContactFloating />
                        <LiveChat />
                        <Chatbot />
                    </>
                )}
            
            </CompareProvider>
        </ChatProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;