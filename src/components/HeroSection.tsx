import { motion } from 'framer-motion';
import { ArrowDown, Github, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-20 lg:py-0">
      <ThreeScene />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Menggunakan lg:flex-row agar bingkai berada di sebelah kiri tulisan pada desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl mx-auto text-center lg:text-left">
          
          {/* --- BAGIAN BINGKAI KOTAK MODEREN (KIRI) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              {/* Efek Aksen Garis Gradasi di Belakang Bingkai Utama */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary via-purple-600 to-accent rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-700 animate-tilt"></div>
              
              {/* Bingkai Kotak Solid Minimalis (Ukuran Diperbesar) */}
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-muted border-2 border-primary/20 flex flex-col items-center justify-center shadow-2xl p-6 overflow-hidden"
                whileHover={{ scale: 1.03, rotate: -1, y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Pola Dekoratif Abstrak di Dalam Kotak */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-600/10 rounded-tr-full pointer-events-none" />

{/* Tag Gambar Profil Kotak */}
<motion.img 
  src="/fotoabiyyu.jpg" // 👈 GANTI DENGAN NAMA FILE FOTO KAMU
  alt="Abiyyu Fathin"
  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
/>
              </motion.div>
            </div>
          </motion.div>

          {/* --- BAGIAN TEKS UTAMA (KANAN) --- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-md bg-muted border border-border text-sm font-medium text-primary mb-6">
                👋 Selamat datang di portfolio saya
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Hi I'm
              <br />
              <span className="text-gradient">Abiyyu Fathin</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Saya adalah seorang siswa dari MAN 1 Banda Aceh yang saat ini sedang
              menempuh pendidikan di kelas X-11, dengan minat utama
              dalam pengembangan web dan pembuatan konten digital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow w-full sm:w-auto"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Lihat Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 w-full sm:w-auto"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hubungi Saya
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/kodingabiyyu-hub/abiyy-first.git', label: 'GitHub' },
                { icon: Youtube, href: 'https://www.youtube.com/', label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="p-3 rounded-xl bg-muted border border-border hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full bg-muted border border-border animate-float cursor-pointer"
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}