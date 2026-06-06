
import { Link } from 'react-router-dom';
import { Globe, Music2, MessageSquare, Shield, Sparkles } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="relative bg-brand-black pt-20 pb-10 px-6 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-purple/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" glow={false} />
              <span className="text-xl font-black tracking-tighter text-white">
                SHADOW<span className="text-brand-purple italic">FRAMES</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              The premier destination for AI-generated anime artistry. Forging the future of digital aesthetics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-all border border-white/5 hover:border-brand-purple/20">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-all border border-white/5 hover:border-brand-purple/20">
                <Music2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-all border border-white/5 hover:border-brand-purple/20">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-brand-purple hover:bg-brand-purple/10 transition-all border border-white/5 hover:border-brand-purple/20">
                <Shield className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><Link to="/gallery" className="hover:text-brand-purple transition-colors">The Gallery</Link></li>
              <li><Link to="/generate" className="hover:text-brand-purple transition-colors">AI Studio</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-purple transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-brand-purple transition-colors">Trending</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              <li><Link to="/contact" className="hover:text-brand-purple transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Join the Forge</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter email"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-brand-purple transition-all pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-purple rounded-xl text-white hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
              Receive weekly drops of rare <br /> generated wallpapers.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-black tracking-[0.2em] text-gray-600 uppercase">
            © 2024 SHADOWFRAMES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black tracking-[0.2em] text-gray-600 uppercase">Created by</span>
            <span className="text-[11px] font-black tracking-[0.2em] text-brand-purple glow-purple px-3 py-1 bg-brand-purple/10 rounded-full border border-brand-purple/20">
              JXKOL STUDIOS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
