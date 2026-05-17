import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce modern yang ada di HP bisa digunakan untuk belanja online.',
    tags: ['Shopee', 'Lazada', 'TikTok Shop', 'Tokopedia'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: 'https://github.com/kodingabiyyu-hub/abiyy-first.git',
    demo: 'https://www.tokopedia.com/',
  },
  {
    title: 'Learning Platform',
    description: 'Platform pembelajaran online yang mempermudah kamu dalam belajar.',
    tags: ['Ruang Guru', 'Zenius', 'Duolingo', 'Quipper'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: 'https://github.com/kodingabiyyu-hub/abiyy-first.git',
    demo: 'https://app.ruangguru.com/',
  },
  {
    title: 'Social Media Platform',
    description: 'Platform yang sangat berguna untuk social media dan sharing-sharing.',
    tags: ['WhatsApp', 'Facebook', 'TikTok', 'Instagram'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: 'https://github.com/kodingabiyyu-hub/abiyy-first.git',
    demo: 'https://www.tiktok.com/id-ID/',
  },
  {
    title: 'AI Platform',
    description: 'Situs atau APK berbasis AI untuk mempermudah mencari informasi.',
    tags: ['ChatGPT', 'Google AI', 'Gemini', 'Meta AI'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: 'https://github.com/kodingabiyyu-hub/abiyy-first.git',
    demo: 'https://gemini.google.com/',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Video tutorial yang sudah tersebar di banyak platform yang dapat mempermudah pengerjaan suatu tugas.',
    tags: ['TikTok', 'Instagram', 'YouTube'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips & tricks dalam melakukan proggaming atau coding.',
    tags: ['Instagram', 'TikTok', 'YouTube'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: 'https://www.youtube.com/',
  },
];

// Komponen Pembungkus Kartu untuk Efek 3D Tilt Mengikuti Mouse
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mengubah posisi mouse menjadi rotasi derajat (Max 15 derajat)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Menghitung posisi relatif mouse di dalam kartu (antara -0.5 sampai 0.5)
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  }

  function handleMouseLeave() {
    // Mengembalikan kartu ke posisi semula saat mouse keluar
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective"
    >
      <div className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 transform-gpu" style={{ transform: 'translateZ(20px)' }}>
        
        {/* Kontainer Gambar dengan Efek Gradient */}
        <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color} overflow-hidden`}>
          {/* Animasi Emojinya Naik Turun (Floating) */}
          <motion.span 
            className="text-6xl block select-none"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2 // Mengacak jeda agar tidak naik turun bersamaan
            }}
          >
            {project.image}
          </motion.span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {'isContent' in project && project.isContent && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">
                Content
              </span>
            )}
            <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            {'github' in project && project.github && (
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <img src="data:image/svg+xml;utf8,<svg..." className="hidden" alt=""/> {/* fallback */}
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {'demo' in project && project.demo && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            {'youtube' in project && project.youtube && (
              <Button size="sm" className="rounded-full" asChild>
                <a href={project.youtube} target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4 mr-1" />
                  Watch
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Projects &amp; Karya
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Grid System */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto isolation-isolate">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}