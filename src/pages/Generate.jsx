import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, Sparkles, RefreshCcw, Download, Share2, Info, 
  Layers, Zap, Trash2, History, Settings2, Sliders,
  ArrowRight, CheckCircle2, AlertCircle, Image as ImageIcon
} from 'lucide-react';
import SEO from '../components/SEO';
import { generateImage, PROMPT_SUGGESTIONS, SAFETY_FILTER } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

const Generate = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [styleIntensity, setStyleIntensity] = useState(7);
  const [selectedStyle, setSelectedStyle] = useState('Cyber Oni (Dark)');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [generationStep, setGenerationStep] = useState(0);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('shadow_forge_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const steps = [
    "Initializing Neural Forge...",
    "Injecting Style Vectors...",
    "Synthesizing Pixels...",
    "Refining Digital Grain...",
    "Finalizing Masterpiece..."
  ];

  useEffect(() => {
    let interval;
    if (isGenerating) {
      setGenerationStep(0);
      interval = setInterval(() => {
        setGenerationStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    if (SAFETY_FILTER(prompt)) {
      setError("Prompt contains prohibited content. Please keep it safe.");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setResult(null);

    const [width, height] = aspectRatio === '9:16' ? [640, 1136] : 
                          aspectRatio === '16:9' ? [1216, 684] : 
                          aspectRatio === '1:1' ? [1024, 1024] : [832, 1040];

    try {
      const imageUrl = await generateImage({
        prompt: `${selectedStyle} style, ${prompt}`,
        negative_prompt: negativePrompt,
        width,
        height,
        guidance_scale: styleIntensity
      });

      setResult(imageUrl);
      
      const newEntry = {
        id: Date.now(),
        url: imageUrl,
        prompt,
        timestamp: new Date().toISOString()
      };
      
      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('shadow_forge_history', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err.message || "Failed to generate image. The forge is cooling down.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('shadow_forge_history');
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-[1600px] mx-auto min-h-screen">
      <SEO 
        title="AI Forge Studio | ShadowFrames" 
        description="Generate high-fidelity anime art using our advanced neural engine."
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Generation Controls */}
        <div className="xl:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-brand-purple fill-brand-purple animate-pulse" />
              <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase">ShadowForge Neural v3.5</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              THE <span className="text-brand-purple text-glow-purple italic">FORGE</span>
            </h1>
            <p className="text-brand-gray text-lg font-medium">Convert your thoughts into high-fidelity digital reality.</p>
          </motion.div>

          <div className="bg-brand-white/5 border border-brand-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl space-y-8">
            {/* Prompt Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Master Input</label>
                <div className="flex gap-2">
                  {PROMPT_SUGGESTIONS.slice(0, 3).map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => setPrompt(s)}
                      className="text-[9px] px-2 py-1 bg-white/5 border border-white/5 rounded-md hover:bg-brand-purple/20 transition-colors text-brand-gray hover:text-brand-purple"
                    >
                      Idea {i+1}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cyborg ronin walking through a neon market..."
                className="w-full h-32 bg-brand-black/50 border border-brand-white/10 rounded-2xl p-5 focus:outline-none focus:border-brand-purple/50 transition-all resize-none text-white placeholder:text-brand-gray/30 font-medium"
              />
            </div>

            {/* Negative Prompt */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Negative (Elements to avoid)</label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="text, blurry, lowres, distorted..."
                className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder:text-brand-gray/30"
              />
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gray">
                  <Layers size={12} /> Aspect Ratio
                </label>
                <select 
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-purple/50 cursor-pointer"
                >
                  <option value="9:16">9:16 Mobile</option>
                  <option value="16:9">16:9 Cinema</option>
                  <option value="1:1">1:1 Square</option>
                  <option value="4:5">4:5 Portrait</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gray">
                  <Sparkles size={12} /> Neural Style
                </label>
                <select 
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-purple/50 cursor-pointer"
                >
                  <option>Cyber Oni (Dark)</option>
                  <option>Ethereal Fantasy</option>
                  <option>Retro Mecha</option>
                  <option>Ukiyo-e Hybrid</option>
                </select>
              </div>
            </div>

            {/* Style Intensity Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gray">
                  <Sliders size={12} /> Style Intensity
                </label>
                <span className="text-xs font-black text-brand-purple">{styleIntensity}x</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5"
                value={styleIntensity}
                onChange={(e) => setStyleIntensity(e.target.value)}
                className="w-full h-1 bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-purple" 
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="group relative w-full py-5 bg-brand-purple disabled:opacity-30 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 glow-purple flex items-center justify-center gap-3 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RefreshCcw className="w-6 h-6 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Wand2 className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="tracking-widest uppercase">
                {isGenerating ? 'Forging Masterpiece...' : 'Initialize Forge'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* Center: Preview & Output */}
        <div className="xl:col-span-5">
          <div className="relative aspect-[3/4] xl:h-[800px] bg-brand-black/50 rounded-[3rem] border border-brand-white/10 overflow-hidden flex items-center justify-center group shadow-2xl">
              {/* Grid Decoration */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
              />

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                  >
                    <img src={result} alt="Generated result" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 w-[90%]">
                       <div className="flex-1 glass-premium p-6 rounded-[2rem] flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-black mb-1">GENERATION SYNCED</h4>
                            <p className="text-[9px] text-brand-purple font-bold tracking-[0.2em] uppercase">Neural Match: 99.8%</p>
                          </div>
                          <div className="flex gap-2">
                            <a 
                              href={result} 
                              download="shadow-frame.png"
                              className="p-3 bg-white text-brand-black rounded-xl hover:bg-brand-purple hover:text-white transition-all shadow-xl"
                            >
                              <Download size={20} />
                            </a>
                            <button className="p-3 glass rounded-xl hover:bg-white/10 transition-all">
                              <Share2 size={20} />
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
                    className="text-center space-y-8 z-10 px-10"
                  >
                    <div className="relative w-32 h-32 mx-auto">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[1px] border-brand-purple/20 rounded-full border-dashed" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-[2px] border-brand-purple/40 rounded-full border-t-transparent" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="text-brand-purple animate-pulse" size={40} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl font-black tracking-[0.2em] text-white uppercase italic">{steps[generationStep]}</p>
                      <div className="w-64 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(generationStep + 1) * 20}%` }}
                          className="h-full bg-brand-purple shadow-[0_0_15px_#8b5cf6]"
                        />
                      </div>
                      <p className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Neural Link Latency: 42ms</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-6 max-w-sm px-10 relative z-10"
                  >
                    <div className="w-24 h-24 bg-brand-purple/10 rounded-[2rem] border border-brand-purple/20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <ImageIcon className="text-brand-purple" size={40} />
                    </div>
                    <h3 className="text-3xl font-black italic tracking-tighter">NEURAL VOID</h3>
                    <p className="text-brand-gray font-medium leading-relaxed">The forge is idle. Provide a master prompt to begin synthesis.</p>
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>

        {/* Right: History Hub */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-black flex items-center gap-3">
              <History className="text-brand-purple" size={20} /> SYNC HISTORY
            </h2>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-[10px] font-black text-brand-gray hover:text-red-500 transition-colors flex items-center gap-2 uppercase tracking-widest"
              >
                <Trash2 size={12} /> Wipe
              </button>
            )}
          </div>

          <div className="space-y-4 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <div className="py-12 border border-brand-white/5 border-dashed rounded-3xl text-center">
                <p className="text-xs text-brand-gray font-bold uppercase tracking-widest">Archive Empty</p>
              </div>
            ) : (
              history.map((item) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-brand-black border border-brand-white/5 cursor-pointer hover:border-brand-purple/30 transition-all"
                  onClick={() => setResult(item.url)}
                >
                  <img src={item.url} alt="History item" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <p className="text-[8px] text-brand-gray font-bold truncate max-w-[80px]">{item.prompt}</p>
                    <ArrowRight className="text-brand-purple opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" size={12} />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="p-6 bg-brand-purple/10 border border-brand-purple/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-3">
               <Settings2 className="text-brand-purple" size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Hardware Sync</span>
            </div>
            <p className="text-[10px] text-brand-gray font-medium leading-relaxed">
              Your generations are processed on our distributed neural clusters. High-priority queuing is active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
