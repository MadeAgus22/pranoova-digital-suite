import { CheckCircle } from "lucide-react";

const features = [
  "Pendekatan berbasis kebutuhan dan skala bisnis",
  "Solusi fleksibel untuk UMKM hingga bisnis berkembang",
  "Dukungan teknis dan pendampingan pasca implementasi",
  "Penggunaan teknologi yang stabil dan praktik terbaik industri",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mitra Teknologi untuk{" "}
              <span className="text-gradient">Digitalisasi Bisnis</span>
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

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Pranoova menangani layanan implementasi ERP, pembuatan website dan optimasi SEO, serta solusi IoT, 
              CCTV, dan jaringan internal bisnis, dengan prinsip efisiensi, transparansi, dan keberlanjutan.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-hero p-1">
              <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-6xl md:text-7xl font-bold text-gradient mb-2">5+</p>
                  <p className="text-xl font-medium text-foreground">Tahun Pengalaman</p>
                  <p className="text-muted-foreground mt-2">
                    Melayani berbagai industri dengan dedikasi tinggi
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
