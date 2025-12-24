import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="bg-primary-foreground rounded-lg p-2 inline-block mb-4">
              <Logo className="h-6" />
            </div>
            <p className="text-primary-foreground/70 max-w-sm">
              Partner teknologi terpercaya untuk transformasi digital bisnis Anda. 
              Dari ERP hingga infrastruktur IT.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Digitalisasi Bisnis</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">Website & SEO</a></li>
              <li><a href="#services" className="hover:text-primary-foreground transition-colors">IoT & Networking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-primary-foreground transition-colors">Tentang</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} Pranoova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
