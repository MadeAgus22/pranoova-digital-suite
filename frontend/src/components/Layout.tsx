import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import Footer from "./Footer"; // Jika Anda punya footer

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar akan selalu ada di sini */}
      <Navbar /> 
      
      <main className="flex-grow pt-20"> {/* pt-20 agar tidak tertutup navbar */}
        <Outlet /> {/* Isi halaman akan muncul di sini */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;