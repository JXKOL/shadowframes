import { motion } from 'framer-motion';
import { 
  Sparkles, Zap, Shield, Image as ImageIcon, Play, Star, 
  ChevronRight, Heart, Download, Flame, Trophy, TrendingUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useState, useEffect } from 'react';

const TRENDING_ASSETS = [
  { id: 1, title: 'Cyber Oni', cat: 'Cyberpunk', likes: '12.4k', downloads: '3.1k', rank: 1, url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Neon Ronin', cat: 'Samurai', likes: '9.8k', downloads: '2.5k', rank: 2, url: 'https://images.unsplash.com/photo-1514467950441-249876274472?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Maiden 01', cat: 'Anime Girls', likes: '8.2k', downloads: '1.9k', rank: 3, url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Void Rift', cat: 'Fantasy', likes: '7.5k', downloads: '1.5k', rank: 4, url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Mech Soul', cat: 'Mecha', likes: '6.9k', downloads: '1.2k', rank: 5, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Neo Tokyo', cat: 'Cityscape', likes: '5.4k', downloads: '900', rank: 6, url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop' },
];

const Home = () => {
  const [stats, setStats] = useState({ activeUsers: 1240, generationsToday: 8942 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        generationsToday: prev.generationsToday + Math.floor(Math.random() * 3)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Forge Your Anime Aesthetic" 
        description="ShadowFrames is the premier AI-powered anime wallpaper platform. Generate high-fidelity cyberpunk art and futuristic anime wallpapers for your desktop and mobile."
      />
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-20 bg-brand-black overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-red/5 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-300">
                The World's #1 Anime AI Forge
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl xl:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
              IGNITE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-red to-brand-purple bg-[length:200%_auto] animate-gradient text-glow-purple italic">
                AESTHETIC
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Step into the neon-lit future of digital art. Generate ultra-high resolution 
              anime masterpieces with our industry-leading neural networks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/generate" className="group relative w-full sm:w-auto px-10 py-5 bg-brand-purple text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 glow-purple flex items-center justify-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Sparkles className="w-5 h-5" />
                START GENERATING
              </Link>
              <Link to="/gallery" className="w-full sm:w-auto px-10 py-5 glass hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-3">
                <Play className="w-5 h-5 fill-current" />
                BROWSE GALLERY
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Stats Ticker */}
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { label: 'Active Links', value: stats.activeUsers.toLocaleString(), color: 'brand-purple' },
            { label: 'Forge Operations', value: stats.generationsToday.toLocaleString(), color: 'brand-red' },
            { label: 'Total Archives', value: '54,201', color: 'brand-purple' },
            { label: 'Uptime', value: '99.99%', color: 'green-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-xl font-black text-${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW Trending Today Section */}
      <section className="py-24 relative">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-brand-purple" size={20} />
                <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase">Neural Hotlist</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none italic">
                TRENDING <span className="text-brand-purple text-glow-purple">TODAY</span>
              </h2>
            </div>
            <div className="flex items-center gap-6">
               <div className="hidden lg:flex items-center gap-8">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Next Refresh</span>
                    <span className="text-xs font-bold text-white tabular-nums">04:12:55</span>
                  </div>
               </div>
               <Link to="/gallery" className="px-6 py-3 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple text-xs font-black uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-all">
                 View All
               </Link>
            </div>
          </div>

          {/* Horizontal Scroll Showcase */}
          <div className="relative group">
            <div className="flex gap-6 overflow-x-auto pb-12 pt-4 no-scrollbar snap-x snap-mandatory scroll-smooth">
              {TRENDING_ASSETS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative min-w-[280px] md:min-w-[340px] aspect-[3/4] rounded-[2.5rem] bg-brand-black border border-brand-white/5 overflow-hidden snap-start shadow-2xl group/card"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                  />
                  
                  {/* Neon Cyberpunk Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-90 group-hover/card:opacity-70 transition-opacity" />
                  
                  {/* Animated Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="flex items-center gap-2 bg-brand-black/60 backdrop-blur-xl border border-brand-purple/30 px-3 py-2 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    >
                      {item.rank === 1 ? <Trophy size={14} className="text-yellow-400" /> : <Flame size={14} className="text-brand-red" />}
                      <span className="text-[10px] font-black text-white uppercase">#{item.rank} TOP</span>
                    </motion.div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-8 z-10">
                    <p className="text-[9px] font-black text-brand-purple uppercase tracking-[0.4em] mb-2">{item.cat}</p>
                    <h3 className="text-2xl font-black mb-6 tracking-tighter">{item.title}</h3>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Heart size={14} className="text-brand-red fill-brand-red" />
                        <span className="text-xs font-bold text-white">{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download size={14} className="text-brand-blue" />
                        <span className="text-xs font-bold text-white">{item.downloads}</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-brand-purple/20 clip-path-slant" />
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indication Shadow */}
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-brand-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Features - Premium Look */}
      <section className="py-32 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2 border-white/10 hover:border-brand-purple/30">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">ULTRA-FAST FORGE</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Our proprietary clusters generate complex anime assets in under 5 seconds. Speed meets precision.</p>
            </div>

            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2 md:translate-y-8 border-white/10 hover:border-brand-red/30">
              <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <Shield className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">IRONCLAD RIGHTS</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Every generation is unique. Elite members receive full blockchain-verified commercial rights.</p>
            </div>

            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2 border-white/10 hover:border-brand-purple/30">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <ImageIcon className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">QUANTUM UPSCALE</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Native 8K resolution with zero artifacting. Optimized for everything from mobile to IMAX screens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker / CTA */}
      <section className="py-24 border-t border-white/5 bg-brand-purple relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="flex overflow-hidden whitespace-nowrap relative z-10">
           <div className="flex animate-marquee items-center">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="flex items-center gap-10 mx-10 text-brand-black font-black text-5xl italic tracking-tighter">
                 <span>READY TO FORGE?</span>
                 <Sparkles className="w-10 h-10 fill-current" />
                 <span>UNLIMITED POWER</span>
                 <Star className="w-10 h-10 fill-current" />
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
