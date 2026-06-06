import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const Auth = ({ mode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) throw error;
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-24 pb-20 px-6 flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-purple/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] animate-pulse" />
      
      <SEO 
        title={isLogin ? "Login | ShadowFrames" : "Join the Forge | ShadowFrames"} 
        description="Access your ShadowFrames account to manage your AI anime art collection."
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-brand-white/5 border border-brand-white/10 rounded-[2rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-50" />
          
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 mb-6 text-brand-purple"
            >
              {isLogin ? <ShieldCheck size={32} /> : <Sparkles size={32} />}
            </motion.div>
            <h2 className="text-4xl font-display font-black tracking-tight mb-2">
              {isLogin ? 'WELCOME' : 'INITIALIZE'} <span className="text-brand-purple">SHADOW</span>
            </h2>
            <p className="text-brand-gray">
              {isLogin ? 'Access the neural network.' : 'Create your digital identity.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative overflow-hidden"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray group-focus-within:text-brand-purple transition-colors" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder:text-brand-gray/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray group-focus-within:text-brand-purple transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Neural Link (Email)"
                className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder:text-brand-gray/50"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray group-focus-within:text-brand-purple transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Code (Password)"
                className="w-full bg-brand-black/50 border border-brand-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-purple/50 transition-all text-white placeholder:text-brand-gray/50"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={loading}
              className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl flex items-center justify-center gap-2 glow-purple hover:translate-y-[-2px] active:translate-y-[0px] transition-all mt-8 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'ENGAGE LINK' : 'INITIATE SYNC')} 
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-brand-black/20 backdrop-blur-md px-4 text-brand-gray font-bold">External Verification</span></div>
          </div>

          <button className="w-full py-4 bg-brand-white/5 border border-brand-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-white/10 transition-all">
            <Shield className="w-5 h-5" /> GitHub SSO
          </button>

          <p className="text-center mt-10 text-sm text-brand-gray">
            {isLogin ? "New to the Archive?" : "Already synchronized?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-brand-purple font-bold hover:text-brand-pink transition-colors relative group"
            >
              {isLogin ? 'Create Profile' : 'Access Hub'}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-purple transition-all group-hover:w-full" />
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
