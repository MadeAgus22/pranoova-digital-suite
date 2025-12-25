import { ArrowLeft, Check, Globe, Server, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
// import Navbar from "@/components/Navbar"; // ⚠️ DIMATIKAN AGAR TIDAK DOUBLE (Karena sudah ada di App.tsx)
import Footer from "@/components/Footer";

const DigitalisasiBisnis = () => {

  // --- FUNGSI KLIK KE WHATSAPP ---
  const openWhatsApp = (message: string) => {
    const phone = "6285739922214";
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
              Di era digital, bisnis yang tidak beradaptasi akan tertinggal. Pranoova hadir sebagai mitra transformasi digital Anda dengan solusi ERP terintegrasi dan website profesional yang dioptimasi untuk mesin pencari.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilih Paket yang Sesuai</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami menyediakan berbagai paket layanan yang dapat disesuaikan dengan kebutuhan dan skala bisnis Anda.
            </p>
          </div>

          {/* --- BAGIAN JASA WEBSITE (DENGAN GAMBAR) --- */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Website Company Profile</h3>
            </div>
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                {/* KOLO KIRI: KONTEN TEKS */}
                <div>
                  <h4 className="font-semibold mb-4">Ruang Lingkup</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Website Company Profile, Portofolio, Blog, E-Commerce, dan lainnya
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Template profesional & responsif
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Domain & hosting dengan SSL (HTTPS)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Mobile-friendly & maintenance dasar
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Tutorial penggunaan
                    </li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-t border-border pt-6">
                    <div>
                      <h4 className="font-semibold mb-1">Estimasi Biaya</h4>
                      <p className="text-2xl font-bold text-primary">Mulai dari Rp 900.000 / Tahun</p>
                    </div>
                    
                    {/* TOMBOL WA WEBSITE */}
                    <button 
                      onClick={() => openWhatsApp("Halo Admin Pranoova, saya tertarik dengan *Jasa Website Company Profile*. Mohon info detailnya.")}
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto whitespace-nowrap"
                    >
                      Konsultasi Gratis
                    </button>
                  </div>
                </div>

                 {/* KOLOM KANAN: GAMBAR ILUSTRASI */}
                <div className="relative order-first md:order-last">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted relative shadow-lg">
                    <img 
                       src="/assets/illustration-website.png" 
                       alt="Website Development" 
                       className="object-cover w-full h-full"
                       onError={(e) => {
                          // Fallback jika gambar lokal belum ada
                          e.currentTarget.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426";
                       }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ERP Packages */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Paket Sistem ERP</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Starter */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col">
                <div className="p-6 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-3">
                    UMKM & Usaha Kecil
                  </span>
                  <h4 className="text-xl font-bold mb-2">Paket Starter</h4>
                  <p className="text-sm text-muted-foreground">Cocok untuk UMKM, toko, dan usaha kecil</p>
                </div>
                <div className="p-6 flex-1">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya Implementasi</p>
                    <p className="text-2xl font-bold text-primary">Mulai Rp 3 Juta</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Ruang Lingkup:</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Modul: POS / Sales, Inventory, Basic Accounting
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Hingga 5 user
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Konfigurasi standar & import data awal
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Training dasar & Go-live support
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Website template builtin (Opsional)
                    </li>
                  </ul>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium mb-1">Cloud Managed by Pranoova</p>
                    <p className="text-xs text-muted-foreground">Mulai dari Rp 150.000 / bulan</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  {/* TOMBOL WA STARTER */}
                  <button 
                    onClick={() => openWhatsApp("Halo Admin Pranoova, saya tertarik dengan *Paket ERP Starter*. Mohon info detail modul dan layanan yang didapat.")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Pilih Paket
                  </button>
                </div>
              </div>

              {/* Growth */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 ring-2 ring-primary flex flex-col relative">
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                  POPULER
                </div>
                <div className="p-6 pt-10 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    Bisnis Berkembang
                  </span>
                  <h4 className="text-xl font-bold mb-2">Paket Growth</h4>
                  <p className="text-sm text-muted-foreground">Cocok untuk bisnis berkembang, retail multi-cabang, gudang</p>
                </div>
                <div className="p-6 flex-1">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya Implementasi</p>
                    <p className="text-2xl font-bold text-primary">Mulai Rp 8 Juta</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Ruang Lingkup:</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Modul: Sales, POS, Inventory & Warehouse, Accounting, Purchase
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      5 - 15 user
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Analisis alur bisnis & penyesuaian workflow
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Training user & admin + dokumentasi
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Website template builtin (Opsional)
                    </li>
                  </ul>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium mb-1">Cloud Managed by Pranoova</p>
                    <p className="text-xs text-muted-foreground">Mulai dari Rp 350.000 / bulan</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  {/* TOMBOL WA GROWTH */}
                  <button 
                    onClick={() => openWhatsApp("Halo Admin Pranoova, saya tertarik dengan *Paket ERP Growth*, untuk bisnis saya yang sedang berkembang. Mohon info detail fiturnya.")}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Pilih Paket
                  </button>
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 flex flex-col">
                <div className="p-6 border-b border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-3">
                    Perusahaan Besar
                  </span>
                  <h4 className="text-xl font-bold mb-2">Paket Enterprise</h4>
                  <p className="text-sm text-muted-foreground">Untuk perusahaan menengah hingga besar dengan kompleksitas tinggi</p>
                </div>
                <div className="p-6 flex-1">
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Biaya Implementasi</p>
                    <p className="text-2xl font-bold text-primary">Mulai Rp 25 Juta</p>
                  </div>
                  <h5 className="font-semibold text-sm mb-3">Ruang Lingkup:</h5>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Modul lengkap (ERP, HR, Payroll, Manufacturing, dll)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      User tidak terbatas (&gt;15)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Custom module & integrasi
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Dedicated project manager
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      Advanced security
                    </li>
                  </ul>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium mb-1">Cloud Managed by Pranoova</p>
                    <p className="text-xs text-muted-foreground">Mulai dari Rp 3.000.000 / bulan</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  {/* TOMBOL WA ENTERPRISE */}
                  <button 
                    onClick={() => openWhatsApp("Halo Admin Pranoova, saya ingin konsultasi mengenai *Paket ERP Enterprise*, untuk kebutuhan custom perusahaan kami.")}
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
              Paket di atas merupakan gambaran umum layanan kami. Ruang lingkup dan biaya dapat disesuaikan berdasarkan kebutuhan operasional dan anggaran bisnis Anda.
            </p>
            <button 
              onClick={() => openWhatsApp("Halo Admin Pranoova, saya ingin minta penawaran layanan yang relevan dengan kebutuhan bisnis saya.")}
              className="inline-flex items-center text-primary font-medium mt-2 hover:underline bg-transparent border-none cursor-pointer"
            >
              Hubungi kami untuk penawaran yang paling relevan
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalisasiBisnis;