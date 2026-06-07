import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, Sparkles, RefreshCcw, Download, Share2, Info, 
  Layers, Zap, Trash2, History, Settings2, Sliders,
  ArrowRight, CheckCircle2, AlertCircle, Image as ImageIcon,
  ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import { generateImage, PROMPT_SUGGESTIONS, SAFETY_FILTER } from '../services/aiService';
import { useAuth } from '../context/AuthContext';

const NEURAL_STYLES = [
  { id: 'anime-v3', name: 'Animagine XL v3.1', description: 'Ultra-high fidelity anime style' },
  { id: 'cyber-oni', name: 'Cyber Oni', description: 'Dark cyberpunk with red accents' },
  { id: 'ethereal', name: 'Ethereal Fantasy', description: 'Soft, magical atmosphere' },
  { id: 'mecha', name: 'Retro Mecha', description: '90s tactical mecha aesthetic' },
  { id: 'ukiyo', name: 'Ukiyo-e Hybrid', description: 'Traditional Japanese art mix' }
];

const Generate = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [styleIntensity, setStyleIntensity] = useState(7);
  const [selectedStyle, setSelectedStyle] = useState(NEURAL_STYLES[0].name);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [generationStep, setGenerationStep] = useState(0);

  useEffect(() => {
    const savedHistory = localStorage.getItem('shadow_forge_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const steps = [
    "Contacting Neural Cluster...",
    "Injecting Style Vectors...",
    "Synthesizing Latent Space...",
    "Refining Grain Structure...",
    "Finalizing Visual Link..."
  ];

  useEffect(() => {
    let interval;
    if (isGenerating) {
      setGenerationStep(0);
      interval = setInterval(() => {
        setGenerationStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    if (SAFETY_FILTER(prompt)) {
      setError("NEURAL_VIOLATION: Prompt contains prohibited content. Security link severed.");
      return;
    }

    setError(null);
    setIsGenerating(true);
    setResult(null);

    const [width, height] = aspectRatio === '9:16' ? [832, 1216] : 
                          aspectRatio === '16:9' ? [1216, 832] : 
                          aspectRatio === '1:1' ? [1024, 1024] : [832, 1024];

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
      
      const updatedHistory = [newEntry, ...history].slice(0, 15);
      setHistory(updatedHistory);
      localStorage.setItem('shadow_forge_history', JSON.stringify(updatedHistory));
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("NEURAL_LINK_MISSING")) {
        setError("NEURAL_LINK_OFFLINE: Hugging Face API Token is not configured. Deploying in sandbox mode.");
      } else if (msg.includes("FORGE_BUSY")) {
        setError("FORGE_CONGESTION: Model is currently loading on Hugging Face. Retrying in background...");
      } else {
        setError(msg || "FORGE_FAILURE: Connection to neural cluster timed out.");
      }
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
        title="Neural Forge Studio | ShadowFrames" 
        description="Access the high-fidelity Animagine XL 3.1 engine to generate exclusive anime art."
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Controls */}
        <div className="xl:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-brand-purple fill-brand-purple animate-pulse" />
              <span className="text-brand-purple font-black tracking-[0.3em] text-[10px] uppercase italic">ShadowForge XL 3.1</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              NEURAL <span className="text-brand-purple text-glow-purple italic">FORGE</span>
            </h1>
            <p className="text-brand-gray text-lg font-medium">Inject your vision into the latent stream.</p>
          </motion.div>

          <div className="bg-brand-white/5 border border-brand-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl space-y-8">
            {/* Prompt */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Primary Descriptor</label>
                <div className="flex gap-2">
                   <button onClick={() => setPrompt(PROMPT_SUGGESTIONS[Math.floor(Math.random() * PROMPT_SUGGESTIONS.length)])} className="text-[9px] px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full hover:bg-brand-purple/30 transition-all text-brand-purple font-black">RANDOMIZE</button>
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="1girl, neon armor, floating in digital space..."
                className="w-full h-36 bg-brand-black/50 border border-brand-white/10 rounded-2xl p-5 focus:outline-none focus:border-brand-purple/50 transition-all resize-none text-white placeholder:text-brand-gray/30 font-medium"
              />
            </div>

            {/* Negative */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Exclusion Field (Negative)</label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="worst quality, blurry, text..."
                className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-5 py-3 text-xs focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder:text-brand-gray/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray flex gap-2"><Layers size={12}/> Link Aspect</label>
                <div className="relative group">
                  <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-purple/50 appearance-none cursor-pointer"
                  >
                    <option value="9:16">9:16 Mobile</option>
                    <option value="16:9">16:9 Cinema</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="4:5">4:5 Portrait</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" size={14} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray flex gap-2"><Sparkles size={12}/> Neural Mode</label>
                <div className="relative group">
                  <select 
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-brand-purple/50 appearance-none cursor-pointer"
                  >
                    {NEURAL_STYLES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-gray flex gap-2"><Sliders size={12}/> Core guidance</label>
                <span className="text-[10px] font-black text-brand-purple">{styleIntensity} LINK</span>
              </div>
              <input 
                type="range" min="1" max="15" step="0.5"
                value={styleIntensity}
                onChange={(e) => setStyleIntensity(e.target.value)}
                className="w-full h-1 bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-purple" 
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold leading-relaxed"
              >
                <AlertCircle size={16} className="shrink-0" /> {error}
              </motion.div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="group relative w-full py-5 bg-brand-purple disabled:opacity-30 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all transform hover:scale-[1.01] active:scale-95 glow-purple flex items-center justify-center gap-3 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Wand2 className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="tracking-[0.2em] uppercase text-xs font-black">
                {isGenerating ? 'FORGING NEURAL LINK...' : 'INITIALIZE SYNTHESIS'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>

        {/* Center: Output */}
        <div className="xl:col-span-5">
           <div className="relative aspect-[3/4] xl:h-[800px] bg-brand-black/50 rounded-[3.5rem] border border-brand-white/10 overflow-hidden flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 2px, transparent 1px)', backgroundSize: '30px 30px' }} 
              />

              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className="absolute inset-0"
                  >
                    <img src={result} alt="Generated" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-8 inset-x-8">
                       <div className="glass-premium p-6 rounded-[2.5rem] flex items-center justify-between border-brand-purple/20">
                          <div>
                            <h4 className="text-xs font-black mb-1 tracking-widest uppercase">SYNC SUCCESSFUL</h4>
                            <p className="text-[9px] text-brand-purple font-bold tracking-[0.3em] uppercase">LINK STABLE • 8K ENABLED</p>
                          </div>
                          <div className="flex gap-2">
                            <a href={result} download="shadowframe_masterpiece.png" className="p-3 bg-white text-brand-black rounded-xl hover:bg-brand-purple hover:text-white transition-all shadow-xl">
                              <Download size={18} />
                            </a>
                            <button onClick={() => { navigator.clipboard.writeText(result); alert("Neural link copied."); }} className="p-3 glass rounded-xl hover:bg-white/10 transition-all">
                              <Share2 size={18} />
                            </button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div 
                    key="generating"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center space-y-10 z-10 px-12"
                  >
                    <div className="relative w-40 h-40 mx-auto">
                      <motion.div 
                        animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-[1px] border-brand-purple/30 rounded-full border-dashed" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-[2px] border-brand-purple/50 rounded-full border-t-transparent" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="text-brand-purple animate-pulse" size={48} />
                      </div>
                    </div>
                    <div className="space-y-5">
                      <p className="text-2xl font-black tracking-[0.3em] text-white uppercase italic">{steps[generationStep]}</p>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          key={generationStep}
                          initial={{ width: `${generationStep * 20}%` }}
                          animate={{ width: `${(generationStep + 1) * 20}%` }}
                          transition={{ duration: 4, ease: "linear" }}
                          className="h-full bg-brand-purple shadow-[0_0_20px_#8b5cf6]"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-black text-brand-gray uppercase tracking-widest">
                         <span>BUFFERING VECTORS</span>
                         <span>NODE: HK-920</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center space-y-8 max-w-sm px-10 relative z-10"
                  >
                    <div className="w-28 h-28 bg-brand-purple/10 rounded-[2.5rem] border border-brand-purple/20 flex items-center justify-center mx-auto mb-4 shadow-3xl">
                      <ImageIcon className="text-brand-purple/40" size={44} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-4xl font-black italic tracking-tighter text-white">THE VOID</h3>
                      <p className="text-brand-gray text-sm font-medium leading-relaxed">Neural forge is offline. Waiting for master parameters to initiate sequence.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Right: History */}
        <div className="xl:col-span-3 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-sm font-black flex items-center gap-3 tracking-[0.2em]">
                <History className="text-brand-purple" size={18} /> SYNC LOGS
              </h2>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-[10px] font-black text-brand-gray hover:text-red-500 transition-colors uppercase tracking-widest">Wipe Data</button>
              )}
           </div>

           <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="py-20 border border-brand-white/5 border-dashed rounded-[2rem] text-center opacity-40">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Log Entries Empty</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={item.id}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-black border border-brand-white/5 cursor-pointer hover:border-brand-purple/40 transition-all shadow-xl"
                    onClick={() => setResult(item.url)}
                  >
                    <img src={item.url} alt="History" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                       <span className="text-[8px] font-black text-brand-gray uppercase tracking-widest truncate max-w-[100px]">{item.prompt}</span>
                       <ArrowRight size={10} className="text-brand-purple" />
                    </div>
                  </motion.div>
                ))
              )}
           </div>

           <div className="p-6 bg-brand-purple/5 border border-brand-purple/10 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-4">
                 <Settings2 className="text-brand-purple" size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">Cluster Health</span>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span className="text-brand-gray">HF-XL STATUS</span>
                    <span className="text-green-500">OPTIMAL</span>
                 </div>
                 <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
