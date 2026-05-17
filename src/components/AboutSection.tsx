import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Trophy, ChevronRight } from 'lucide-react';

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data biografi tetap mempertahankan warna gradien solid yang sangat menarik
  const bioCards = [
    {
      id: 1,
      title: "Pendidikan & Ambisi",
      content: "Saya adalah seorang siswa dari MAN 1 Banda Aceh yang saat ini menempuh pendidikan di kelas X-11. Saya sangat ingin belajar pemrograman agar bisa membuat website yang keren dan bermanfaat untuk orang banyak.",
      quote: "Langkah pertama untuk memprediksi masa depan adalah dengan membuatnya.",
      color: "from-indigo-600 to-blue-600",
      icon: Code2
    },
    {
      id: 2,
      title: "Latar Belakang & Cita-cita",
      content: "Lahir pada tanggal 24 Desember 2009 di Banda Aceh. Saya memiliki impian besar dan bercita-cita untuk menjadi seorang pejabat dalam pemerintahan agar dapat membawa perubahan positif bagi masyarakat.",
      quote: "Sebaik-baiknya manusia adalah yang paling bermanfaat bagi orang lain.",
      color: "from-emerald-600 to-teal-600",
      icon: Rocket
    },
    {
      id: 3,
      title: "Hobi & Aktivitas",
      content: "Di luar jam sekolah dan coding, saya sangat suka bermain basket. Aktivitas fisik ini bukan sekadar olahraga biasa bagi saya, melainkan sudah menjadi hobi utama yang menjaga fokus, disiplin, dan stamina.",
      quote: "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.",
      color: "from-amber-500 to-orange-600",
      icon: Trophy
    }
  ];

  const totalCards = bioCards.length;

  // Efek Auto-play berputar setiap 3 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalCards]);

  // Fungsi untuk menangani geser kartu (drag) menggunakan mouse
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    } else if (info.offset.x > 50) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    }
  };

  return (
    // DIUBAH: Menggunakan bg-background agar warnanya sama persis dengan variabel CSS global Anda
    <section id="about" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Bagian Atas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* TETAP: Judul menggunakan warna Biru Langit (text-sky-600) */}
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-sky-600 mb-4">
            About Me
          </h2>
          {/* TETAP: Garis pembatas warna biru langit */}
          <div className="w-20 h-1.5 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        {/* Layout Utama: Kiri (Motivasi) & Kanan (Kartu Tumpuk) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* SISI KIRI: Kata-kata Motivasi Dinamis */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 border-l-4 border-sky-500 pl-6"
              >
                {/* TETAP: Label teks warna biru langit cerah (text-sky-500) */}
                <span className="text-xs font-bold tracking-widest uppercase text-sky-500 block">
                  Motivasi Hari Ini
                </span>
                
                {/* TETAP: Teks kutipan motivasi mempertahankan warna gelap yang kuat (text-zinc-800) */}
                <p className="text-xl md:text-2xl font-medium italic text-zinc-800 leading-relaxed">
                  "{bioCards[currentIndex].quote}"
                </p>
                
                {/* TETAP: Teks info halaman menggunakan warna biru langit soft (text-sky-600/70) */}
                <div className="flex items-center gap-2 pt-2 text-sm text-sky-600/70">
                  <span>Kartu {currentIndex + 1} dari {totalCards}</span>
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SISI KANAN: Carousel Kartu Bertumpuk (Stacked Cards) */}
          <div className="lg:col-span-7 flex items-center justify-center relative h-[420px] w-full max-w-[420px] mx-auto lg:max-w-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {bioCards.map((card, index) => {
                const positionIndex = (index - currentIndex + totalCards) % totalCards;
                const isVisible = positionIndex < 3;
                const CardIcon = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    style={{
                      zIndex: totalCards - positionIndex,
                      cursor: positionIndex === 0 ? 'grab' : 'default',
                    }}
                    animate={{
                      scale: 1 - positionIndex * 0.06,
                      y: positionIndex * -16,
                      x: positionIndex * 12,
                      opacity: isVisible ? (1 - positionIndex * 0.25) : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    drag={positionIndex === 0 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ cursor: 'grabbing' }}
                    // Sisi dalam kartu mempertahankan background gradien solid & teks warna putih (text-white)
                    className={`absolute w-full max-w-[380px] aspect-[4/5] p-8 rounded-3xl shadow-xl bg-gradient-to-br ${card.color} text-white flex flex-col justify-between select-none`}
                  >
                    {/* Bagian Konten Atas Kartu */}
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-sm">
                        <CardIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-4">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed font-normal">
                        {card.content}
                      </p>
                    </div>

                    {/* Bagian Footer Kartu */}
                    <div className="pt-4 border-t border-white/20 flex justify-between items-center text-xs text-white/70 font-medium">
                      <span>Abiyyu Fathin</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-white text-[10px] uppercase tracking-wider font-bold">
                        Geser / Otomatis
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}