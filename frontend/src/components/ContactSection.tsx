import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner"; // Pastikan sudah install sonner atau ganti dengan alert biasa

const ContactSection = () => {
  // 1. State untuk menyimpan input user
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: ""
  });

  // 2. Fungsi saat input diketik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Fungsi saat tombol KIRIM ditekan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.name || !formData.message) {
      toast.error("Mohon lengkapi Nama dan Pesan.");
      return;
    }

    // Nomor Admin (Sesuai info di card sebelah kiri)
    const adminPhone = "6285739922214"; 

    // Format Pesan WhatsApp (Menggunakan %0A untuk baris baru)
    const text = 
      `Halo Admin Pranoova,%0A%0A` +
      `Perkenalkan saya: *${encodeURIComponent(formData.name)}*%0A` +
      `No WA: *${encodeURIComponent(formData.whatsapp)}*%0A` +
      `Email: *${encodeURIComponent(formData.email)}*%0A%0A` +
      `*Pesan:*%0A${encodeURIComponent(formData.message)}`;

    // Buka WhatsApp di tab baru
    window.open(`https://wa.me/${adminPhone}?text=${text}`, "_blank");

    toast.success("Membuka WhatsApp...");
    
    // Reset Form (Opsional)
    setFormData({ name: "", whatsapp: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Hubungi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Siap Memulai Transformasi Digital?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Konsultasikan kebutuhan bisnis Anda dengan tim kami. Kami siap membantu menemukan solusi terbaik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info Side */}
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:toniagus182@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      toniagus182@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Whatsapp</p>
                    <a href="https://wa.me/6285739922214" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                      +62 857 399 22214
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Alamat</p>
                    <p className="text-muted-foreground">
                      Blahkiuh, Abiansemal, Badung, Bali, Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form Side */}
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nama *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                    Nomer Whatsapp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="email@contoh.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Ceritakan kebutuhan Anda..."
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full" type="submit">
                  Kirim ke WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;