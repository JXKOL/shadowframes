import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Download, Heart, Eye, Share2, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Cyberpunk', 'Samurai', 'Fantasy', 'Demons', 'Neon City', 'Mecha'];

const WALLPAPERS = [
  { id: 1, title: 'Cyber Oni', category: 'Cyberpunk', premium: true, likes: '2.4k', views: '12k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, title: 'Neon Katana', category: 'Samurai', premium: false, likes: '1.2k', views: '5k', url: 'https://images.unsplash.com/photo-1578632738981-4330c709e135?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, title: 'Void Wanderer', category: 'Fantasy', premium: true, likes: '3.1k', views: '15k', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, title: 'Demon Hunter', category: 'Demons', premium: false, likes: '890', views: '3k', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, title: 'Arcane Spires', category: 'Fantasy', premium: true, likes: '4.5k', views: '20k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000' },
  { id: 6, title: 'Pixel Ronin', category: 'Mecha', premium: false, likes: '1.5k', views: '7k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' },
  { id: 7, title: 'Cyber Geisha', category: 'Cyberpunk', premium: true, likes: '5.2k', views: '25k', url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=1000' },
  { id: 8, title: 'Iron Soul', category: 'Mecha', premium: true, likes: '1.8k', views: '9k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000' },
  { id: 9, title: 'Tokyo Night', category: 'Neon City', premium: false, likes: '2.9k', views: '11k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000' },
  { id: 10, title: 'Crimson Samurai', category: 'Samurai', premium: true, likes: '6.7k', views: '30k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80&w=1000' },
  { id: 11, title: 'Digital Abyss', category: 'Cyberpunk', premium: false, likes: '1.1k', views: '4k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' },
  { id: 12, title: 'Sky Kingdom', category: 'Fantasy', premium: true, likes: '3.8k', views: '14k', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredWallpapers = activeCategory === 'All' 
    ? WALLPAPERS 
    : WALLPAPERS.filter(w => w.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-purple animate-pulse" />
            <span className="text-brand-purple font-black tracking-widest text-xs uppercase">Curated Excellence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-4">
            THE <span className="text-brand-purple text-glow-purple">GALLERY</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Explore our ever-growing collection of high-fidelity anime art. 
            From neon-soaked streets to ancient warrior spirits.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar scroll-smooth"
        >
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-full">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-brand-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
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
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-brand-black border border-white/5 glow-hover-purple"
            >
              <img 
                src={wp.url} 
                alt={wp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                {wp.premium && (
                  <span className="bg-brand-purple/20 backdrop-blur-md border border-brand-purple/30 text-brand-purple text-[10px] font-black px-3 py-1.5 rounded-full shadow-2xl">
                    PREMIUM
                  </span>
                )}
                <button className="p-2.5 bg-brand-black/40 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-purple hover:border-brand-purple transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.3em] mb-2">{wp.category}</p>
                  <h3 className="text-2xl font-black mb-6 leading-tight">{wp.title}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-gray-400">
                      <span className="flex items-center gap-1.5 text-xs font-bold">
                        <Heart className="w-3.5 h-3.5" /> {wp.likes}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-bold">
                        <Eye className="w-3.5 h-3.5" /> {wp.views}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-3 glass rounded-xl hover:bg-white hover:text-brand-black transition-all transform hover:scale-110 active:scale-95">
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-white text-brand-black rounded-xl hover:bg-brand-purple hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-xl">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredWallpapers.length === 0 && (
        <div className="py-40 text-center">
          <h3 className="text-2xl font-bold text-gray-500">No masterpieces found in this realm yet.</h3>
        </div>
      )}
    </div>
  );
};

export default Gallery;
