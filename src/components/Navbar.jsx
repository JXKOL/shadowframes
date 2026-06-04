import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-brand-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-purple/20">
      <div className="flex items-center gap-3">
        <Logo className="w-9 h-9" />
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          SHADOW<span className="text-brand-purple text-glow-purple italic">FRAMES</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link to="/" className="hover:text-brand-purple transition-colors">Home</Link>
        <Link to="/gallery" className="hover:text-brand-purple transition-colors">Gallery</Link>
        <Link to="/generate" className="hover:text-brand-purple transition-colors">Generate</Link>
        <Link to="/pricing" className="hover:text-brand-purple transition-colors">Pricing</Link>
        <Link to="/contact" className="hover:text-brand-purple transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
          <Search className="w-5 h-5" />
        </button>
        <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <User className="w-5 h-5" />
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-black border-b border-white/5 py-6 px-6 flex flex-col gap-4 md:hidden">
          <Link onClick={() => setIsOpen(false)} to="/" className="text-lg font-bold">Home</Link>
          <Link onClick={() => setIsOpen(false)} to="/gallery" className="text-lg font-bold">Gallery</Link>
          <Link onClick={() => setIsOpen(false)} to="/generate" className="text-lg font-bold">Generate</Link>
          <Link onClick={() => setIsOpen(false)} to="/pricing" className="text-lg font-bold">Pricing</Link>
          <Link onClick={() => setIsOpen(false)} to="/contact" className="text-lg font-bold">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
