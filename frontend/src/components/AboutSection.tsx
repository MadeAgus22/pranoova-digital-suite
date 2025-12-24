import { CheckCircle } from "lucide-react";

const features = [
  "Tim berpengalaman dengan berbagai proyek sukses",
  "Pendekatan konsultatif yang disesuaikan kebutuhan",
  "Dukungan teknis berkelanjutan pasca implementasi",
  "Teknologi terkini dan best practices industri",
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
              Mitra Teknologi yang{" "}
              <span className="text-gradient">Dapat Diandalkan</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Pranoova adalah perusahaan teknologi yang berfokus pada solusi digital untuk bisnis. 
              Kami percaya bahwa setiap bisnis berhak mendapatkan teknologi yang dapat membantu 
              mereka berkembang lebih cepat dan efisien.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Dengan tim yang terdiri dari para profesional berpengalaman, kami berkomitmen 
              untuk memberikan solusi teknologi terbaik yang sesuai dengan kebutuhan unik bisnis Anda.
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
