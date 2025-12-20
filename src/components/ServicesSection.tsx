import { ArrowRight } from "lucide-react";
import illustrationErp from "@/assets/illustration-erp.png";
import illustrationWebsite from "@/assets/illustration-website.png";
import illustrationIot from "@/assets/illustration-iot.png";

const services = [
  {
    title: "Digitalisasi Bisnis (ERP)",
    description:
      "Integrasikan seluruh proses bisnis Anda dalam satu sistem yang efisien. Dari inventory, keuangan, hingga HR - semua terhubung.",
    image: illustrationErp,
    features: ["Sistem Terintegrasi", "Real-time Reporting", "Otomatisasi Proses"],
  },
  {
    title: "Website + SEO / Marketing",
    description:
      "Website profesional yang tidak hanya indah, tapi juga dioptimasi untuk mesin pencari dan menghasilkan leads berkualitas.",
    image: illustrationWebsite,
    features: ["Desain Responsif", "Optimasi SEO", "Marketing Digital"],
  },
  {
    title: "IoT, CCTV & Networking",
    description:
      "Solusi infrastruktur IT lengkap untuk keamanan dan konektivitas bisnis Anda. Dari CCTV pintar hingga jaringan enterprise.",
    image: illustrationIot,
    features: ["Smart Surveillance", "Network Setup", "IoT Integration"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solusi Digital Lengkap
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Kami menyediakan berbagai layanan teknologi untuk membantu bisnis Anda berkembang di era digital.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 animate-fade-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-accent/20">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
