import { ArrowLeft, Check, Server, TrendingUp, Shield, Zap, MessageCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
// import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const DigitalisasiBisnis = () => {

  // --- FUNGSI KLIK KE WHATSAPP ---
  const openWhatsApp = (message: string) => {
    const phone = "6285142713234";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */} 
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="container">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Digitalisasi Bisnis
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transformasi Digital untuk <span className="text-primary">Pertumbuhan Bisnis</span> Anda
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Di era digital, bisnis yang tidak beradaptasi akan tertinggal. Pranoova hadir sebagai mitra transformasi digital Anda dengan solusi ERP terintegrasi yang efisien dan terjangkau.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Efisiensi</p>
                  <p className="text-xs text-muted-foreground">Hingga 60% lebih cepat</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Pertumbuhan</p>
                  <p className="text-xs text-muted-foreground">Skalabilitas tinggi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Keamanan</p>
                  <p className="text-xs text-muted-foreground">Data terlindungi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Paket ERP Anda</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan solusi Odoo Community mulai dari panduan mandiri hingga implementasi profesional tingkat lanjut.
            </p>
          </div>

          {/* ERP Packages Grid */}
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Server className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Paket Layanan</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 items-start">
              
              {/* --- PAKET 1: GRATIS --- */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col h-full border border-border/50">
                <div className="p-6 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mb-3">
                    Self-Service
                  </span>
                  <h4 className="text-xl font-bold mb-2">Gratis</h4>
                  <p className="text-sm text-muted-foreground">Untuk Anda yang ingin mencoba eksplorasi mandiri.</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya</p>
                    <p className="text-2xl font-bold text-primary">Rp 0</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Fasilitas:</h5>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                    <li className="flex items-start gap-2">
                      <MessageCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Konsultasi & Tanya jawab via Chat
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Akses Panduan Instalasi Mandiri
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Panduan Konfigurasi Odoo Community
                    </li>
                  </ul>
                  
                  {/* TOMBOL LINK LANGSUNG */}
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdrOEOEzgvOxaA5hVk3ZqaIhTnqrR7CMTJ3B13N6jnqnjEVog/viewform?usp=sharing&ouid=110122938817466226714" // GANTI LINK INI DENGAN LINK TUJUAN (misal: Google Drive / Halaman Download)
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Coba Gratis
                  </a>
                </div>
              </div>

              {/* --- PAKET 2: STANDARD --- */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 ring-2 ring-primary flex flex-col relative h-full transform md:-translate-y-2">
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                  PALING DIMINATI
                </div>
                <div className="p-6 pt-10 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    Siap Pakai
                  </span>
                  <h4 className="text-xl font-bold mb-2">Standard</h4>
                  <p className="text-sm text-muted-foreground">Terima beres, sistem siap digunakan untuk operasional harian. cocouk untuk UMKM.</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya Setup Mulai dari:</p>
                    <p className="text-2xl font-bold text-primary">Rp 3.000.000</p>
                    <p className="text-xs text-muted-foreground mt-1">*Satu kali bayar</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Ruang Lingkup:</h5>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Instalasi Odoo Community di Server
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Konfigurasi Modul Dasar POS, Inventory, Sales, dan Accounting
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Migrasi Data Awal (Master Data)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Pendampingan Implementasi (1 Bulan)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Kapasitas &lt; 5 User aktif
                    </li>
                  </ul>
                  
                  <div className="p-4 bg-muted/50 rounded-lg mb-6">
                    <p className="text-xs font-medium mb-1 text-primary">Catatan Server:</p>
                    <p className="text-xs text-muted-foreground mb-2">Biaya di luar sewa server (On-Premise/Cloud sendiri).</p>
                    <div className="border-t border-border/50 pt-2">
                      <p className="text-xs font-bold text-foreground">Opsi Cloud Pranoova:</p>
                      <p className="text-xs text-muted-foreground">+ Rp 150.000/bulan</p>
                      <p className="text-[10px] text-primary italic">(Gratis Website Built-in Odoo)</p>
                    </div>
                  </div>

                  {/* TOMBOL WA STANDARD */}
                  <button 
                    onClick={() => openWhatsApp("Halo Admin Pranoova, saya tertarik dengan *Paket ERP Standard*. Mohon info detail prosesnya.")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Pilih Paket Standard
                  </button>
                </div>
              </div>

              {/* --- PAKET 3: HIGH PERFORMANCE --- */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col h-full border border-border/50">
                <div className="p-6 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-3">
                    Custom & Skala Besar
                  </span>
                  <h4 className="text-xl font-bold mb-2">High Performance</h4>
                  <p className="text-sm text-muted-foreground">Solusi komprehensif untuk proses bisnis yang kompleks dan unik.</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya Investasi</p>
                    <p className="text-2xl font-bold text-primary">Hubungi Kami</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Fasilitas Eksklusif:</h5>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-6 flex-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Analisis Bisnis & Penyesuaian Workflow
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Training Staff Intensif
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Dokumentasi sesuai Flow Bisnis (SOP)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Pengembangan Custom Module
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Konfigurasi Keamanan Tingkat Lanjut
                    </li>
                  </ul>

                  

                  {/* TOMBOL WA HIGH PERFORMANCE */}
                  <button 
                    onClick={() => openWhatsApp("Halo Admin Pranoova, saya ingin konsultasi untuk *Paket ERP High Performance*, bisnis kami butuh penyesuaian khusus.")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Hubungi Kami
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Note */}
          <div className="mt-12 p-6 bg-accent/30 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              Paket di atas dapat disesuaikan kembali berdasarkan kebutuhan operasional dan anggaran bisnis Anda.
            </p>
            <button 
              onClick={() => openWhatsApp("Halo Admin Pranoova, saya ingin bertanya hal lain seputar layanan digitalisasi.")}
              className="inline-flex items-center text-primary font-medium mt-2 hover:underline bg-transparent border-none cursor-pointer"
            >
              Hubungi kami untuk pertanyaan umum
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalisasiBisnis;