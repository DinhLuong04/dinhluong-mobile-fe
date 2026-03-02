
import useRouteElements from "./routes/useRouteElements";
import { AuthProvider } from "./provider/AuthProvider"; 
import { CompareProvider } from "./provider/CompareProvider"; 
import { ChatProvider } from "./provider/ChatProvider"; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTop from "./components/ScrollToTop";



const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  const routeElements = useRouteElements();


  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ChatProvider>
            <CompareProvider>
                <ScrollToTop />
                <div>{routeElements}</div>
 
            </CompareProvider>
        </ChatProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;