import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, RefreshCcw, Download, Share2 } from 'lucide-react';

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setResult('https://images.unsplash.com/photo-1614728263952-84ea206f25ab?auto=format&fit=crop&q=80&w=1000');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-4">
              AI <span className="text-brand-purple">GENERATOR</span>
            </h1>
            <p className="text-gray-400">Describe your vision and let ShadowFrames bring it to life.</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-widest text-brand-purple">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cyberpunk samurai standing under neon rain, purple glow, highly detailed anime style..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-brand-purple transition-colors resize-none text-white placeholder:text-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Aspect Ratio</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple transition-colors">
                <option>9:16 (Phone)</option>
                <option>16:9 (PC)</option>
                <option>1:1 (Square)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Style Preset</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-purple transition-colors">
                <option>Dark Anime</option>
                <option>Cyberpunk</option>
                <option>Vaporwave</option>
                <option>Classic Manga</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full py-4 bg-brand-purple hover:bg-brand-purple/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] glow-purple flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <RefreshCcw className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating Art...' : 'Generate Frame'}
          </button>
        </div>

        {/* Preview Area */}
        <div className="relative aspect-[9/16] bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group">
            {result ? (
              <div className="absolute inset-0">
                <img src={result} alt="Generated result" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <div className="w-full flex gap-4">
                      <button className="flex-1 py-3 bg-brand-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 glow-purple">
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-brand-purple/30 border-t-brand-purple rounded-full animate-spin mx-auto" />
                <p className="text-sm font-bold tracking-widest text-brand-purple animate-pulse">CRAFTING YOUR FRAME...</p>
              </div>
            ) : (
              <div className="text-center space-y-4 p-12">
                <div className="p-6 bg-white/5 rounded-3xl inline-block mb-4">
                  <Sparkles className="w-12 h-12 text-brand-purple opacity-20" />
                </div>
                <h3 className="text-xl font-bold">Preview Area</h3>
                <p className="text-gray-500 text-sm">Your masterpiece will appear here. Start by entering a prompt on the left.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
