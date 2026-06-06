import { useState, cloneElement, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Eye, Share2, Sparkles, ShieldCheck, Zap, Swords, Ghost, Cpu, User, Monitor, X, Maximize2, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const CATEGORIES = ['All', 'Cyberpunk', 'Samurai', 'Dark Fantasy', 'Neon City', 'Mecha', 'Demon Hunter', 'Anime Girls', 'Glitchcore'];

const WALLPAPERS = [
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
  { id: 50, title: 'Cyber End', category: 'Cyberpunk', premium: true, likes: 100000, views: '1M', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWp, setSelectedWp] = useState(null);
  const [downloads, setDownloads] = useState({});
  const { user, profile, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const filteredWallpapers = activeCategory === 'All' 
    ? WALLPAPERS 
    : WALLPAPERS.filter(w => w.category === activeCategory);

  const handleLike = useCallback((id, e) => {
    e?.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(id);
  }, [user, toggleFavorite, navigate]);

  const handleDownload = useCallback((id, e) => {
    e?.stopPropagation();
    setDownloads(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
        description="Explore over 50+ high-fidelity AI-generated anime wallpapers."
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
            <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase">Shadow Archive v3.2</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            THE <span className="text-brand-purple text-glow-purple italic">ARCHIVE</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl font-medium">
            Explore hand-forged neural frames. Sync with your profile to save favorites.
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
              onClick={() => setSelectedWp(wp)}
              className="group relative aspect-[3/4] rounded-[32px] overflow-hidden bg-brand-black border border-white/5 shadow-2xl cursor-zoom-in"
            >
              <img 
                src={wp.url} 
                alt={wp.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
              
              <div className="absolute top-6 left-6 right-6 flex justify-between z-10">
                {wp.premium && (
                  <div className="flex items-center gap-1.5 bg-brand-purple/20 backdrop-blur-md border border-brand-purple/30 text-brand-purple text-[9px] font-black px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> PREMIUM
                  </div>
                )}
                <button 
                  onClick={(e) => handleLike(wp.id, e)}
                  className={`p-2.5 backdrop-blur-md rounded-full border transition-all ${
                    profile?.favorites?.includes(wp.id) 
                      ? 'bg-brand-red border-brand-red text-white' 
                      : 'bg-brand-black/40 border-white/10 text-white opacity-0 group-hover:opacity-100 hover:bg-brand-red'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${profile?.favorites?.includes(wp.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-8 z-10">
                <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.4em] mb-1">{wp.category}</p>
                <h3 className="text-xl font-black mb-4 leading-tight">{wp.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={(e) => handleDownload(wp.id, e)} className="p-2 bg-brand-purple text-white rounded-lg"><Download size={14}/></button>
                  <button className="p-2 bg-white/10 text-white rounded-lg"><Share2 size={14}/></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Integration */}
      <AnimatePresence>
        {selectedWp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-2xl p-4 overflow-hidden"
            onClick={() => setSelectedWp(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full md:h-[80vh] flex flex-col md:flex-row bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 relative overflow-hidden bg-brand-black">
                <img src={selectedWp.url} alt={selectedWp.title} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col backdrop-blur-3xl">
                <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-black tracking-tighter">{selectedWp.title}</h2>
                    <button onClick={() => setSelectedWp(null)} className="p-2 hover:text-brand-red transition-colors"><X/></button>
                </div>
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-black">Likes</p>
                            <p className="text-xl font-black">{selectedWp.likes.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-black">Format</p>
                            <p className="text-xl font-black">8K</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 space-y-4">
                    <button onClick={() => handleDownload(selectedWp.id)} className="w-full py-4 bg-brand-purple rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                        <Download size={18}/> Download Frame
                    </button>
                    <button 
                        onClick={(e) => handleLike(selectedWp.id, e)}
                        className={`w-full py-4 border rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
                            profile?.favorites?.includes(selectedWp.id) ? 'bg-brand-red border-brand-red text-white' : 'bg-white/5 border-white/10 text-white'
                        }`}
                    >
                        <Heart className={profile?.favorites?.includes(selectedWp.id) ? 'fill-current' : ''} size={14}/> 
                        {profile?.favorites?.includes(selectedWp.id) ? 'Saved to Archive' : 'Add to Archive'}
                    </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
