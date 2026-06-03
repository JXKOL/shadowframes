import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-b from-brand-purple/20 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-brand-purple/10 border border-brand-purple/20 rounded-full text-brand-purple glow-purple">
              Next-Gen Anime Art
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-red text-glow-purple">SHADOWS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Generate exclusive, high-quality anime wallpapers with AI. 
              Elevate your aesthetic with cyberpunk, samurai, and dark fantasy frames.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/generate" className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple/80 text-white font-bold rounded-xl transition-all transform hover:scale-105 glow-purple flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Generating
              </Link>
              <Link to="/gallery" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all">
                Explore Gallery
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Featured Preview */}
        <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="aspect-[9/16] rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group"
            >
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
               <div className="absolute bottom-6 left-6">
                  <p className="text-sm font-bold text-brand-purple uppercase tracking-widest mb-1">Cyberpunk</p>
                  <h3 className="text-xl font-bold">Neon Drifter #{i}</h3>
               </div>
               <div className="absolute top-4 right-4 bg-brand-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold">
                  PREMIUM
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-brand-black border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-brand-purple/10 rounded-2xl mb-6 text-brand-purple border border-brand-purple/20">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Generation</h3>
            <p className="text-gray-400">Get unique anime art in seconds using our custom-tuned AI models.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-brand-red/10 rounded-2xl mb-6 text-brand-red border border-brand-red/20">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Exclusive Rights</h3>
            <p className="text-gray-400">Premium members get full commercial rights to their generations.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-brand-purple/10 rounded-2xl mb-6 text-brand-purple border border-brand-purple/20">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">8K Quality</h3>
            <p className="text-gray-400">Download high-resolution wallpapers optimized for any device.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
