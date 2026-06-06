import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, RefreshCcw, Download, Share2, Info, Layers, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setResult(null);
    // Simulate AI generation
    setTimeout(() => {
      setResult('https://images.unsplash.com/photo-1614728263952-84ea206f25ab?auto=format&fit=crop&q=80&w=1000');
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <SEO 
        title="AI Forge - Generate Custom Anime Art" 
        description="Use the ShadowForge AI Studio to generate your own custom, high-fidelity anime wallpapers. Input your vision and watch our neural engine create art in seconds."
        keywords="AI anime generator, custom anime wallpaper, neural art engine, create anime art, ShadowForge"
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-brand-purple/20 rounded-lg">
                <Zap className="w-4 h-4 text-brand-purple fill-brand-purple" />
              </div>
              <span className="text-brand-purple font-black tracking-widest text-xs uppercase">ShadowForge v2.0</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-4 leading-none">
              AI <span className="text-brand-purple text-glow-purple">STUDIO</span>
            </h1>
            <p className="text-gray-400 text-lg">Unleash your imagination. Our high-fidelity neural engine converts your text into ultra-sharp anime frames.</p>
          </motion.div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Master Prompt</label>
                <span className="text-[10px] font-bold text-brand-purple/60">0 / 500 characters</span>
              </div>
              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your masterpiece (e.g. A neon-drenched samurai standing in the ruins of Neo-Tokyo, rainy night, cinematic lighting, 8k anime style...)"
                  className="w-full h-48 bg-brand-black border border-white/10 rounded-[30px] p-8 focus:outline-none focus:border-brand-purple transition-all resize-none text-white placeholder:text-gray-600 shadow-2xl group-hover:border-white/20"
                />
                <div className="absolute top-4 right-4 text-white/10 group-hover:text-brand-purple/20 transition-colors">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  <Layers className="w-3 h-3" /> Aspect Ratio
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-brand-purple transition-all appearance-none cursor-pointer hover:bg-white/10">
                  <option className="bg-brand-black">9:16 (Phone)</option>
                  <option className="bg-brand-black">16:9 (PC)</option>
                  <option className="bg-brand-black">1:1 (Square)</option>
                  <option className="bg-brand-black">4:5 (Portrait)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  <Sparkles className="w-3 h-3" /> Visual Style
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:border-brand-purple transition-all appearance-none cursor-pointer hover:bg-white/10">
                  <option className="bg-brand-black">Cyber Oni (Dark)</option>
                  <option className="bg-brand-black">Ethereal Fantasy</option>
                  <option className="bg-brand-black">Retro Mecha</option>
                  <option className="bg-brand-black">Ukiyo-e Hybrid</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-brand-purple/5 border border-brand-purple/10 rounded-2xl flex gap-4 items-start">
              <Info className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-brand-purple font-bold">Pro Tip:</span> Using words like "cinematic lighting", "god rays", and "8k" will significantly improve the detail density of your generations.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="group relative w-full py-5 bg-brand-purple hover:bg-brand-purple/80 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 glow-purple flex items-center justify-center gap-3 overflow-hidden shadow-2xl shadow-brand-purple/20"
            >
              {isGenerating ? (
                <RefreshCcw className="w-6 h-6 animate-spin" />
              ) : (
                <Wand2 className="w-6 h-6" />
              )}
              <span className="tracking-widest">
                {isGenerating ? 'IGNITING THE FORGE...' : 'FORGE MASTERPIECE'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[9/16] lg:aspect-auto lg:h-[800px] bg-brand-black/50 rounded-[40px] border border-white/5 overflow-hidden flex items-center justify-center group shadow-inner">
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#8b5cf6_0%,transparent_70%)] opacity-20" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                  >
                    <img src={result} alt="Generated result" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col justify-end p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                       <div className="glass-premium p-8 rounded-[30px] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                          <div>
                            <h4 className="text-xl font-black mb-1">GENERATION COMPLETE</h4>
                            <p className="text-xs text-brand-purple font-bold tracking-widest uppercase">ID: SHADOW-82910</p>
                          </div>
                          <div className="flex gap-3">
                            <button className="p-4 bg-white text-brand-black rounded-2xl hover:bg-brand-purple hover:text-white transition-all transform hover:scale-110 shadow-2xl">
                              <Download className="w-6 h-6" />
                            </button>
                            <button className="p-4 glass rounded-2xl hover:bg-white/10 transition-all transform hover:scale-110">
                              <Share2 className="w-6 h-6" />
                            </button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-8"
                  >
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-brand-purple border-t-transparent rounded-full animate-spin shadow-[0_0_20px_#8b5cf6]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-black tracking-[0.3em] text-brand-purple animate-pulse uppercase">Syncing Neural Paths...</p>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Estimated time: 4s</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6 max-w-sm px-10"
                  >
                    <div className="p-10 bg-white/5 rounded-[40px] inline-block mb-4 border border-white/5 animate-float shadow-2xl">
                      <Sparkles className="w-16 h-16 text-brand-purple/30" />
                    </div>
                    <h3 className="text-3xl font-black italic tracking-tighter">THE VOID AWAITS</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">Describe your vision and watch the forge bring it from the shadows into light.</p>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
