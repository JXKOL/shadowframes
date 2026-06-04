import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Image as ImageIcon, ArrowRight, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-red to-brand-purple bg-[length:200%_auto] animate-gradient text-glow-purple">
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
              <h2 className="text-3xl font-black tracking-tighter mb-2 italic">TRENDING <span className="text-brand-purple">NOW</span></h2>
              <div className="h-1 w-20 bg-brand-purple rounded-full" />
            </div>
            <Link to="/gallery" className="flex items-center gap-2 text-sm font-black text-brand-purple hover:text-white transition-colors group">
              VIEW FULL COLLECTION <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {[
              { title: 'Cyber Assassin', cat: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=800' },
              { title: 'Ghost Ronin', cat: 'Samurai', url: 'https://images.unsplash.com/photo-1578632738981-4330c709e135?q=80&w=800' },
              { title: 'Neon Valkyrie', cat: 'Fantasy', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800' },
              { title: 'Void Engine', cat: 'Mecha', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[3/4] rounded-3xl bg-brand-black border border-white/5 overflow-hidden relative group glow-hover-purple"
              >
                 <img src={item.url} className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                 <div className="absolute bottom-8 left-8">
                    <p className="text-[10px] font-black text-brand-purple uppercase tracking-widest mb-1">{item.cat}</p>
                    <h3 className="text-xl font-black">{item.title}</h3>
                 </div>
                 <div className="absolute top-6 right-6 glass-premium px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter">
                    NEW RELEASE
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Premium Look */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] -skew-y-3 transform origin-right" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 glow-purple rounded-full" />
              </div>
              <h3 className="text-2xl font-black mb-4">ULTRA-FAST FORGE</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Our proprietary clusters generate complex anime assets in under 5 seconds. Speed meets precision.</p>
            </div>

            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2 md:translate-y-8">
              <div className="w-16 h-16 bg-brand-red/20 rounded-2xl flex items-center justify-center text-brand-red mb-8 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 glow-red rounded-full" />
              </div>
              <h3 className="text-2xl font-black mb-4">IRONCLAD RIGHTS</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Every generation is unique. Elite members receive full blockchain-verified commercial rights.</p>
            </div>

            <div className="group p-10 glass-premium rounded-[40px] transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-8 h-8 glow-purple rounded-full" />
              </div>
              <h3 className="text-2xl font-black mb-4">QUANTUM UPSCALE</h3>
              <p className="text-gray-400 leading-relaxed font-medium">Native 8K resolution with zero artifacting. Optimized for everything from mobile to IMAX screens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker / CTA */}
      <section className="py-20 border-t border-white/5 bg-brand-purple">
        <div className="flex overflow-hidden whitespace-nowrap">
           <div className="flex animate-marquee items-center">
             {[1,2,3,4,5,6,7,8].map(i => (
               <div key={i} className="flex items-center gap-10 mx-10 text-brand-black font-black text-4xl italic">
                 <span>READY TO FORGE?</span>
                 <Sparkles className="w-8 h-8" />
                 <span>UNLIMITED POWER</span>
                 <Star className="w-8 h-8" />
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
