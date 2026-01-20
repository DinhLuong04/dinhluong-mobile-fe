import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi đường dẫn (pathname) thay đổi -> Cuộn lên đầu
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Component này không render ra giao diện gì cả
}