import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Download, Heart, Eye, Share2, Sparkles, ShieldCheck, Zap, Flame, Swords, Ghost, Cpu, User, Monitor } from 'lucide-react';
import SEO from '../components/SEO';

const CATEGORIES = ['All', 'Cyberpunk', 'Samurai', 'Dark Fantasy', 'Neon City', 'Mecha', 'Demon Hunter', 'Anime Girls', 'Glitchcore'];

const WALLPAPERS = [
  // 1-10
  { id: 1, title: 'Neon Oni', category: 'Cyberpunk', premium: true, likes: '12.4k', views: '45k', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Void Blade', category: 'Samurai', premium: false, likes: '8.2k', views: '22k', url: 'https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Cyber Maiden', category: 'Anime Girls', premium: true, likes: '15.1k', views: '88k', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Celestial Art', category: 'Dark Fantasy', premium: false, likes: '4.5k', views: '20k', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Demon Core', category: 'Demon Hunter', premium: true, likes: '1.8k', views: '9k', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Arcane Rift', category: 'Dark Fantasy', premium: false, likes: '2.1k', views: '8k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, title: 'Neural Ronin', category: 'Mecha', premium: true, likes: '5.2k', views: '25k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, title: 'Neo Tokyo', category: 'Neon City', premium: false, likes: '3.8k', views: '14k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },
  { id: 9, title: 'Cyber Geisha', category: 'Anime Girls', premium: true, likes: '6.7k', views: '30k', url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1000&auto=format&fit=crop' },
  { id: 10, title: 'Crimson Temple', category: 'Samurai', premium: false, likes: '1.4k', views: '6k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  
  // 11-20
  { id: 11, title: 'Digital Abyss', category: 'Glitchcore', premium: true, likes: '1.1k', views: '4k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 12, title: 'Star Kingdom', category: 'Dark Fantasy', premium: false, likes: '2.9k', views: '11k', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop' },
  { id: 13, title: 'Cyber Mask', category: 'Demon Hunter', premium: true, likes: '4.2k', views: '18k', url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1000&auto=format&fit=crop' },
  { id: 14, title: 'Iron Soul', category: 'Mecha', premium: false, likes: '1.5k', views: '7k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 15, title: 'Prism Flux', category: 'Neon City', premium: true, likes: '950', views: '4k', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop' },
  { id: 16, title: 'Cyber Alley', category: 'Cyberpunk', premium: false, likes: '3.3k', views: '13k', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
  { id: 17, title: 'Red Katana', category: 'Samurai', premium: true, likes: '10k', views: '50k', url: 'https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=1000&auto=format&fit=crop' },
  { id: 18, title: 'Future Girl', category: 'Anime Girls', premium: true, likes: '12k', views: '90k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },
  { id: 19, title: 'Vaporwave Sky', category: 'Neon City', premium: false, likes: '5k', views: '30k', url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1000&auto=format&fit=crop' },
  { id: 20, title: 'Glitch Horizon', category: 'Glitchcore', premium: true, likes: '3k', views: '15k', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop' },

  // 21-30
  { id: 21, title: 'Steel Falcon', category: 'Mecha', premium: true, likes: '7k', views: '35k', url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop' },
  { id: 22, title: 'Obsidian Tower', category: 'Dark Fantasy', premium: false, likes: '4k', views: '18k', url: 'https://images.unsplash.com/photo-1635311210815-58079a0e6677?q=80&w=1000&auto=format&fit=crop' },
  { id: 23, title: 'Cyber Pulse', category: 'Cyberpunk', premium: true, likes: '9k', views: '42k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },
  { id: 24, title: 'Ghost Blade', category: 'Samurai', premium: false, likes: '11k', views: '60k', url: 'https://images.unsplash.com/photo-1612450800052-758c0628bc96?q=80&w=1000&auto=format&fit=crop' },
  { id: 25, title: 'Project Sakura', category: 'Anime Girls', premium: true, likes: '20k', views: '150k', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop' },
  { id: 26, title: 'Neon Dragon', category: 'Demon Hunter', premium: true, likes: '15k', views: '80k', url: 'https://images.unsplash.com/photo-1597423498219-03118f5d33a2?q=80&w=1000&auto=format&fit=crop' },
  { id: 27, title: 'Mech Titan', category: 'Mecha', premium: true, likes: '8k', views: '40k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 28, title: 'Eternal Flame', category: 'Dark Fantasy', premium: false, likes: '6k', views: '25k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 29, title: 'Code Red', category: 'Glitchcore', premium: true, likes: '4k', views: '20k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 30, title: 'Rainy Night', category: 'Neon City', premium: false, likes: '14k', views: '70k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },

  // 31-40
  { id: 31, title: 'Cyber Assassin', category: 'Cyberpunk', premium: true, likes: '18k', views: '95k', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
  { id: 32, title: 'Blood Samurai', category: 'Samurai', premium: true, likes: '22k', views: '110k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  { id: 33, title: 'Synthetic Love', category: 'Anime Girls', premium: false, likes: '9k', views: '55k', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop' },
  { id: 34, title: 'Dark Soul', category: 'Demon Hunter', premium: true, likes: '13k', views: '65k', url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1000&auto=format&fit=crop' },
  { id: 35, title: 'Gundam Wing', category: 'Mecha', premium: false, likes: '10k', views: '48k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 36, title: 'Midnight Bloom', category: 'Dark Fantasy', premium: true, likes: '7k', views: '32k', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop' },
  { id: 37, title: 'Static Noise', category: 'Glitchcore', premium: false, likes: '2k', views: '10k', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop' },
  { id: 38, title: 'Shattered Neon', category: 'Neon City', premium: true, likes: '16k', views: '100k', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop' },
  { id: 39, title: 'Tech Priestess', category: 'Anime Girls', premium: true, likes: '14k', views: '75k', url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1000&auto=format&fit=crop' },
  { id: 40, title: 'Zero One', category: 'Cyberpunk', premium: false, likes: '5k', views: '28k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },

  // 41-50+
  { id: 41, title: 'Iron Heart', category: 'Mecha', premium: true, likes: '19k', views: '120k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 42, title: 'Lost Ronin', category: 'Samurai', premium: false, likes: '25k', views: '140k', url: 'https://images.unsplash.com/photo-1612450800052-758c0628bc96?q=80&w=1000&auto=format&fit=crop' },
  { id: 43, title: 'Neon Blade', category: 'Demon Hunter', premium: true, likes: '30k', views: '200k', url: 'https://images.unsplash.com/photo-1597423498219-03118f5d33a2?q=80&w=1000&auto=format&fit=crop' },
  { id: 44, title: 'Cyber City', category: 'Neon City', premium: true, likes: '40k', views: '250k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },
  { id: 45, title: 'Valkyrie 01', category: 'Anime Girls', premium: false, likes: '18k', views: '110k', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop' },
  { id: 46, title: 'Glitch World', category: 'Glitchcore', premium: true, likes: '22k', views: '130k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 47, title: 'Dragon Soul', category: 'Dark Fantasy', premium: true, likes: '35k', views: '220k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 48, title: 'Mech Guard', category: 'Mecha', premium: true, likes: '28k', views: '180k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 49, title: 'Samurai X', category: 'Samurai', premium: true, likes: '50k', views: '300k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  { id: 50, title: 'Cyber End', category: 'Cyberpunk', premium: true, likes: '100k', views: '1M', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredWallpapers = activeCategory === 'All' 
    ? WALLPAPERS 
    : WALLPAPERS.filter(w => w.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen">
      <SEO 
        title="Shadow Archive - Massive Anime AI Collection" 
        description="Explore over 50+ high-fidelity AI-generated anime wallpapers. From Cyberpunk to Mecha, discover the ultimate digital art archive."
        keywords="anime gallery, AI art, cyberpunk wallpapers, samurai art, mecha designs, anime girls art"
      />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-brand-purple fill-brand-purple animate-pulse" />
            <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase">Shadow Archive v3.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            THE <span className="text-brand-purple text-glow-purple italic">ARCHIVE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl font-medium">
            Explore 50+ hand-forged, ultra-high-fidelity neural frames. The premier source for futuristic anime aesthetics.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar"
        >
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 p-2 rounded-2xl backdrop-blur-xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest whitespace-nowrap transition-all duration-500 ${
                  activeCategory === cat 
                    ? 'bg-brand-purple text-white shadow-[0_0_30px_rgba(139,92,246,0.3)] scale-105' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <div className="flex gap-8 mb-12 overflow-x-auto no-scrollbar pb-4">
        {[
          { icon: <Swords />, label: 'Samurai', count: WALLPAPERS.filter(w => w.category === 'Samurai').length },
          { icon: <Cpu />, label: 'Cyberpunk', count: WALLPAPERS.filter(w => w.category === 'Cyberpunk').length },
          { icon: <User />, label: 'Anime Girls', count: WALLPAPERS.filter(w => w.category === 'Anime Girls').length },
          { icon: <Monitor />, label: 'Neon City', count: WALLPAPERS.filter(w => w.category === 'Neon City').length },
          { icon: <Ghost />, label: 'Dark Fantasy', count: WALLPAPERS.filter(w => w.category === 'Dark Fantasy').length },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl shrink-0"
          >
            <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
              {React.cloneElement(stat.icon, { size: 18 })}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-white">{stat.count} Frames</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid Section */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredWallpapers.map((wp) => (
            <motion.div
              layout
              key={wp.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-[3/4] rounded-[32px] overflow-hidden bg-brand-black border border-white/5 glow-hover-purple shadow-2xl"
            >
              {/* Image Loading Placeholder */}
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
              
              <img 
                src={wp.url} 
                alt={wp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop';
                }}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
              
              {/* Card Top Actions */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                {wp.premium ? (
                  <div className="flex items-center gap-1.5 bg-brand-purple/20 backdrop-blur-md border border-brand-purple/30 text-brand-purple text-[9px] font-black px-3 py-1.5 rounded-full shadow-2xl">
                    <ShieldCheck className="w-3 h-3" /> PREMIUM
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1.5 rounded-full">
                    FREE
                  </div>
                )}
                <button className="p-2.5 bg-brand-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-red hover:border-brand-red transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Card Info */}
              <div className="absolute bottom-0 inset-x-0 p-8 z-10">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-4 bg-brand-purple" />
                    <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.4em]">{wp.category}</p>
                  </div>
                  <h3 className="text-xl font-black mb-6 leading-tight tracking-tighter">{wp.title}</h3>
                  
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex gap-4 text-gray-400">
                      <span className="flex items-center gap-1.5 text-[9px] font-black uppercase">
                        <Heart className="w-3 h-3" /> {wp.likes}
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-black uppercase">
                        <Eye className="w-3 h-3" /> {wp.views}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/20 text-white transition-all transform hover:scale-110 active:scale-95">
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-3 bg-brand-purple text-white rounded-xl hover:bg-white hover:text-brand-black transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredWallpapers.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-60 text-center"
        >
          <div className="inline-block p-10 bg-white/5 rounded-full border border-white/5 mb-8">
            <Sparkles className="w-20 h-20 text-brand-purple/20" />
          </div>
          <h3 className="text-3xl font-black italic tracking-tighter text-gray-400">THE ARCHIVE IS LOCKED</h3>
          <p className="text-gray-600 mt-4 font-medium max-w-sm mx-auto">No art matches your filter in this dimension. Try broadening your horizons.</p>
        </motion.div>
      )}

      {/* Footer Decoration */}
      <div className="mt-20 py-10 border-t border-white/5 flex flex-col items-center">
         <p className="text-[10px] font-black tracking-[0.5em] text-gray-700 uppercase">End of Shadow Archive v3.0</p>
      </div>
    </div>
  );
};

export default Gallery;
// Triggering fresh deploy: Sat Jun  6 10:23:01 UTC 2026
