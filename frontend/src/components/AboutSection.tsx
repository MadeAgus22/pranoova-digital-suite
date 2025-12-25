import { CheckCircle, Trophy, Users } from "lucide-react";

const features = [
  "Pendekatan berbasis kebutuhan dan skala bisnis",
  "Solusi fleksibel untuk UMKM hingga bisnis berkembang",
  "Dukungan teknis dan pendampingan pasca implementasi",
  "Penggunaan teknologi yang stabil dan praktik terbaik industri",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* KOLOM KIRI: TEKS */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Mitra Teknologi untuk{" "}
              <span className="text-primary">Digitalisasi Bisnis</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Pranoova adalah penyedia layanan teknologi yang membantu bisnis memulai dan mengembangkan proses 
              digitalisasi secara bertahap dan terukur. Kami berfokus pada solusi yang relevan, fungsional, 
              dan sesuai kebutuhan operasional, bukan sekadar mengikuti tren.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Kami memahami bahwa setiap bisnis memiliki tantangan dan kapasitas yang berbeda. Karena itu, 
              kami mengedepankan pendekatan konsultatif—mendengarkan kebutuhan klien, memberikan rekomendasi 
              yang masuk akal, dan mengimplementasikan solusi yang dapat digunakan secara nyata dalam operasional 
              sehari-hari.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
              Pranoova menangani layanan implementasi ERP, pembuatan website dan optimasi SEO, serta solusi IoT, 
              CCTV, dan jaringan internal bisnis.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-foreground/90 text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: GAMBAR & BADGE */}
          <div className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 aspect-square lg:aspect-[4/5]">
              <img 
                src="/assets/illustration-erp.png" // Ganti dengan file lokal Anda nanti
                alt="Tim Pranoova Diskusi Digital" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback ke gambar Unsplash jika lokal belum ada
                  // Saya pilih gambar meeting modern dengan tone hangat/profesional
                  e.currentTarget.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600";
                }}
              />
              {/* Overlay Gradient halus supaya terlihat menyatu */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply"></div>
            </div>

            {/* Decorative Element 1: Blob Belakang */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            
            {/* Decorative Element 2: Floating Badge "Pengalaman" */}
            {/* <div className="absolute bottom-8 left-8 right-8 md:right-auto md:-left-12 bg-card p-6 rounded-2xl shadow-xl border border-border animate-fade-in flex items-center gap-5">
               <div className="w-14 h-14 bg-[#8B5E3C] rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                  <Trophy className="w-7 h-7" />
               </div>
               <div>
                  <p className="text-3xl font-bold text-foreground">Memberi</p>
                  <p className="text-sm text-muted-foreground font-medium">Pelayanan Dengan</p>
                  <p className="text-xs text-muted-foreground mt-1">Dedikasi Tinggi</p>
               </div>
            </div> */}

            {/* Decorative Element 3: Floating Badge "Klien" (Opsional - Bisa dihapus kalau terlalu ramai) */}
            <div className="hidden md:flex absolute top-12 -right-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border items-center gap-3">
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Users className="w-5 h-5" />
               </div>
               <div>
                  <p className="text-sm font-bold">Fokus Klien</p>
                  <p className="text-xs text-muted-foreground">UMKM & Korporasi</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;