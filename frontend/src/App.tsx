import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Router

// Import Halaman & Komponen
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DigitalisasiBisnis from "./pages/DigitalisasiBisnis";
import AdminBlog from "./pages/AdminBlog";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import ScrollToHash from "./components/ScrollToHash";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* 1. BrowserRouter HARUS membungkus semuanya di sini */}
      <BrowserRouter>
      <ScrollToHash />
        <Routes>
          {/* 2. Layout (yang berisi Navbar) dipanggil di dalam Routes */}
          <Route element={<Layout />}>
            
            {/* Halaman Utama */}
            <Route path="/" element={<Index />} />
            <Route path="/digitalisasi-bisnis" element={<DigitalisasiBisnis />} />
            
            {/* Blog & Admin */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/admin" element={<AdminBlog />} />
            
          </Route>

          {/* Halaman 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;