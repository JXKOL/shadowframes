import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Image as ImageIcon, Play, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full animate-float">
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

        {/* Featured Preview Grid */}
        <div className="mt-32 max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12 px-4">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-2 italic">TRENDING <span className="text-brand-purple">NOW</span></h2>
              <div className="h-1.5 w-24 bg-brand-purple rounded-full" />
            </div>
            <Link to="/gallery" className="flex items-center gap-2 text-sm font-black text-brand-purple hover:text-white transition-colors group">
              VIEW FULL COLLECTION <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {[
              { title: 'Neon Samurai', cat: 'Samurai', url: 'https://images.unsplash.com/photo-1580234797602-22c37b2a6230?q=80&w=800&auto=format&fit=crop' },
              { title: 'Cyber Maiden', cat: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop' },
              { title: 'Void Wanderer', cat: 'Fantasy', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop' },
              { title: 'Neural Link', cat: 'Mecha', url: 'https://images.unsplash.com/photo-1504333638930-c8787321eba0?q=80&w=800&auto=format&fit=crop' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[3/4] rounded-[32px] bg-brand-black border border-white/5 overflow-hidden relative group glow-hover-purple shadow-2xl"
              >
                 <img src={item.url} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={item.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80" />
                 <div className="absolute bottom-8 left-8">
                    <p className="text-[10px] font-black text-brand-purple uppercase tracking-[0.3em] mb-2">{item.cat}</p>
                    <h3 className="text-2xl font-black tracking-tighter leading-none">{item.title}</h3>
                 </div>
                 <div className="absolute top-6 right-6 glass-premium px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest text-brand-purple border-brand-purple/20 shadow-2xl">
                    NEW RELEASE
                 </div>
              </motion.div>
            ))}
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
