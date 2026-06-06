import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, LogOut, LayoutGrid, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-brand-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-purple/20">
      <div className="flex items-center gap-3">
        <Logo className="w-9 h-9" />
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          SHADOW<span className="text-brand-purple text-glow-purple italic">FRAMES</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        <Link to="/" className="hover:text-brand-purple transition-colors">Home</Link>
        <Link to="/gallery" className="hover:text-brand-purple transition-colors">Archive</Link>
        <Link to="/generate" className="hover:text-brand-purple transition-colors text-brand-purple">Forge</Link>
        <Link to="/pricing" className="hover:text-brand-purple transition-colors">Prime</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
          <Search className="w-5 h-5" />
        </button>

        {user ? (
          <div className="relative group">
            <Link to="/profile" className="flex items-center gap-3 bg-brand-white/5 border border-brand-white/10 rounded-full pl-1 pr-4 py-1 hover:bg-brand-white/10 transition-all">
              <img src={profile?.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span className="hidden sm:block text-sm font-bold truncate max-w-[100px]">{profile?.username}</span>
            </Link>
            
            {/* Desktop Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-brand-black border border-brand-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl backdrop-blur-xl">
              <Link to="/profile" className="flex items-center gap-2 p-3 hover:bg-brand-white/5 rounded-xl transition-colors">
                <User size={16} /> <span>Profile Hub</span>
              </Link>
              <Link to="/gallery" className="flex items-center gap-2 p-3 hover:bg-brand-white/5 rounded-xl transition-colors">
                <Heart size={16} className="text-brand-pink" /> <span>Favorites</span>
              </Link>
              <div className="h-px bg-brand-white/5 my-1" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-3 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors text-left"
              >
                <LogOut size={16} /> <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 px-5 py-2 bg-brand-purple rounded-full text-sm font-bold hover:glow-purple transition-all">
            <User className="w-4 h-4" /> LOGIN
          </Link>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-brand-black z-40 p-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top-4">
          <Link onClick={() => setIsOpen(false)} to="/" className="text-2xl font-bold flex items-center gap-4">
            <LayoutGrid className="text-brand-purple" /> Home
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/gallery" className="text-2xl font-bold flex items-center gap-4">
            <Heart className="text-brand-pink" /> Archive
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/generate" className="text-2xl font-bold flex items-center gap-4 text-brand-purple">
            <Search /> Forge
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/pricing" className="text-2xl font-bold flex items-center gap-4">
            <Logo className="w-6 h-6" /> Prime
          </Link>
          <div className="h-px bg-brand-white/10 mt-auto" />
          {user ? (
            <button 
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="text-red-500 text-xl font-bold flex items-center gap-4"
            >
              <LogOut /> Sign Out
            </button>
          ) : (
            <Link onClick={() => setIsOpen(false)} to="/login" className="text-xl font-bold text-brand-purple flex items-center gap-4">
              <User /> Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
