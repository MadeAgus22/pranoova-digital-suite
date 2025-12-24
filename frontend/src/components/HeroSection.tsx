import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const home = [

  
]

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Digital Solutions Partner
            </span>
          </div>

          <h1 className="animate-fade-up animation-delay-200 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transformasi{" "}
            <span className="text-gradient">Digital</span>{" "}
            untuk Bisnis Modern
          </h1>

          <p className="animate-fade-up animation-delay-400 text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pranoova hadir sebagai mitra teknologi Anda. Dari sistem ERP, website profesional, hingga infrastruktur IT yang handal.
          </p>

          <div className="animate-fade-up animation-delay-600 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Konsultasi Gratis
              <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" size="xl">
              Lihat Layanan
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up animation-delay-600 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {/* <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">50+</p>
              <p className="text-sm text-muted-foreground mt-1">Klien</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">100+</p>
              <p className="text-sm text-muted-foreground mt-1">Proyek</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">5+</p>
              <p className="text-sm text-muted-foreground mt-1">Tahun</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
