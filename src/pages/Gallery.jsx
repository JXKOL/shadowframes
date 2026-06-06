import { useState, cloneElement, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Eye, Share2, Sparkles, ShieldCheck, Zap, Swords, Ghost, Cpu, User, Monitor, X, Maximize2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const CATEGORIES = ['All', 'Cyberpunk', 'Samurai', 'Dark Fantasy', 'Neon City', 'Mecha', 'Demon Hunter', 'Anime Girls', 'Glitchcore'];

const WALLPAPERS = [
  // 1-10
  { id: 1, title: 'Neon Oni', category: 'Cyberpunk', premium: true, likes: 12400, views: '45k', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Void Blade', category: 'Samurai', premium: false, likes: 8200, views: '22k', url: 'https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Cyber Maiden', category: 'Anime Girls', premium: true, likes: 15100, views: '88k', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Celestial Art', category: 'Dark Fantasy', premium: false, likes: 4500, views: '20k', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'Demon Core', category: 'Demon Hunter', premium: true, likes: 1800, views: '9k', url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop' },
  { id: 6, title: 'Arcane Rift', category: 'Dark Fantasy', premium: false, likes: 2100, views: '8k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 7, title: 'Neural Ronin', category: 'Mecha', premium: true, likes: 5200, views: '25k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, title: 'Neo Tokyo', category: 'Neon City', premium: false, likes: 3800, views: '14k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },
  { id: 9, title: 'Cyber Geisha', category: 'Anime Girls', premium: true, likes: 6700, views: '30k', url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1000&auto=format&fit=crop' },
  { id: 10, title: 'Crimson Temple', category: 'Samurai', premium: false, likes: 1400, views: '6k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  
  // 11-20
  { id: 11, title: 'Digital Abyss', category: 'Glitchcore', premium: true, likes: 1100, views: '4k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 12, title: 'Star Kingdom', category: 'Dark Fantasy', premium: false, likes: 2900, views: '11k', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop' },
  { id: 13, title: 'Cyber Mask', category: 'Demon Hunter', premium: true, likes: 4200, views: '18k', url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1000&auto=format&fit=crop' },
  { id: 14, title: 'Iron Soul', category: 'Mecha', premium: false, likes: 1500, views: '7k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 15, title: 'Prism Flux', category: 'Neon City', premium: true, likes: 950, views: '4k', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop' },
  { id: 16, title: 'Cyber Alley', category: 'Cyberpunk', premium: false, likes: 3300, views: '13k', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
  { id: 17, title: 'Red Katana', category: 'Samurai', premium: true, likes: 10000, views: '50k', url: 'https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=1000&auto=format&fit=crop' },
  { id: 18, title: 'Future Girl', category: 'Anime Girls', premium: true, likes: 12000, views: '90k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },
  { id: 19, title: 'Vaporwave Sky', category: 'Neon City', premium: false, likes: 5000, views: '30k', url: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1000&auto=format&fit=crop' },
  { id: 20, title: 'Glitch Horizon', category: 'Glitchcore', premium: true, likes: 3000, views: '15k', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop' },

  // 21-30
  { id: 21, title: 'Steel Falcon', category: 'Mecha', premium: true, likes: 7000, views: '35k', url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop' },
  { id: 22, title: 'Obsidian Tower', category: 'Dark Fantasy', premium: false, likes: 4000, views: '18k', url: 'https://images.unsplash.com/photo-1635311210815-58079a0e6677?q=80&w=1000&auto=format&fit=crop' },
  { id: 23, title: 'Cyber Pulse', category: 'Cyberpunk', premium: true, likes: 9000, views: '42k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },
  { id: 24, title: 'Ghost Blade', category: 'Samurai', premium: false, likes: 11000, views: '60k', url: 'https://images.unsplash.com/photo-1612450800052-758c0628bc96?q=80&w=1000&auto=format&fit=crop' },
  { id: 25, title: 'Project Sakura', category: 'Anime Girls', premium: true, likes: 20000, views: '150k', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop' },
  { id: 26, title: 'Neon Dragon', category: 'Demon Hunter', premium: true, likes: 15000, views: '80k', url: 'https://images.unsplash.com/photo-1597423498219-03118f5d33a2?q=80&w=1000&auto=format&fit=crop' },
  { id: 27, title: 'Mech Titan', category: 'Mecha', premium: true, likes: 8000, views: '40k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 28, title: 'Eternal Flame', category: 'Dark Fantasy', premium: false, likes: 6000, views: '25k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 29, title: 'Code Red', category: 'Glitchcore', premium: true, likes: 4000, views: '20k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 30, title: 'Rainy Night', category: 'Neon City', premium: false, likes: 14000, views: '70k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },

  // 31-40
  { id: 31, title: 'Cyber Assassin', category: 'Cyberpunk', premium: true, likes: 18000, views: '95k', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
  { id: 32, title: 'Blood Samurai', category: 'Samurai', premium: true, likes: 22000, views: '110k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  { id: 33, title: 'Synthetic Love', category: 'Anime Girls', premium: false, likes: 9000, views: '55k', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop' },
  { id: 34, title: 'Dark Soul', category: 'Demon Hunter', premium: true, likes: 13000, views: '65k', url: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?q=80&w=1000&auto=format&fit=crop' },
  { id: 35, title: 'Gundam Wing', category: 'Mecha', premium: false, likes: 10000, views: '48k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 36, title: 'Midnight Bloom', category: 'Dark Fantasy', premium: true, likes: 7000, views: '32k', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop' },
  { id: 37, title: 'Static Noise', category: 'Glitchcore', premium: false, likes: 2000, views: '10k', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop' },
  { id: 38, title: 'Shattered Neon', category: 'Neon City', premium: true, likes: 16000, views: '100k', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop' },
  { id: 39, title: 'Tech Priestess', category: 'Anime Girls', premium: true, likes: 14000, views: '75k', url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1000&auto=format&fit=crop' },
  { id: 40, title: 'Zero One', category: 'Cyberpunk', premium: false, likes: 5000, views: '28k', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=1000&auto=format&fit=crop' },

  // 41-50+
  { id: 41, title: 'Iron Heart', category: 'Mecha', premium: true, likes: 19000, views: '120k', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' },
  { id: 42, title: 'Lost Ronin', category: 'Samurai', premium: false, likes: 25000, views: '140k', url: 'https://images.unsplash.com/photo-1612450800052-758c0628bc96?q=80&w=1000&auto=format&fit=crop' },
  { id: 43, title: 'Neon Blade', category: 'Demon Hunter', premium: true, likes: 30000, views: '200k', url: 'https://images.unsplash.com/photo-1597423498219-03118f5d33a2?q=80&w=1000&auto=format&fit=crop' },
  { id: 44, title: 'Cyber City', category: 'Neon City', premium: true, likes: 40000, views: '250k', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop' },
  { id: 45, title: 'Valkyrie 01', category: 'Anime Girls', premium: false, likes: 18000, views: '110k', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop' },
  { id: 46, title: 'Glitch World', category: 'Glitchcore', premium: true, likes: 22000, views: '130k', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: 47, title: 'Dragon Soul', category: 'Dark Fantasy', premium: true, likes: 35000, views: '220k', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop' },
  { id: 48, title: 'Mech Guard', category: 'Mecha', premium: true, likes: 28000, views: '180k', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop' },
  { id: 49, title: 'Samurai X', category: 'Samurai', premium: true, likes: 50000, views: '300k', url: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1000&auto=format&fit=crop' },
  { id: 50, title: 'Cyber End', category: 'Cyberpunk', premium: true, likes: 100000, views: '1M', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWp, setSelectedWp] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [downloads, setDownloads] = useState({});

  const filteredWallpapers = activeCategory === 'All' 
    ? WALLPAPERS 
    : WALLPAPERS.filter(w => w.category === activeCategory);

  const handleLike = useCallback((id, e) => {
    e?.stopPropagation();
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const handleDownload = useCallback((id, e) => {
    e?.stopPropagation();
    setDownloads(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    // Simulate actual download delay
    setTimeout(() => {
        alert("Downloading HD Neural Frame... Connection Stabilized.");
    }, 500);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedWp(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
            <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase">Shadow Archive v3.1</span>
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
              {cloneElement(stat.icon, { size: 18 })}
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
              onClick={() => setSelectedWp(wp)}
              className="group relative aspect-[3/4] rounded-[32px] overflow-hidden bg-brand-black border border-white/5 glow-hover-purple shadow-2xl cursor-zoom-in"
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
                <button 
                  onClick={(e) => handleLike(wp.id, e)}
                  className={`p-2.5 backdrop-blur-md rounded-full border transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
                    likedIds.includes(wp.id) 
                      ? 'bg-brand-red border-brand-red text-white' 
                      : 'bg-brand-black/40 border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-brand-red hover:border-brand-red'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likedIds.includes(wp.id) ? 'fill-current' : ''}`} />
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
                        <Heart className="w-3 h-3" /> {likedIds.includes(wp.id) ? (wp.likes + 1).toLocaleString() : wp.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-black uppercase">
                        <Download className="w-3 h-3" /> {downloads[wp.id] || 0}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); alert("Copied neural link to clipboard."); }}
                        className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/20 text-white transition-all transform hover:scale-110 active:scale-95"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => handleDownload(wp.id, e)}
                        className="p-3 bg-brand-purple text-white rounded-xl hover:bg-white hover:text-brand-black transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                      >
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

      {/* Fullscreen Modal Preview */}
      <AnimatePresence>
        {selectedWp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-2xl p-4 md:p-10 overflow-hidden"
            onClick={() => setSelectedWp(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full h-full md:h-[85vh] flex flex-col md:flex-row bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button Mobile */}
              <button 
                onClick={() => setSelectedWp(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-brand-black/50 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-brand-red transition-colors md:hidden"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="flex-1 relative overflow-hidden bg-brand-black group">
                <motion.img 
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  src={selectedWp.url} 
                  alt={selectedWp.title}
                  className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                />
                
                {/* Image Overlay Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-brand-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-white/60 hover:text-white transition-colors"><Maximize2 className="w-5 h-5" /></button>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Neural Preview HD</span>
                </div>
              </div>

              {/* Sidebar Info (Glassmorphism) */}
              <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col border-t md:border-t-0 md:border-l border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-6 bg-brand-purple" />
                            <span className="text-[10px] font-black text-brand-purple uppercase tracking-[0.4em]">{selectedWp.category}</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter leading-tight">{selectedWp.title}</h2>
                    </div>
                    <button 
                        onClick={() => setSelectedWp(null)}
                        className="hidden md:flex p-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-brand-red transition-all transform hover:rotate-90"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-8 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Downloads</p>
                            <p className="text-xl font-black text-white">{((downloads[selectedWp.id] || 0) + 1205).toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Views</p>
                            <p className="text-xl font-black text-white">{selectedWp.views}</p>
                        </div>
                    </div>

                    <div className="p-6 bg-brand-purple/5 border border-brand-purple/20 rounded-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brand-purple/20 rounded-lg text-brand-purple">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Format: 8K Ultra HD</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            Synthesized at 300 DPI for maximum fidelity. Optimized for Retina and OLED displays. Commercial rights included for Pro members.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-12 space-y-4">
                    <button 
                        onClick={() => handleDownload(selectedWp.id)}
                        className="w-full py-5 bg-brand-purple text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Download className="w-5 h-5" /> Download HD Frame
                    </button>
                    <div className="flex gap-4">
                        <button 
                            onClick={(e) => handleLike(selectedWp.id, e)}
                            className={`flex-1 py-4 border rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${
                                likedIds.includes(selectedWp.id)
                                ? 'bg-brand-red border-brand-red text-white'
                                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                            }`}
                        >
                            <Heart className={`w-4 h-4 ${likedIds.includes(selectedWp.id) ? 'fill-current' : ''}`} /> 
                            {likedIds.includes(selectedWp.id) ? 'Saved' : 'Favorite'}
                        </button>
                        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Neural signature verified</span>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
         <p className="text-[10px] font-black tracking-[0.5em] text-gray-700 uppercase">End of Shadow Archive v3.1</p>
      </div>
    </div>
  );
};

export default Gallery;
