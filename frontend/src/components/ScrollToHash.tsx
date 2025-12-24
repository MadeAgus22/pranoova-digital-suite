import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jika ada hash di URL (misal #services)
    if (hash) {
      // Tunggu sebentar (100ms) agar halaman selesai loading
      setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Jika tidak ada hash (ganti halaman biasa), scroll ke paling atas
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Jalankan setiap kali URL berubah

  return null;
};

export default ScrollToHash;