import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, Heart, Eye } from 'lucide-react';

const CATEGORIES = ['All', 'Cyberpunk', 'Samurai', 'Fantasy', 'Demons', 'Neon City', 'Gaming'];

const WALLPAPERS = [
  { id: 1, title: 'Cyber Oni', category: 'Cyberpunk', premium: true, url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?auto=format&fit=crop&q=80&w=1000' },
  { id: 2, title: 'Neon Katana', category: 'Samurai', premium: false, url: 'https://images.unsplash.com/photo-1578632738981-4330c709e135?auto=format&fit=crop&q=80&w=1000' },
  { id: 3, title: 'Void Wanderer', category: 'Fantasy', premium: true, url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000' },
  { id: 4, title: 'Demon Hunter', category: 'Demons', premium: false, url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000' },
  { id: 5, title: 'Arcane Spires', category: 'Fantasy', premium: true, url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000' },
  { id: 6, title: 'Pixel Ronin', category: 'Gaming', premium: false, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredWallpapers = activeCategory === 'All' 
    ? WALLPAPERS 
    : WALLPAPERS.filter(w => w.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">THE <span className="text-brand-purple">GALLERY</span></h1>
          <p className="text-gray-400">Discover hand-crafted and AI-generated masterpieces.</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <Filter className="w-4 h-4 text-brand-purple mr-2 shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-purple text-white glow-purple' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWallpapers.map((wp) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={wp.id}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
          >
            <img 
              src={wp.url} 
              alt={wp.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
            
            <div className="absolute top-4 right-4 flex gap-2">
              {wp.premium && (
                <span className="bg-brand-purple text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">PREMIUM</span>
              )}
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-1">{wp.category}</p>
              <h3 className="text-xl font-bold mb-4">{wp.title}</h3>
              
              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-sm font-bold hover:text-brand-purple transition-colors">
                    <Heart className="w-4 h-4" /> 1.2k
                  </button>
                  <button className="flex items-center gap-1 text-sm font-bold hover:text-brand-purple transition-colors">
                    <Eye className="w-4 h-4" /> 5k
                  </button>
                </div>
                <button className="p-3 bg-white text-brand-black rounded-xl hover:bg-brand-purple hover:text-white transition-all">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
